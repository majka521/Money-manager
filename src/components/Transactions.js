import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase";
import { SingleTransaction } from "./SingleTransaction";
// import { getColor, getIcon } from "./data/categories";

export const Transactions = ({ database, setDatabase, setShowNewTransactionForm, setShowEditTransactionForm, editMode, setEditMode }) => {
  // firebase - ordered existing data
  useEffect(() => {
    db.collection("transaction")
      .orderBy("date", "desc")
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
  }, [setDatabase]);

  // Add new transaction button
  const handleNewTransaction = () => {
    setShowNewTransactionForm((state) => !state);
  };

  // // Edit transaction button
  // const handleEditTransaction = (e, data) => {
  //   e.preventDefault();
  //   setShowEditTransactionForm(true);
  //   setEditMode(data);
  // };

  return (
    <>
      <section className="history section">
        <div className="section__header history__header">
          <div>
            <h2 className="section__title">Transakcje</h2>
            <p className="section__timePeriod">tu będą daty z okresu czasu</p>
          </div>
          <button className="btn btn-newTransaction" onClick={handleNewTransaction}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <ul>
          {database.map((data) => {
            return (
              <SingleTransaction
                dataID={data.id}
                editModeID={editMode.id}
                dataCategory={data.category}
                dataCategoryTitle={data.categoryTitle}
                dataCost={data.cost}
                dataDescription={data.description}
                data={data}
                setShowEditTransactionForm={setShowEditTransactionForm}
                setEditMode={setEditMode}
              />
              // <li key={data.id} className={`history__li ${editMode.id === data.id ? "history__editing" : ""}`}>
              //   <a href="/" className={`history__singleTransaction`} onClick={(e) => handleEditTransaction(e, data)}>
              //     <div className="history__singleTransaction__group">
              //       <FontAwesomeIcon icon={getIcon(data.category)} className="history__singleTransaction__icon" style={{ color: getColor(data.category) }} />
              //       <div>
              //         <p>{new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
              //         <h3>{data.categoryTitle}</h3>
              //         <p className="history__singleTransaction__description">{data.description}</p>
              //       </div>
              //     </div>
              //     <p className="history__singleTransaction__cost">-{data.cost} zł</p>
              //   </a>
              // </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};
