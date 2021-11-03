import React from "react";
// import { useState, useEffect } from "react";
// import { db } from "../firebase";
import { Header } from "./Header";
import { NewTransaction } from "./NewTransaction";

export const App = () => {
  return (
    <>
      <Header />
      <NewTransaction></NewTransaction>
    </>
  );
};
