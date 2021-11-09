import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { db } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faCalendarAlt, faPen, faChevronDown, faChevronUp, faTimes, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { categories } from "./data/categories";
import { getIcon } from "./data/categories";

export const TransactionForm = ({ database, setDatabase, setShowNewTransactionForm, setShowEditTransactionForm, editMode, setEditMode }) => {
  //Set fields of document in database
  const [category, setCategory] = useState("groceries");
  const [categoryTitle, setCategoryTitle] = useState("Zakupy spożywcze");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");

  //Show category list or calendar
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  //Up or Down arrows in button
  const [chevronFirst, setChevronFirst] = useState(faChevronDown);
  const [chevronSecond, setChevronSecond] = useState(faChevronDown);

  //Changes className of buttons like :focus
  const [addClassOnClickCategory, setAddClassOnClickCategory] = useState(false);
  const [nameOfClassOnClickCategory, setNameOfClassOnClickCategory] = useState("");
  const [addClassOnClickDate, setAddClassOnClickDate] = useState(false);
  const [nameOfClassOnClickDate, setNameOfClassOnClickDate] = useState("");
  useEffect(() => {
    if (addClassOnClickCategory === true) {
      setNameOfClassOnClickCategory("selectedCategory");
    } else {
      setNameOfClassOnClickCategory("");
    }
  }, [addClassOnClickCategory]);
  useEffect(() => {
    if (addClassOnClickDate === true) {
      setNameOfClassOnClickDate("selectedDate");
    } else {
      setNameOfClassOnClickDate("");
    }
  }, [addClassOnClickDate]);

  //Edit mode - settings
  const [chooseOrEdit, setChooseOrEdit] = useState("Wybierz");
  const [typeOrEdit, setTypeOrEdit] = useState("Wpisz");
  const [typeOrEditNote, setTypeOrEditNote] = useState("Miejsce na notatkę");
  const [addOrEditButton, setAddOrEditButton] = useState("Dodaj");
  useEffect(() => {
    if (editMode !== false) {
      setChooseOrEdit("Edytuj");
      setTypeOrEdit("Edytuj");
      setTypeOrEditNote("Edytuj notatkę");
      setAddOrEditButton("Edytuj");
      setCategory(editMode.category);
      setCategoryTitle(editMode.categoryTitle);
      setCost(editMode.cost);
      setDate(new Date(editMode.date.seconds * 1000));
      setDescription(editMode.description);
    }
  }, [editMode]);

  //Show category list button
  const handleShowCategoryList = (e) => {
    e.preventDefault();
    setShowCategoryList((state) => !state);
    setAddClassOnClickCategory((state) => !state);
    //Up or Down arrows in button
    if (chevronFirst === faChevronDown) {
      setChevronFirst(faChevronUp);
    } else {
      setChevronFirst(faChevronDown);
    }
  };
  //Choose category buttons
  const handleChooseCategory = (e, selectedCategory, selectedTitle) => {
    e.preventDefault();
    setCategory(selectedCategory);
    setCategoryTitle(selectedTitle);
    setShowCategoryList((state) => !state);
    setChevronFirst(faChevronDown);
    setAddClassOnClickCategory((state) => !state);
  };

  //Show Calendar button
  const handleShowCalendar = (e) => {
    e.preventDefault();
    setShowCalendar((state) => !state);
    setAddClassOnClickDate((state) => !state);
    //Up or Down arrows in button
    if (chevronSecond === faChevronDown) {
      setChevronSecond(faChevronUp);
    } else {
      setChevronSecond(faChevronDown);
    }
  };
  //Choose Date buttons
  const handleChooseDate = (date) => {
    setDate(date);
    setShowCalendar(false);
    setChevronSecond(faChevronDown);
    setAddClassOnClickDate((state) => !state);
  };

  //AddTransaction button validation
  const [nameOfClassAddTransaction, setNameOfClassAddTransaction] = useState("btn-inActive");
  const [disabledAddTransaction, setDisabledAddTransaction] = useState(true);
  useEffect(() => {
    if (cost > 0 || cost !== "") {
      // if (parseFloat(cost) !== parseFloat(cost.toFixed(2))) {
      setNameOfClassAddTransaction("btn-addTransaction");
      setDisabledAddTransaction("");
      // }
    } else {
      setNameOfClassAddTransaction("btn-inActive");
      setDisabledAddTransaction(true);
    }
  }, [cost]);

  //New transaction and EditMode - add or edit buttons
  const handleAddTransaction = (e) => {
    e.preventDefault();
    //New transaction - add button
    if (editMode === false) {
      setShowNewTransactionForm(false);
      setCategory("groceries");
      setCategoryTitle("Zakupy spożywcze");
      setCost(0);
      setDate(new Date());
      setDescription("");
      //Firebase - add to database
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
    }
    //EditMode - edit button
    else if (editMode !== false) {
      setShowEditTransactionForm(false);
      setEditMode(false);
      //Firebase - edit
      db.collection("transaction")
        .doc(editMode.id)
        .set({
          category: category,
          categoryTitle: categoryTitle,
          cost: cost,
          date: date,
          description: description,
        })
        .then((doc) => {
          setDatabase(
            (state) =>
              database.filter((el) => {
                return el.id !== editMode.id;
              })
            // .push({ category: category, categoryTitle: categoryTitle, cost: cost, date: { seconds: date.getTime() / 1000 }, description: description, id: doc.id })

            // [ ...state,

            //   // { category: category, categoryTitle: categoryTitle, cost: cost, date: { seconds: date.getTime() / 1000 }, description: description, id: doc.id }

            // ].sort((a, b) => {
            //   return b.date.seconds - a.date.seconds;
            // })
          );
        })
        .catch((error) => {
          console.error("Error editing document: ", error);
        });
    }
  };

  //EditMode - delete button
  const handleDeleteTransaction = (e) => {
    e.preventDefault();
    setShowEditTransactionForm(false);
    // Firebase - delete
    db.collection("transaction")
      .doc(editMode.id)
      .delete()
      .then(() => {
        setDatabase((state) =>
          state.filter((el) => {
            return el.id !== editMode.id;
          })
        );
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  //Exit buttons
  const handleExitTransaction = () => {
    if (editMode !== false) {
      setShowEditTransactionForm(false);
      setEditMode(false);
    } else {
      setShowNewTransactionForm(false);
    }
  };

  return (
    <section className="newTransaction section container">
      <button className="btn btn-exit" onClick={handleExitTransaction}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <form className="newTransaction__form">
        <div>
          <p className="newTransaction__description">
            <FontAwesomeIcon icon={faThumbtack} className="newTransaction__icon" /> {chooseOrEdit} kategorię:
          </p>
          <button className={`${nameOfClassOnClickCategory} btn btn-category`} onClick={handleShowCategoryList}>
            <FontAwesomeIcon icon={getIcon(category)} /> {categoryTitle} <FontAwesomeIcon icon={chevronFirst} className="newTransaction__icon__btn" />
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
            <FontAwesomeIcon icon={faDollarSign} className="newTransaction__icon" /> {typeOrEdit} kwotę:
          </p>
          <div className="newTransaction__label newTransaction__label__input">
            <input type="number" placeholder={"0 zł"} name="cost" value={cost} step="0.01" onChange={(e) => setCost(e.target.value)} />
          </div>
        </div>
        <div>
          <p className="newTransaction__description">
            <FontAwesomeIcon icon={faCalendarAlt} className="newTransaction__icon" /> {chooseOrEdit} datę:
          </p>
          <button onClick={handleShowCalendar} className={`${nameOfClassOnClickDate} btn btn-category`}>
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
            <FontAwesomeIcon icon={faPen} className="newTransaction__icon" /> {typeOrEditNote}:
          </p>
          <div className="newTransaction__label newTransaction__label__input">
            <textarea maxLength="24" type="text" placeholder="miejsce na notatkę" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>
        <button disabled={disabledAddTransaction} onClick={handleAddTransaction} className={`${nameOfClassAddTransaction} btn`}>
          {addOrEditButton}
        </button>
        {editMode !== false && (
          <button className="btn btn-delete" onClick={handleDeleteTransaction}>
            Usuń
          </button>
        )}
      </form>
    </section>
  );
};
