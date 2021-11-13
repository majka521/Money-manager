import React, { useState } from "react";
import { Header } from "./Header";
import { Transactions } from "./Transactions";
import { Statistics } from "./Statistics";
import { TransactionForm } from "./TransactionForm";
import { SingleStatistic } from "./SingleStatistic";
import { Footer } from "./Footer";

export const App = () => {
  const [database, setDatabase] = useState([]); //currently database
  const [newTransactionMode, setNewTransactionMode] = useState(false); //on/off new transaction mode
  const [editMode, setEditMode] = useState(false); // on/off edit mode
  const [statisticMode, setStatisticMode] = useState(false); // on/off statistics mode
  const [singleStatistic, setSingleStatistic] = useState([]); //currently selected category for the statistics
  const [activeCategory, setActiveCategory] = useState(false); //SingleStatistic currently category title
  const [activeCategorySum, setActiveCategorySum] = useState(false); //SingleStatistic currently category sum
  const [currentlyDateStart, setCurrentlyDateStart] = useState(false); //Currently dates
  const [currentlyDateEnd, setCurrentlyDateEnd] = useState(false); //Currently dates

  return (
    <>
      <Header />
      {newTransactionMode === true && <TransactionForm setDatabase={setDatabase} setNewTransactionMode={setNewTransactionMode} editMode={false} />}

      {editMode !== false && <TransactionForm setDatabase={setDatabase} editMode={editMode} setEditMode={setEditMode} />}

      <main className="mainSection container">
        <Transactions
          database={database}
          setDatabase={setDatabase}
          setNewTransactionMode={setNewTransactionMode}
          editMode={editMode}
          setEditMode={setEditMode}
          setActiveCategory={setActiveCategory}
          setActiveCategorySum={setActiveCategorySum}
          currentlyDateStart={currentlyDateStart}
          setCurrentlyDateStart={setCurrentlyDateStart}
          currentlyDateEnd={currentlyDateEnd}
          setCurrentlyDateEnd={setCurrentlyDateEnd}
        />
        <Statistics
          database={database}
          statisticMode={statisticMode}
          setStatisticMode={setStatisticMode}
          setSingleStatistic={setSingleStatistic}
          currentlyDateStart={currentlyDateStart}
          currentlyDateEnd={currentlyDateEnd}
        />
      </main>

      {statisticMode !== false && (
        <SingleStatistic
          statisticMode={statisticMode}
          setStatisticMode={setStatisticMode}
          singleStatistic={singleStatistic}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activeCategorySum={activeCategorySum}
          setActiveCategorySum={setActiveCategorySum}
          currentlyDateStart={currentlyDateStart}
          currentlyDateEnd={currentlyDateEnd}
        />
      )}
      <Footer />
    </>
  );
};
