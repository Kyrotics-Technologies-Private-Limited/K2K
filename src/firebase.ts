// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXjIGzZwTzTm2fjvTheUHcWUkMytOFr7E",
  authDomain: "kishan2kitchen-d7fa4.firebaseapp.com",
  projectId: "kishan2kitchen-d7fa4",
  storageBucket: "kishan2kitchen-d7fa4.firebasestorage.app",
  messagingSenderId: "994149729769",
  appId: "1:994149729769:web:280312495818ef0d25f778"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//export type FirebaseUser = User;