


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvgVg_KvIOP-iBD1BM76FMqTW3kEgkJSw",
  authDomain: "testing-41ba7.firebaseapp.com",
  projectId: "testing-41ba7",
  storageBucket: "testing-41ba7.firebasestorage.app",
  messagingSenderId: "605050467493",
  appId: "1:605050467493:web:2862212d569942ac9e494c",
  measurementId: "G-SYCWRQM9GX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const analytics = getAnalytics(app);
export default analytics