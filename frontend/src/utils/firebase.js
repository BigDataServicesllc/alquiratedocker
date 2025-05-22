import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKZ-Qmb7Nzq5sRzpOqhWPjOnPmzG33wBU",
  authDomain: "alquirate-be328.firebaseapp.com",
  projectId: "alquirate-be328",
  storageBucket: "alquirate-be328.appspot.com",
  messagingSenderId: "972818933952",
  appId: "1:972818933952:web:35e1d7fe721d21ca332525",
  measurementId: "G-NKQJHE17LX" // este lo podés dejar o sacar
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
