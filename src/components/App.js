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
  const [activeCategory, setActiveCategory] = useState(false); //SingleStatistic currently title

  //daty z okresem czasu
  //żeby singleStatistics nie były klikalne
  //jak dodaję to mi się nie odświeża w singletransaction statistics
  //scss - buttons, calendar, transactionForm
  //favicon

  return (
    <>
      <Header />
      {newTransactionMode === true && <TransactionForm setDatabase={setDatabase} setNewTransactionMode={setNewTransactionMode} editMode={false} />}

      {editMode !== false && <TransactionForm setDatabase={setDatabase} editMode={editMode} setEditMode={setEditMode} />}

      <main className="mainSection container">
        <Transactions database={database} setDatabase={setDatabase} setNewTransactionMode={setNewTransactionMode} editMode={editMode} setEditMode={setEditMode} setActiveCategory={setActiveCategory} />
        <Statistics database={database} statisticMode={statisticMode} setStatisticMode={setStatisticMode} setSingleStatistic={setSingleStatistic} />
      </main>

      {statisticMode !== false && <SingleStatistic setStatisticMode={setStatisticMode} singleStatistic={singleStatistic} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />}
      <Footer />
    </>
  );
};
