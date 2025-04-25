import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const businessFirebaseConfig = {
  apiKey: "AIzaSyASit8iitzXD8Ai9xx8dTCi5_r3e8WWbCg",
  authDomain: "rangmanchbuss.firebaseapp.com",
  projectId: "rangmanchbuss",
  storageBucket: "rangmanchbuss.firebasestorage.app",
  messagingSenderId: "252364669468",
  appId: "1:252364669468:web:a92ab94dfba16ad0b395d9",
  measurementId: "G-43YSYY4HG3"
};

// Initialize Firebase with a unique name to avoid conflicts
const businessApp = initializeApp(businessFirebaseConfig, 'business');
const businessAuth = getAuth(businessApp);

// Initialize Firestore with proper configuration
const businessDb = initializeFirestore(businessApp, {
  cacheSizeBytes: 50 * 1024 * 1024, // 50 MB cache size
  experimentalForceLongPolling: true,
  useFetchStreams: false,
  ignoreUndefinedProperties: true // Add this to handle undefined properties
});

// Initialize analytics
const businessAnalytics = getAnalytics(businessApp);

export { businessAuth, businessDb, businessAnalytics }; 