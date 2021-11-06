import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase";
import { getColor, getIcon } from "./data/categories";

export const Transaction = ({ database, setDatabase, setShowNewTransactionForm }) => {
  // firebase - pobranie istniejących danych
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

  const handleNewTransaction = () => {
    setShowNewTransactionForm((state) => !state);
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
        <ul className="history__allList">
          {database.map((data) => {
            return (
              <li key={data.id} className="history__li">
                <a href="/" className="history__singleTransaction">
                  <div className="history__singleTransaction__group">
                    <FontAwesomeIcon icon={getIcon(data.category)} className="history__singleTransaction__icon" style={{ color: getColor(data.category) }} />
                    <div>
                      <p>{new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
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
    </>
  );
};
