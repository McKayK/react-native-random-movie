import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyZE7R90V9hhLw3pWeW8hGkQfy2JR0MRc",
  authDomain: "randommoviegenerator-402519.firebaseapp.com",
  projectId: "randommoviegenerator-402519",
  databaseURL:
    "https://console.firebase.google.com/u/0/project/randommoviegenerator-402519/database/randommoviegenerator-402519-default-rtdb/data/~2F",
  storageBucket: "randommoviegenerator-402519.appspot.com",
  messagingSenderId: "1002595472612",
  appId: "1:1002595472612:web:8697b00bc01ae452d288f1",
  measurementId: "G-LPP03QGVY6",
};

const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

const auth = getAuth(app);

export { database, app, auth };