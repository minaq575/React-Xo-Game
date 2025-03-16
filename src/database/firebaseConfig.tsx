
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBNvnPquzg3D6XNC5LufhQkX-ejZxFex4Y",
    authDomain: "react-xo-game.firebaseapp.com",
    projectId: "react-xo-game",
    storageBucket: "react-xo-game.firebasestorage.app",
    messagingSenderId: "158790308008",
    appId: "1:158790308008:web:ce71d6146c821801e7f29d",
    measurementId: "G-0Z90VTFP9F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };