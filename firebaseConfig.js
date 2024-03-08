import { initializeApp } from "firebase/app";
import {
  getAuth,
  inMemoryPersistence,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDyZE7R90V9hhLw3pWeW8hGkQfy2JR0MRc",
  authDomain: "randommoviegenerator-402519.firebaseapp.com",
  projectId: "randommoviegenerator-402519",
  databaseURL:
    "https://randommoviegenerator-402519-default-rtdb.firebaseio.com",
  storageBucket: "randommoviegenerator-402519.appspot.com",
  messagingSenderId: "1002595472612",
  appId: "1:1002595472612:web:8697b00bc01ae452d288f1",
  measurementId: "G-LPP03QGVY6",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// const auth = getAuth(app);

export { app, auth };
