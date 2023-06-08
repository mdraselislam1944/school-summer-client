// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHejK2dXwRuolxz3QAfit-QXGPzL9zCvk",
  authDomain: "language-academy-db88e.firebaseapp.com",
  projectId: "language-academy-db88e",
  storageBucket: "language-academy-db88e.appspot.com",
  messagingSenderId: "967639921098",
  appId: "1:967639921098:web:4eff01570beaa3eb791f33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;