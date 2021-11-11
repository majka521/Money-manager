import React, { useState } from "react";
import { Header } from "./Header";
import { Transactions } from "./Transactions";
import { Statistics } from "./Statistics";
import { TransactionForm } from "./TransactionForm";
import { SingleStatistic } from "./SingleStatistic";

export const App = () => {
  const [database, setDatabase] = useState([]); // actual database
  const [newTransactionMode, setNewTransactionMode] = useState(false); //on/off new transaction mode
  const [editMode, setEditMode] = useState(false); // on/off edit mode
  const [statisticMode, setStatisticMode] = useState(false); // on/off statistics mode

  //połączyć ul ze statistics z singletransaction
  //nowy komponent singlestatistics
  //daty z okresem czasu
  //komentarze po angielsku
  //scss porzadek
  //footer

  return (
    <>
      <Header />
      {newTransactionMode === true && <TransactionForm setDatabase={setDatabase} setNewTransactionMode={setNewTransactionMode} editMode={false} />}

      {editMode !== false && <TransactionForm database={database} setDatabase={setDatabase} editMode={editMode} setEditMode={setEditMode} />}

      <main className="mainSection container">
        <Transactions database={database} setDatabase={setDatabase} setNewTransactionMode={setNewTransactionMode} editMode={editMode} setEditMode={setEditMode} />
        <Statistics database={database} statisticMode={statisticMode} setStatisticMode={setStatisticMode} />
      </main>

      {statisticMode !== false && <SingleStatistic />}
    </>
  );
};
