import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { nanoid } from "nanoid";
import css from "./ContactForm.module.css";

// Валідація полів форми
const regex = {
  phoneNumber: /^[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/, // Регулярні вираз для поля форми Number
};

// Об'єкт Yup валідації полів форми
const FeedbackSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
  phone: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .matches(regex.phoneNumber, "Number format: 000-00-00")
    .required("Required"),
});

export default function ContactForm({ onAdd }) {
  const nameFieldId = useId(); // Створення ідентифікаторів
  const phoneFieldId = useId(); // поліив форми

  // Початкове значення полів форми
  const initialValues = {
    name: "",
    phone: "",
  };

  const handleSubmit = (values, actions) => {
    onAdd({
      id: nanoid(), // Пакет для генерації ідентифікаторів
      name: values.name,
      number: values.phone,
    });
    actions.resetForm();
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
        <Form className={css.container}>
          <div className={css.inputContainer}>
            <label htmlFor={nameFieldId}>Name</label>
            <Field className={css.inputValue} type="text" name="name" />
            <ErrorMessage className={css.error} name="name" component="span" />
          </div>
          <div className={css.inputContainer}>
            <label htmlFor={phoneFieldId}>Number</label>
            <Field className={css.inputValue} type="tel" name="phone" />
            <ErrorMessage className={css.error} name="phone" component="span" />
          </div>
          <button className={css.btnAdd} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </>
  );
}
