import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase";
import { SingleTransaction } from "./SingleTransaction";

export const Transactions = ({ database, setDatabase, setNewTransactionMode, editMode, setEditMode, setActiveCategory }) => {
  // Firebase - ordered existing data
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
    setNewTransactionMode((state) => !state);
  };

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
                key={data.id}
                dataID={data.id}
                dataCategory={data.category}
                dataCategoryTitle={data.categoryTitle}
                dataCost={data.cost}
                dataDescription={data.description}
                data={data}
                setActiveCategory={setActiveCategory}
                editModeID={editMode.id}
                setEditMode={setEditMode}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
};
