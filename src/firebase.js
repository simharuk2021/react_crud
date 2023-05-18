import firebase from "firebase/compat/app";
import "firebase/compat/database";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApsobWnzmArAIP3SKYUeB-CnHPQNzJoYA",
  authDomain: "react-and-crud.firebaseapp.com",
  databaseURL: "https://react-and-crud-default-rtdb.firebaseio.com",
  projectId: "react-and-crud",
  storageBucket: "react-and-crud.appspot.com",
  messagingSenderId: "152978321388",
  appId: "1:152978321388:web:03c07383e445375bdc9ac9",
  measurementId: "G-F9L8GYWFMS"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export default database;