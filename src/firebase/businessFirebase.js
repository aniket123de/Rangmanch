import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  initializeFirestore, 
  enableIndexedDbPersistence, 
  CACHE_SIZE_UNLIMITED,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const businessFirebaseConfig = {
  apiKey: "AIzaSyASit8iitzXD8Ai9xx8dTCi5_r3e8WWbCg",
  authDomain: "rangmanchbuss.firebaseapp.com",
  projectId: "rangmanchbuss",
  storageBucket: "rangmanchbuss.appspot.com",
  messagingSenderId: "252364669468",
  appId: "1:252364669468:web:a92ab94dfba16ad0b395d9",
  measurementId: "G-43YSYY4HG3"
};

let businessAuth;
let businessDb;
let businessAnalytics;

try {
  // Initialize Firebase with a unique name and options
  const businessApp = initializeApp(businessFirebaseConfig, {
    name: 'business',
    automaticDataCollectionEnabled: false
  });
  
  // Initialize Auth
  businessAuth = getAuth(businessApp);
  
  // Initialize Firestore with optimized settings for web
  businessDb = initializeFirestore(businessApp, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
    experimentalAutoDetectLongPolling: true,
    useFetchStreams: false,
    ignoreUndefinedProperties: true,
    merge: true
  });

  // Enable persistence with retry logic
  const enablePersistence = async () => {
    try {
      await enableIndexedDbPersistence(businessDb);
    } catch (err) {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time
        console.warn('Multiple tabs open, persistence enabled in another tab');
      } else if (err.code === 'unimplemented') {
        // The current browser doesn't support persistence
        console.warn('Browser does not support persistence');
      } else {
        console.error('Persistence error:', err);
      }
    }
  };

  // Call persistence enablement
  enablePersistence().catch(console.error);

  // Initialize analytics only in production
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    try {
      businessAnalytics = getAnalytics(businessApp);
    } catch (error) {
      console.warn('Analytics initialization failed:', error);
      businessAnalytics = null;
    }
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error;
}

export { businessAuth, businessDb, businessAnalytics }; 