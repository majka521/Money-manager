import React, { useState } from "react";
import { Header } from "./Header";
import { NewTransaction } from "./NewTransaction";
import { Transaction } from "./Transactions";
import { Statistics } from "./Statistics";
import { EditTransaction } from "./EditTransaction";

export const App = () => {
  const [showNewTransactionForm, setShowNewTransactionForm] = useState(false);
  const [showEditTransactionForm, setShowEditTransactionForm] = useState(false);
  const [database, setDatabase] = useState([]);

  return (
    <>
      <Header />
      <NewTransaction showNewTransactionForm={showNewTransactionForm} setShowNewTransactionForm={setShowNewTransactionForm} setDatabase={setDatabase} />

      <EditTransaction showEditTransactionForm={showEditTransactionForm} setShowEditTransactionForm={setShowEditTransactionForm} setDatabase={setDatabase} />

      <main className="mainSection container">
        <Transaction database={database} setDatabase={setDatabase} setShowNewTransactionForm={setShowNewTransactionForm} setShowEditTransactionForm={setShowEditTransactionForm} />
        <Statistics />
      </main>
    </>
  );
};
