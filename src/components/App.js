import React, { useState } from "react";
import { Header } from "./Header";
import { Transaction } from "./Transactions";
import { Statistics } from "./Statistics";
import { TransactionForm } from "./TransactionForm";

export const App = () => {
  const [showNewTransactionForm, setShowNewTransactionForm] = useState(false);
  const [showEditTransactionForm, setShowEditTransactionForm] = useState(false);
  const [editMode, setEditMode] = useState(false); //czy jesteśmy akurat w trybie edycji
  const [database, setDatabase] = useState([]);
  const [nameOfClassOfEditingTransaction, setNameOfClassOfEditingTransaction] = useState(false);

  return (
    <>
      <Header />
      {showNewTransactionForm === true && (
        <TransactionForm
          showNewTransactionForm={showNewTransactionForm}
          setShowNewTransactionForm={setShowNewTransactionForm}
          setDatabase={setDatabase}
          editMode={editMode}
          setNameOfClassOfEditingTransaction={setNameOfClassOfEditingTransaction}
          nameOfClassOfEditingTransaction={nameOfClassOfEditingTransaction}
        />
      )}

      {showEditTransactionForm === true && (
        <TransactionForm
          showEditTransactionForm={showEditTransactionForm}
          setShowEditTransactionForm={setShowEditTransactionForm}
          setDatabase={setDatabase}
          editMode={editMode}
          setNameOfClassOfEditingTransaction={setNameOfClassOfEditingTransaction}
          nameOfClassOfEditingTransaction={nameOfClassOfEditingTransaction}
        />
      )}

      <main className="mainSection container">
        <Transaction
          database={database}
          setDatabase={setDatabase}
          setShowNewTransactionForm={setShowNewTransactionForm}
          setShowEditTransactionForm={setShowEditTransactionForm}
          setEditMode={setEditMode}
          nameOfClassOfEditingTransaction={nameOfClassOfEditingTransaction}
          setNameOfClassOfEditingTransaction={setNameOfClassOfEditingTransaction}
        />
        <Statistics database={database} />
      </main>
    </>
  );
};
