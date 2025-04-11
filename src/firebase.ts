// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";





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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// // Initialize App Check with reCAPTCHA Enterprise
// try {
//   console.log('Initializing App Check with reCAPTCHA Enterprise...');
  
//   // Check if grecaptcha is available
//   if (typeof window.grecaptcha === 'undefined') {
//     console.error('grecaptcha is not defined. Make sure the reCAPTCHA Enterprise script is loaded.');
//     throw new Error('grecaptcha is not defined');
//   }
  
//   // Initialize App Check with reCAPTCHA Enterprise
//   const appCheck = initializeAppCheck(app, {
//     provider: new ReCaptchaEnterpriseProvider('6LfULxErAAAAALSOMPziC_L06HeBB_NDqPXURBE_'),
//     isTokenAutoRefreshEnabled: true
//   });
  
//   console.log('App Check initialized successfully with reCAPTCHA Enterprise');
// } catch (error) {
//   console.error('Error initializing App Check:', error);
// }

export { app, analytics, auth, db, storage };