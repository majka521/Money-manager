import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { Header } from "./Header";
import { NewTransaction } from "./NewTransaction";

export const App = () => {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    db.collection("transaction")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setTransaction((state) => [
            ...state,
            {
              ...doc.data(),
              id: doc.id,
            },
          ]);
        });
      });
  }, []);

  return (
    <>
      <Header>{console.log(transaction)}</Header>
      <NewTransaction></NewTransaction>
    </>
  );
};
