// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwnsyt-d5FiogW34slNs0lIUzDmxC884M",
  authDomain: "money-manager-12daf.firebaseapp.com",
  projectId: "money-manager-12daf",
  storageBucket: "money-manager-12daf.appspot.com",
  messagingSenderId: "877741962100",
  appId: "1:877741962100:web:19afaea4150715ab153221",
  measurementId: "G-H8ZNBSEZPT",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

export { db };
