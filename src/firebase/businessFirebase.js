import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const businessFirebaseConfig = {
  apiKey: "AIzaSyASit8iitzXD8Ai9xx8dTCi5_r3e8WWbCg",
  authDomain: "rangmanchbuss.firebaseapp.com",
  projectId: "rangmanchbuss",
  storageBucket: "rangmanchbuss.firebasestorage.app",
  messagingSenderId: "252364669468",
  appId: "1:252364669468:web:a92ab94dfba16ad0b395d9",
  measurementId: "G-43YSYY4HG3"
};

// Initialize Firebase
const businessApp = initializeApp(businessFirebaseConfig, 'business');
const businessAuth = getAuth(businessApp);
const businessDb = getFirestore(businessApp);

export { businessAuth, businessDb }; 