import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAwNKLxSmWr7_FTRUqQl4p9BsZui6b3KWo",
  authDomain: "rangmanch-95e7d.firebaseapp.com",
  projectId: "rangmanch-95e7d",
  storageBucket: "rangmanch-95e7d.firebasestorage.app",
  messagingSenderId: "731196661363",
  appId: "1:731196661363:web:70117daa2f3e7cd1321406",
  measurementId: "G-J9SVWC6BCQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export default app; 