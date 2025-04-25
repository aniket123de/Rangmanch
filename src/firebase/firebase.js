import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKT2EyuMtocu1DCtYmDrr7NqYVNwAaSPs",
  authDomain: "rangmanch-4189e.firebaseapp.com",
  projectId: "rangmanch-4189e",
  storageBucket: "rangmanch-4189e.appspot.com", // ✅ fixed
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
  app = initializeApp(firebaseConfig);

  // Auth
  auth = getAuth(app);

  // Firestore with 50MB cache and single-tab setup
  db = initializeFirestore(app, {
    ignoreUndefinedProperties: true,
    useFetchStreams: false,
    experimentalAutoDetectLongPolling: true,
    localCache: persistentLocalCache({
      cacheSizeBytes: 50 * 1024 * 1024, // 50MB
      tabManager: persistentSingleTabManager() // Single-tab mode
    })
  });

  // Analytics only in production & if supported
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      } else {
        console.warn('Analytics not supported in this environment');
      }
    });
  }

  // Google Auth Provider
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });

} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

export { auth, app, analytics, db, googleProvider };
