import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faCalendarAlt, faPen, faChevronDown, faChevronUp, faTimes, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import categories from "./categories";
import Calendar from "react-calendar";
import { db } from "../firebase";

export const NewTransaction = ({ showNewTransactionForm, setDatabase, setShowNewTransactionForm }) => {
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [chevronFirst, setChevronFirst] = useState(faChevronDown);
  const [chevronSecond, setChevronSecond] = useState(faChevronDown);

  const [classDivCategory, setClassDivCategory] = useState(false);
  const [selectedHoverCategory, setSelectedHoverCategory] = useState("");
  const [classDivDate, setClassDivDate] = useState(false);
  const [selectedHoverDate, setSelectedHoverDate] = useState("");

  const [category, setCategory] = useState("groceries");
  const [categoryTitle, setCategoryTitle] = useState("Zakupy spożywcze");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (classDivCategory === true) {
      setSelectedHoverCategory("selectedHoverCategory");
    } else {
      setSelectedHoverCategory("");
    }
  }, [classDivCategory]);
  useEffect(() => {
    if (classDivDate === true) {
      setSelectedHoverDate("selectedHoverDate");
    } else {
      setSelectedHoverDate("");
    }
  }, [classDivDate]);

  const handleShowCategoryList = (e) => {
    e.preventDefault();
    setShowCategoryList((state) => !state);
    setClassDivCategory((state) => !state);

    if (chevronFirst === faChevronDown) {
      setChevronFirst(faChevronUp);
    } else {
      setChevronFirst(faChevronDown);
    }
  };
  const handleShowCalendar = (e) => {
    e.preventDefault();
    setShowCalendar((state) => !state);
    setClassDivDate((state) => !state);

    if (chevronSecond === faChevronDown) {
      setChevronSecond(faChevronUp);
    } else {
      setChevronSecond(faChevronDown);
    }
  };
  const handleChooseCategory = (e, selectedCategory, selectedTitle) => {
    e.preventDefault();
    setCategory(selectedCategory);
    setCategoryTitle(selectedTitle);
    setShowCategoryList((state) => !state);
    setChevronFirst(faChevronDown);
    setClassDivCategory((state) => !state);
  };
  const handleChooseDate = (date) => {
    setDate(date);
    setShowCalendar(false);
    setChevronSecond(faChevronDown);
    setClassDivDate((state) => !state);
  };
  const handleNewTransaction = () => {
    setShowNewTransactionForm((state) => !state);
  };
  const handleAddTransaction = (e) => {
    e.preventDefault();
    setShowNewTransactionForm((state) => !state);

    setCategory("groceries");
    setCategoryTitle("Zakupy spożywcze");
    setCost(0);
    setDate(new Date());
    setDescription("");

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
        setDatabase((state) =>
          [...state, { category: category, categoryTitle: categoryTitle, cost: cost, date: { seconds: date.getTime() / 1000 }, description: description, id: doc.id }].sort((a, b) => {
            return b.date.seconds - a.date.seconds;
          })
        );
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <>
      {showNewTransactionForm === true && (
        <section className="newTransaction section container">
          <button className="btn btn-exit" onClick={handleNewTransaction}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <form className="newTransaction__form">
            <div>
              <p className="newTransaction__description">
                <FontAwesomeIcon icon={faThumbtack} className="newTransaction__icon" /> Wybierz kategorię:
              </p>
              {/* "btn btn-category", */}
              <button className={`${selectedHoverCategory} btn btn-category`} onClick={handleShowCategoryList}>
                {categoryTitle} <FontAwesomeIcon icon={chevronFirst} className="newTransaction__icon__btn" />
              </button>

              {showCategoryList === true && (
                <ul className="newTransaction__categoryList">
                  {categories.map((cat) => {
                    return (
                      <li key={cat.category}>
                        <a href="/" onClick={(e) => handleChooseCategory(e, cat.category, cat.title)}>
                          <FontAwesomeIcon icon={cat.icon} className="newTransaction__categoryList__icon" style={{ color: cat.color }} />
                          {cat.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div>
              <p className="newTransaction__description">
                <FontAwesomeIcon icon={faDollarSign} className="newTransaction__icon" /> Wpisz kwotę:
              </p>
              <div className="newTransaction__label">
                <input type="number" placeholder={"0 zł"} name="cost" value={cost} onChange={(e) => setCost(e.target.value)} />
              </div>
            </div>
            <div>
              <p className="newTransaction__description">
                <FontAwesomeIcon icon={faCalendarAlt} className="newTransaction__icon" /> Wybierz datę:
              </p>
              <button onClick={handleShowCalendar} className={`${selectedHoverDate} btn btn-category`}>
                {date.toLocaleDateString()} <FontAwesomeIcon icon={chevronSecond} className="newTransaction__icon__btn" />
              </button>
              {showCalendar === true && (
                <div className="calendar">
                  <Calendar value={date} onClickDay={(date) => handleChooseDate(date)} />
                </div>
              )}
            </div>

            <div>
              <p className="newTransaction__description">
                <FontAwesomeIcon icon={faPen} className="newTransaction__icon" /> Notatka:
              </p>
              <div className="newTransaction__label">
                <textarea maxLength="24" type="text" placeholder="miejsce na notatkę" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
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
