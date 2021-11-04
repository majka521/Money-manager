import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faCalendarAlt, faPen, faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import categories from "./categories";
import Calendar from "react-calendar";
import { db } from "../firebase";

export const NewTransaction = ({ showNewTransactionForm, setDatabase, setShowNewTransactionForm, handleNewTransaction }) => {
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const [category, setCategory] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("wybierz kategorię");
  const [cost, setCost] = useState(0);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  const handleShowCategoryList = (e) => {
    e.preventDefault();
    setShowCategoryList((state) => !state);
  };
  const handleShowCalendar = (e) => {
    e.preventDefault();
    setShowCalendar((state) => !state);
  };
  const handleChooseCategory = (e, selectedCategory, selectedTitle, selectedIcon) => {
    e.preventDefault();
    setCategory(selectedCategory);
    setCategoryTitle(selectedTitle);
    setIcon(selectedIcon);
    setShowCategoryList((state) => !state);
  };
  const handleChooseDate = (date) => {
    setDate(date);
    setShowCalendar(false);
  };
  const handleAddTransaction = (e) => {
    e.preventDefault();
    setShowNewTransactionForm((state) => !state);

    setCategory("");
    setCategoryTitle("wybierz kategorię");
    setCategory("");
    setCost(0);
    setDate(new Date());
    setDescription("");
    setIcon("");

    //firebase - dodanie danych
    db.collection("transaction")
      .add({
        category: category,
        categoryTitle: categoryTitle,
        cost: cost,
        date: date,
        description: description,
      })
      .then((doc) => {
        setDatabase((state) => [...state, { category: category, categoryTitle: categoryTitle, cost: cost, date: date, description: description, id: doc.id }]);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <>
      {showNewTransactionForm === true && (
        <section className="newTransaction">
          <button className="btn btn-exit" onClick={handleNewTransaction}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <form className="newTransaction__form">
            <h2 className="newTransaction__title">nowa transakcja</h2>
            <button className="btn btn-category" onClick={handleShowCategoryList}>
              {/* <FontAwesomeIcon icon={icon.iconName} /> */}
              {/* {console.log(<FontAwesomeIcon icon={icon.iconName} />)} */}
              {categoryTitle} <FontAwesomeIcon icon={faChevronDown} />
            </button>
            {showCategoryList === true && (
              <ul className="newTransaction__categoryList">
                {categories.map((cat) => {
                  return (
                    <li key={cat.category}>
                      <a href="/" onClick={(e) => handleChooseCategory(e, cat.category, cat.title, cat.icon)}>
                        <FontAwesomeIcon icon={cat.icon} /> {cat.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="newTransaction__label">
              <p>
                <FontAwesomeIcon icon={faDollarSign} className="newTransaction__icon" />
              </p>
              <input type="number" placeholder={"0"} name="cost" value={cost} onChange={(e) => setCost(e.target.value)} />
              <p className="newTransaction__currency">zł</p>
            </div>
            <div className="newTransaction__label">
              <p>
                <FontAwesomeIcon icon={faCalendarAlt} className="newTransaction__icon" /> {date.toLocaleDateString()}
              </p>
              <button onClick={handleShowCalendar} className="btn btn-category">
                Zmień datę <FontAwesomeIcon icon={faChevronDown} />
              </button>
              {showCalendar === true && (
                <div className="calendar">
                  <Calendar value={date} onClickDay={(date) => handleChooseDate(date)} />
                </div>
              )}
            </div>
            <div className="newTransaction__label">
              <p>
                <FontAwesomeIcon icon={faPen} className="newTransaction__icon" />
              </p>
              <textarea rows="1" type="text" placeholder="miejsce na notatkę" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button onClick={handleAddTransaction} className="btn btn-addTransaction">
              dodaj
            </button>
          </form>
        </section>
      )}
    </>
  );
};
