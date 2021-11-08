import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { db } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faCalendarAlt, faPen, faChevronDown, faChevronUp, faTimes, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import categories from "./data/categories";
import { getIcon } from "./data/categories";

export const TransactionForm = ({ setDatabase, setShowNewTransactionForm, setShowEditTransactionForm, editMode, setNameOfClassOfEditingTransaction }) => {
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [chevronFirst, setChevronFirst] = useState(faChevronDown);
  const [chevronSecond, setChevronSecond] = useState(faChevronDown);

  const [category, setCategory] = useState("groceries");
  const [categoryTitle, setCategoryTitle] = useState("Zakupy spożywcze");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");

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

  //AddTransaction button validation
  const [nameOfClassAddTransaction, setNameOfClassAddTransaction] = useState("btn-inActive");
  const [disabledAddTransaction, setDisabledAddTransaction] = useState(true);
  useEffect(() => {
    if (cost > 0 && cost !== "") {
      setNameOfClassAddTransaction("btn-addTransaction");
      setDisabledAddTransaction("");
    } else {
      setNameOfClassAddTransaction("btn-inActive");
      setDisabledAddTransaction(true);
    }
  }, [cost]);

  //Edit mode
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
    } else {
      setChooseOrEdit("Wybierz");
      setTypeOrEdit("Wpisz");
      setTypeOrEditNote("Miejsce na notatkę");
      setAddOrEditButton("Dodaj");
      setCategory("groceries");
      setCategoryTitle("Zakupy spożywcze");
      setCost("");
      setDate(new Date());
      setDescription("");
    }
  }, [editMode]);

  const handleShowCategoryList = (e) => {
    e.preventDefault();
    setShowCategoryList((state) => !state);
    setAddClassOnClickCategory((state) => !state);

    if (chevronFirst === faChevronDown) {
      setChevronFirst(faChevronUp);
    } else {
      setChevronFirst(faChevronDown);
    }
  };
  const handleShowCalendar = (e) => {
    e.preventDefault();
    setShowCalendar((state) => !state);
    setAddClassOnClickDate((state) => !state);

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
    setAddClassOnClickCategory((state) => !state);
  };
  const handleChooseDate = (date) => {
    setDate(date);
    setShowCalendar(false);
    setChevronSecond(faChevronDown);
    setAddClassOnClickDate((state) => !state);
  };

  const handleExitTransaction = () => {
    if (editMode !== false) {
      setShowEditTransactionForm((state) => !state);
      setNameOfClassOfEditingTransaction("");
    } else {
      setShowNewTransactionForm((state) => !state);
    }
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();

    if (editMode !== false) {
      setShowEditTransactionForm((state) => !state);

      //firebase - edit
      // db.collection("transaction")
      //   .add({
      //     category: category,
      //     categoryTitle: categoryTitle,
      //     cost: cost,
      //     date: date,
      //     description: description,
      //   })
      //   .then((doc) => {
      //     setDatabase((state) =>
      //       [...state, { category: category, categoryTitle: categoryTitle, cost: cost, date: { seconds: date.getTime() / 1000 }, description: description, id: doc.id }].sort((a, b) => {
      //         return b.date.seconds - a.date.seconds;
      //       })
      //     );
      //   })
      //   .catch((error) => {
      //     console.error("Error writing document: ", error);
      //   });
    } else {
      setShowNewTransactionForm((state) => !state);

      setCategory("groceries");
      setCategoryTitle("Zakupy spożywcze");
      setCost(0);
      setDate(new Date());
      setDescription("");

      //firebase - add to database
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
  };

  const handleDeleteTransaction = (e) => {
    e.preventDefault();
    setShowEditTransactionForm(false);
    // setNameOfClassOfEditingTransaction("");

    // firebase - delete
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
            <input type="number" placeholder={"0 zł"} name="cost" value={cost} onChange={(e) => setCost(e.target.value)} />
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
