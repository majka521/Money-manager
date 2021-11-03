import React, { useState, useEffect } from "react";
import { Transaction } from "./Transactions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faDollarSign, faCalendarAlt, faPen, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import categories from "./categories";
import Calendar from "react-calendar";
import { db } from "../firebase";

export const NewTransaction = () => {
  const [showNewTransactionForm, setShowNewTransactionForm] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const [category, setCategory] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("wybierz kategorię");
  const [cost, setCost] = useState(0);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");

  const [database, setDatabase] = useState([]);

  //firebase - pobranie istniejących danych
  useEffect(() => {
    db.collection("transaction")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setDatabase((state) => [
            ...state,
            {
              ...doc.data(),
              id: doc.id,
            },
          ]);
        });
      });
  }, []);

  const handleNewTransaction = () => {
    setShowNewTransactionForm((state) => !state);
  };
  const handleShowCategoryList = (e) => {
    e.preventDefault();
    setShowCategoryList((state) => !state);
  };
  const handleShowCalendar = (e) => {
    e.preventDefault();
    setShowCalendar((state) => !state);
  };
  const handleChooseCategory = (e, selectedCategory, selectedTitle) => {
    e.preventDefault();
    setCategory(selectedCategory);
    setCategoryTitle(selectedTitle);
    setShowCategoryList((state) => !state);
  };
  const handleChooseDate = () => {
    setDate(date);
    setShowCalendar((state) => !state);
  };
  const handleAddTransaction = (e) => {
    e.preventDefault();
    setShowNewTransactionForm((state) => !state);

    setCategory("");
    setCategoryTitle("wybierz kategorię");
    setCost(0);
    setDate(new Date());
    setDescription("");

    //firebase - dodanie danych
    db.collection("transaction")
      .doc()
      .set({
        category: category,
        cost: cost,
        date: date,
        description: description,
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <>
      <button className="btn btn-newTransaction" onClick={handleNewTransaction}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </button>
      {showNewTransactionForm === true && (
        <section className="newTransaction">
          <div className="container">
            <div>
              <form className="newTransaction__form">
                <h2 className="newTransaction__title">nowa transakcja</h2>
                <button className="btn btn-category" onClick={handleShowCategoryList}>
                  {categoryTitle} <FontAwesomeIcon icon={faChevronDown} />
                </button>
                {showCategoryList === true && (
                  <ul className="newTransaction__categoryList">
                    {categories.map((cat) => {
                      return (
                        <li key={cat.category}>
                          <a href="/" onClick={(e) => handleChooseCategory(e, cat.category, cat.title)}>
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
                  {showCalendar === true && <Calendar value={date} onChange={handleChooseDate} />}
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
            </div>
          </div>
        </section>
      )}
      <Transaction database={database}></Transaction>
    </>
  );
};
