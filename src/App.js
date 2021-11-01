import logo from "./logo.svg";
import { useState, useEffect } from "react";
import { db } from "./firebase";

function App() {
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
    <div className="App">
      {console.log(transaction)}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
