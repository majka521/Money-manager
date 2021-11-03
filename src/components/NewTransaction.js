import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faDollarSign, faCalendarAlt, faPen, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import categories from "./categories";
import Calendar from "react-calendar";

export const NewTransaction = () => {
  const [showNewTransactionForm, setShowNewTransactionForm] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const [category, setCategory] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("wybierz kategorię");
  const [cost, setCost] = useState(0);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");

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
    setShowCalendar((state) => !state);
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
                  {showCalendar === true && <Calendar value={date} onChange={setDate} />}
                </div>
                <div className="newTransaction__label">
                  <p>
                    <FontAwesomeIcon icon={faPen} className="newTransaction__icon" />
                  </p>
                  <textarea rows="1" type="text" placeholder="miejsce na notatkę" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button className="btn btn-addTransaction">dodaj</button>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
