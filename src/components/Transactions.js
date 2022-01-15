import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase";
import { SingleTransaction } from "./SingleTransaction";

export const Transactions = ({
  database,
  setDatabase,
  setNewTransactionMode,
  editMode,
  setEditMode,
  setActiveCategory,
  setActiveCategorySum,
  currentlyDateStart,
  setCurrentlyDateStart,
  currentlyDateEnd,
  setCurrentlyDateEnd,
}) => {
  //Set first and last date
  const datesArray = database.map((data) => data.date.seconds);

  useEffect(() => {
    setCurrentlyDateEnd(new Date(datesArray[0] * 1000).toLocaleDateString());
    setCurrentlyDateStart(new Date(datesArray[datesArray.length - 1] * 1000).toLocaleDateString());
  });

  // Firebase - ordered existing data
  useEffect(() => {
    db.collection("transaction")
      .orderBy("date", "desc")
      .get()
      .then((querySnapshot) => {
        const queryData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setDatabase(queryData);
      });
  }, [setDatabase]);

  // Add new transaction button
  const handleNewTransaction = () => setNewTransactionMode((newTransactionMode) => !newTransactionMode);
  return (
    <>
      <section className="history section">
        <div className="section__header history__header">
          <div>
            <h2 className="section__title">Transakcje</h2>
            {!database.length ? (
              // setLoading
              <h1>Ładuję dane...</h1>
            ) : (
              <p className="section__timePeriod">
                {currentlyDateStart} - {currentlyDateEnd}
              </p>
            )}
          </div>
          <button className="btn btn-newTransaction" onClick={handleNewTransaction}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        {!database.length ? <h1>Ładuję dane...</h1> : ""}
        <ul>
          {database.map((data) => {
            return (
              <SingleTransaction
                key={data.id}
                dataID={data.id}
                dataCategory={data.category}
                dataCategoryTitle={data.categoryTitle}
                dataCost={data.cost}
                dataDescription={data.description}
                data={data}
                statisticMode={false}
                setActiveCategory={setActiveCategory}
                editModeID={editMode.id}
                setEditMode={setEditMode}
                setActiveCategorySum={setActiveCategorySum}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
};
