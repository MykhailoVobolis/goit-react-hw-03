import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

export default function ContactList({ contacts, onDelete }) {
  return (
    <>
      <ul className={css.container}>
        {contacts.map((contacts) => (
          <li key={contacts.id}>
            <Contact contacts={contacts} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    </>
  );
}
