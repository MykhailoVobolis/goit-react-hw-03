import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";
import initialContacts from "../../contacts.json";
import "./App.css";

import { useState, useEffect } from "react";

export default function App() {
  // Встановлення значень стану масиву об'єктів контактів при завантаженні додатку
  const [contacts, setContacts] = useState(() => {
    // Зчитуємо значення за ключем
    const savedObject = window.localStorage.getItem("saved-clicks");
    // Якщо там щось є, парсимо і повертаємо це значення як початкове значення стану
    if (savedObject !== null) {
      return JSON.parse(savedObject);
    }
    // У протилежному випадку повертаємо значення за замовчуванням
    return initialContacts;
  });

  // Записуємо поточне значення стану в LocalStorage
  useEffect(() => {
    window.localStorage.setItem("saved-clicks", JSON.stringify(contacts));
  }, [contacts]);

  // Додавання контакта
  const addCont = (newCont) => {
    setContacts((prevCont) => {
      return [...prevCont, newCont];
    });
  };

  // Видалення контакта
  const deleteCont = (contId) => {
    setContacts((prevCont) => {
      return prevCont.filter((cont) => cont.id !== contId);
    });
  };

  // Фільтрування контактів за ім'ям
  const [filter, setFilter] = useState(""); // Встановлення стану значення для фільтрування
  // Створення відфільтрованого масиву об'єктів контактів
  const visibleContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addCont} />
      <SearchBox value={filter} onFilter={setFilter} />
      <ContactList contacts={visibleContacts} onDelete={deleteCont} />
    </div>
  );
}
