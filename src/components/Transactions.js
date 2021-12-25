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
//  // let datesArray = [];
//   database.map((data) => {
//     datesArray.push(data.date.seconds); // timestamp?
//     return datesArray;
//   });
  
  const datesArray = database.map(data => data.date.seconds);

  useEffect(() => {
    // console.log('!!!', 'use Effect');
    // const datesArray = database.map(data => data.date.seconds);
    setCurrentlyDateEnd(new Date(datesArray[0] * 1000).toLocaleDateString());
    setCurrentlyDateStart(new Date(datesArray[datesArray.length - 1] * 1000).toLocaleDateString());
  // }, [database,setCurrentlyDateEnd, setCurrentlyDateStart]);
  });

  // Firebase - ordered existing data
  useEffect(() => {
    db.collection("transaction")
      .orderBy("date", "desc")
      .get()
      .then((querySnapshot) => {
        // querySnapshot.forEach((doc) => {
        //   console.log(doc.data(), doc.id);
        //   setDatabase((state) => [
        //     ...state,
        //     {
        //       ...doc.data(),
        //       id: doc.id,
        //     },
        //   ]);
        // });
        const queryData =  querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setDatabase(queryData);
      });
  }, [setDatabase]);

  // Add new transaction button
  const handleNewTransaction = () => {
    // nazwy zmiennych!
    setNewTransactionMode((transactionMode) => !transactionMode);
  };
  return (
    <>
      <section className="history section">
        <div className="section__header history__header">
          <div>
            <h2 className="section__title">Transakcje</h2>
            {/* !database.length */}
            {database.length === 0 ? (
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
        {database.length === 0 ? <h1>Ładuję dane...</h1> : ""}
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
