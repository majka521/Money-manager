import React, { useState } from "react";
import { Header } from "./Header";
import { NewTransaction } from "./NewTransaction";
import { Transaction } from "./Transactions";
import { Statistics } from "./Statistics";

export const App = () => {
  const [showNewTransactionForm, setShowNewTransactionForm] = useState(false);
  const [database, setDatabase] = useState([]);

  return (
    <>
      <Header />
      <NewTransaction showNewTransactionForm={showNewTransactionForm} setDatabase={setDatabase} setShowNewTransactionForm={setShowNewTransactionForm}></NewTransaction>
      <main className="mainSection container">
        <Transaction database={database} setDatabase={setDatabase} setShowNewTransactionForm={setShowNewTransactionForm} />
        <Statistics />
      </main>
    </>
  );
};
