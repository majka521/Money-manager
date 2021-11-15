// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";

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

// Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());

// var firebase = require('firebase');
// var firebaseui = require('firebaseui');

const db = firebase.firestore();

export { db };
