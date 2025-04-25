// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
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

let auth;
let app;
let analytics;
let db;
let googleProvider;

try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    
    // Initialize Auth
    auth = getAuth(app);
    
    // Initialize Firestore with proper configuration and error handling
    db = initializeFirestore(app, {
        cacheSizeBytes: 50 * 1024 * 1024, // 50 MB cache size
        experimentalForceLongPolling: true,
        useFetchStreams: false,
        ignoreUndefinedProperties: true,
        cache: {
            persistenceEnabled: true,
            tabSynchronization: false // Disable multi-tab to avoid conflicts
        }
    });

    // Initialize analytics only in production and if supported
    analytics = typeof window !== 'undefined' && process.env.NODE_ENV === 'production' 
        ? getAnalytics(app) 
        : null;

    // Configure Google Auth Provider
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
        prompt: 'select_account'
    });
} catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
}

export { auth, app, analytics, db, googleProvider };