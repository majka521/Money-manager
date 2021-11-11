import React, { useState } from "react";
import { Header } from "./Header";
import { Transactions } from "./Transactions";
import { Statistics } from "./Statistics";
import { TransactionForm } from "./TransactionForm";
import { SingleStatistics } from "./SingleStatistics";

export const App = () => {
  const [database, setDatabase] = useState([]); // actual database
  const [showNewTransactionForm, setShowNewTransactionForm] = useState(false); //on/off new transaction form
  const [showEditTransactionForm, setShowEditTransactionForm] = useState(false); //on/off edit transaction form
  const [editMode, setEditMode] = useState(false); // on/off edit mode
  const [statisticMode, setStatisticMode] = useState(false); // on/off edit mode

  //czy editmode i showedittransactionform nie mozna polaczyc??????
  //połączyć ul ze statistics z singletransaction
  //nowy komponent singlestatistics

  return (
    <>
      <Header />
      {showNewTransactionForm === true && <TransactionForm setDatabase={setDatabase} setShowNewTransactionForm={setShowNewTransactionForm} editMode={false} />}

      {showEditTransactionForm === true && (
        <TransactionForm database={database} setDatabase={setDatabase} setShowEditTransactionForm={setShowEditTransactionForm} editMode={editMode} setEditMode={setEditMode} />
      )}

      <main className="mainSection container">
        <Transactions
          database={database}
          setDatabase={setDatabase}
          setShowNewTransactionForm={setShowNewTransactionForm}
          setShowEditTransactionForm={setShowEditTransactionForm}
          editMode={editMode}
          setEditMode={setEditMode}
        />
        <Statistics database={database} statisticMode={statisticMode} setStatisticMode={setStatisticMode} />
      </main>

      {statisticMode !== false && <SingleStatistics />}
    </>
  );
};
