import React, { useEffect } from "react";

export const Transaction = ({ database }) => {
  useEffect(() => {
    console.log(database);
  }, [database]);
  return (
    <>
      <p></p>
    </>
  );
};
