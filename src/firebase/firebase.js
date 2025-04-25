// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBKT2EyuMtocu1DCtYmDrr7NqYVNwAaSPs",
    authDomain: "rangmanch-4189e.firebaseapp.com",
    projectId: "rangmanch-4189e",
    storageBucket: "rangmanch-4189e.firebasestorage.app",
    messagingSenderId: "385690692095",
    appId: "1:385690692095:web:5c3a871035d694f4415fca",
    measurementId: "G-73V0QBMC4F"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Configure Google Auth Provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Enable offline persistence
enableIndexedDbPersistence(db)
    .catch((err) => {
        if (err.code === 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled in one tab at a time.
            console.warn('Firebase persistence failed - multiple tabs open');
        } else if (err.code === 'unimplemented') {
            // The current browser does not support persistence
            console.warn('Firebase persistence not supported in this browser');
        }
    });

export { auth, app, analytics, db, googleProvider };