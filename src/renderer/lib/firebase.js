// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdEg0RYL5rqEgAIxef_MitsQuQxmRG1Xo",
  authDomain: "bp-nodes.firebaseapp.com",
  projectId: "bp-nodes",
  storageBucket: "bp-nodes.firebasestorage.app",
  messagingSenderId: "711026158722",
  appId: "1:711026158722:web:8b1429d5cbf4f2a4dad89b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Persistencia local (se recuerda la sesión)
setPersistence(auth, browserLocalPersistence);
export const db = getFirestore(app);
// Exporta TODO lo que usa tu modal
export {
  auth,
  // estado
  onAuthStateChanged,
  // sesión
  signOut,
  // email/pass
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  // Google
  GoogleAuthProvider,
  signInWithPopup
};