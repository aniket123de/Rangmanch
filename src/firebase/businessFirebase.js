import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { initializeFirestore, enableIndexedDbPersistence, CACHE_SIZE_UNLIMITED } from "firebase/firestore";
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

let businessAuth;
let businessDb;
let businessAnalytics;

try {
  // Initialize Firebase with a unique name to avoid conflicts
  const businessApp = initializeApp(businessFirebaseConfig, 'business');
  
  // Initialize Auth with error handling
  businessAuth = getAuth(businessApp);
  
  // Initialize Firestore with optimized configuration
  businessDb = initializeFirestore(businessApp, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
    experimentalForceLongPolling: true,
    useFetchStreams: false,
    ignoreUndefinedProperties: true
  });

  // Enable offline persistence with error handling
  enableIndexedDbPersistence(businessDb).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.');
    }
  });

  // Initialize analytics only in production and if supported
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    try {
      businessAnalytics = getAnalytics(businessApp);
    } catch (analyticsError) {
      console.warn('Analytics initialization failed:', analyticsError);
      businessAnalytics = null;
    }
  } else {
    businessAnalytics = null;
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

export { businessAuth, businessDb, businessAnalytics }; 