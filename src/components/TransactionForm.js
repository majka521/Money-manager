import React, { useRef, useState, useEffect } from "react";
import Calendar from "react-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faCalendarAlt, faPen, faChevronDown, faChevronUp, faTimes, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase";
import { categories, getIcon } from "./data/categories";

export const TransactionForm = ({ setDatabase, setNewTransactionMode, editMode, setEditMode }) => {
  //Set fields of document in database
  const [category, setCategory] = useState("groceries");
  const [categoryTitle, setCategoryTitle] = useState("Zakupy spożywcze");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");

  //Show category list or calendar
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  //Up or down arrows in button
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
    // if (addClassOnClickDate)
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
    //Up or down arrows in button
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
    setShowCategoryList(false);
    setChevronFirst(faChevronDown);
    setAddClassOnClickCategory(false);
  };

  //Show calendar button
  const handleShowCalendar = (e) => {
    e.preventDefault();
    setShowCalendar((state) => !state);
    setAddClassOnClickDate((state) => !state);
    //Up or down arrows in button
    if (chevronSecond === faChevronDown) {
      setChevronSecond(faChevronUp);
    } else {
      setChevronSecond(faChevronDown);
    }
  };
  //Choose date buttons
  const handleChooseDate = (date) => {
    setDate(date);
    setShowCalendar(false);
    setChevronSecond(faChevronDown);
    setAddClassOnClickDate(false);
  };

  //AddTransaction button validation
  const [nameOfClassAddTransaction, setNameOfClassAddTransaction] = useState("btn-inActive");
  const [disabledAddTransaction, setDisabledAddTransaction] = useState(true);
  useEffect(() => {
    if (cost > 0 && cost !== "" && parseFloat(cost) === parseFloat(parseFloat(cost).toFixed(2))) {
      setNameOfClassAddTransaction("btn-addTransaction");
      setDisabledAddTransaction("");
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
      setNewTransactionMode(false);
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
        .then(() => {
          setDatabase((state) =>
            state
              .filter((el) => {
                return el.id !== editMode.id;
              })
              .concat([{ category: category, categoryTitle: categoryTitle, cost: cost, date: { seconds: date.getTime() / 1000 }, description: description, id: editMode.id }])
              .sort((a, b) => {
                return b.date.seconds - a.date.seconds;
              })
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
    setEditMode(false);
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
      setEditMode(false);
    } else {
      setNewTransactionMode(false);
    }
  };

  //Function that disable category list if you click outside of it
  function useOutsideCategoryList(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setAddClassOnClickCategory(false);
          setShowCategoryList(false);
          setChevronFirst(faChevronDown);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRefCategoryList = useRef(null);
  useOutsideCategoryList(wrapperRefCategoryList);

  //Function that disable calendar if you click outside of it
  function useOutsideCalendar(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setAddClassOnClickDate(false);
          setShowCalendar(false);
          setChevronSecond(faChevronDown);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRefCalendar = useRef(null);
  useOutsideCalendar(wrapperRefCalendar);

  return (
    <section className="newTransaction section container">
      <button className="btn btn-exit" onClick={handleExitTransaction}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <form className="newTransaction__form">
        <div className="newTransaction__form__inputs">
          <div className="newTransaction__form__inputs__box">
            <p className="newTransaction__description">
              <FontAwesomeIcon icon={faThumbtack} className="newTransaction__icon" /> {chooseOrEdit} kategorię:
            </p>
            <div ref={wrapperRefCategoryList} className="newTransaction__form--relativeBox">
              <button className={`${nameOfClassOnClickCategory} btn btn-category btn-category-list`} onClick={handleShowCategoryList}>
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
          </div>
          <div className="newTransaction__form__inputs__box">
            <p className="newTransaction__description">
              <FontAwesomeIcon icon={faDollarSign} className="newTransaction__icon" /> {typeOrEdit} kwotę:
            </p>
            <div className="newTransaction__label newTransaction__label__input">
              <input type="number" placeholder={"0 zł"} name="cost" value={cost} step="0.01" onChange={(e) => setCost(e.target.value)} />
            </div>
          </div>
          <div className="newTransaction__form__inputs__box">
            <p className="newTransaction__description">
              <FontAwesomeIcon icon={faCalendarAlt} className="newTransaction__icon" /> {chooseOrEdit} datę:
            </p>
            <div ref={wrapperRefCalendar} className="newTransaction__form--relativeBox">
              <button onClick={handleShowCalendar} className={`${nameOfClassOnClickDate} btn btn-category`}>
                {date.toLocaleDateString()} <FontAwesomeIcon icon={chevronSecond} className="newTransaction__icon__btn" />
              </button>
              {showCalendar === true && (
                <div className="calendar">
                  <Calendar value={date} onClickDay={(date) => handleChooseDate(date)} minDate={new Date(2011, 0, 1)} maxDate={new Date(2030, 11, 31)} />
                </div>
              )}
            </div>
          </div>

          <div className="newTransaction__form__inputs__box">
            <p className="newTransaction__description">
              <FontAwesomeIcon icon={faPen} className="newTransaction__icon" /> {typeOrEditNote}:
            </p>
            <div className="newTransaction__label newTransaction__label__input">
              <textarea maxLength="28" type="text" placeholder="miejsce na notatkę" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="newTransaction__buttons">
          <button disabled={disabledAddTransaction} onClick={handleAddTransaction} className={`${nameOfClassAddTransaction} btn`}>
            {addOrEditButton}
          </button>
          {editMode !== false && (
            <button className="btn btn-delete" onClick={handleDeleteTransaction}>
              Usuń
            </button>
          )}
        </div>
      </form>
    </section>
  );
};
