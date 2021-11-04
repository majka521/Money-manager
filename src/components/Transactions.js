import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { NewTransaction } from "./NewTransaction";
import { db } from "../firebase";

export const Transaction = () => {
  const [showNewTransactionForm, setShowNewTransactionForm] = useState(false);
  const [database, setDatabase] = useState([]);

  // firebase - pobranie istniejących danych
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

  return (
    <section className="history section">
      <div className="section__header history__header">
        <div>
          <h2 className="section__title">Transakcje</h2>
          <p className="section__timePeriod">tu będą daty z okresu czasu</p>
        </div>
        <button className="btn btn-newTransaction" onClick={handleNewTransaction}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <NewTransaction
          showNewTransactionForm={showNewTransactionForm}
          setDatabase={setDatabase}
          setShowNewTransactionForm={setShowNewTransactionForm}
          handleNewTransaction={handleNewTransaction}
        ></NewTransaction>
      </div>
      <ul className="history__allList">
        {database.map((data) => {
          return (
            <li key={data.id}>
              <a href="/" className="history__singleTransaction">
                <div className="history__singleTransaction__group">
                  <FontAwesomeIcon icon={faCar} className="history__singleTransaction__icon" />
                  <div>
                    <h3 className="history__singleTransaction__categoryTitle">{data.categoryTitle}</h3>
                    <p className="history__singleTransaction__description">{data.description}</p>
                  </div>
                </div>
                <p className="history__singleTransaction__cost">-{data.cost} zł</p>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
