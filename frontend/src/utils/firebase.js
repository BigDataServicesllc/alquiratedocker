import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKZ-Qmb7Nzq5sRzpOqhWPjOnPmzG33wBU",
  authDomain: "alquirate-be328.firebaseapp.com",
  projectId: "alquirate-be328",
  storageBucket: "alquirate-be328.appspot.com",
  messagingSenderId: "972818933952",
  appId: "1:972818933952:web:35e1d7fe721d21ca332525",
  measurementId: "G-NKQJHE17LX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

// Email link settings
const actionCodeSettings = {
  url: 'https://alquirate.com/login', // Cambialo si tu login está en otra ruta
  handleCodeInApp: true
};

export {
  auth,
  googleProvider,
  facebookProvider,
  appleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  actionCodeSettings
};
