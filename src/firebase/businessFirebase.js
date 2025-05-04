import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager
} from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

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
  const businessApp = initializeApp(businessFirebaseConfig, {
    name: 'business',
    automaticDataCollectionEnabled: false
  });

  businessAuth = getAuth(businessApp);

  businessDb = initializeFirestore(businessApp, {
    ignoreUndefinedProperties: true,
    experimentalAutoDetectLongPolling: true,
    useFetchStreams: false,
    localCache: persistentLocalCache({
      cacheSizeBytes: Infinity, // replaces CACHE_SIZE_UNLIMITED
      tabManager: persistentMultipleTabManager()
    })
  });

  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    isSupported().then((supported) => {
      if (supported) {
        try {
          businessAnalytics = getAnalytics(businessApp);
        } catch (error) {
          console.warn('Analytics initialization failed:', error);
          businessAnalytics = null;
        }
      } else {
        console.warn('Analytics not supported in this environment');
      }
    });
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error;
}

export { businessAuth, businessDb, businessAnalytics };
