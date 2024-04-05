import { FaUser } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import css from "./Contact.module.css";

export default function Contact({ contacts: { id, name, number }, onDelete }) {
  return (
    <div className={css.container}>
      <div className={css.containerItem}>
        <p>
          <FaUser className={css.icon} />
          {name}
        </p>
        <p>
          <FaPhone className={css.icon} />
          {number}
        </p>
      </div>
      <button className={css.btnDel} onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
}
