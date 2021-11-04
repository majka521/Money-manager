import React from "react";
import { Header } from "./Header";
import { Transaction } from "./Transactions";
import { Statistics } from "./Statistics";

export const App = () => {
  return (
    <>
      <Header />
      <main className="mainSection container">
        <Transaction />
        <Statistics />
      </main>
    </>
  );
};
