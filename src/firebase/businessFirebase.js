import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableMultiTabIndexedDbPersistence } from "firebase/firestore";

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
const businessDb = getFirestore(businessApp);

// Enable multi-tab persistence for business app
try {
  enableMultiTabIndexedDbPersistence(businessDb)
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time.
        console.warn('Business Firebase persistence failed - multiple tabs open');
      } else if (err.code === 'unimplemented') {
        // The current browser does not support persistence
        console.warn('Business Firebase persistence not supported in this browser');
      }
    });
} catch (err) {
  console.warn('Error enabling business Firebase persistence:', err);
}

export { businessAuth, businessDb }; 