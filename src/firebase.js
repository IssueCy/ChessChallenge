import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBItyd-RH2CRGwbeAUgbkcy2mi_F-NeSBk",
  authDomain: "simtec-chess-puzzle.firebaseapp.com",
  projectId: "simtec-chess-puzzle",
  storageBucket: "simtec-chess-puzzle.firebasestorage.app",
  messagingSenderId: "13745527519",
  appId: "1:13745527519:web:b517c0346db8390855a76a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default app;
export { auth };