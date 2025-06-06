// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuehBkaPES_UHO9SJ-ag43AyejWNVudoA",
  authDomain: "addhope-golfday.firebaseapp.com",
  projectId: "addhope-golfday",
  storageBucket: "addhope-golfday.firebasestorage.app",
  messagingSenderId: "632881170544",
  appId: "1:632881170544:web:943fc5502e251eb0640cb5",
  measurementId: "G-SQ2CMM306T"
};

// Initialize Firebase
// To avoid re-initializing on hot reloads in development, check if an app already exists.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics and export it (check for support first)
let analytics;
if (typeof window !== 'undefined') { // Check if window is defined (runs on client-side)
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized");
    } else {
      console.log("Firebase Analytics is not supported in this environment.");
    }
  }).catch(error => {
    console.error("Error checking Firebase Analytics support:", error);
  });
}

export { app, analytics };
