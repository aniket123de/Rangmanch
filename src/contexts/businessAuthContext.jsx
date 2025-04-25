import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, enableNetwork, disableNetwork, connectFirestoreEmulator } from 'firebase/firestore';
import { businessAuth, businessDb } from '../firebase/businessFirebase';

const BusinessAuthContext = createContext();

export function useBusinessAuth() {
  return useContext(BusinessAuthContext);
}

export function BusinessAuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [businessData, setBusinessData] = useState(null);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const [connectionError, setConnectionError] = useState(null);

  // Handle online/offline status and connection management
  useEffect(() => {
    let retryTimeout;
    let retryCount = 0;
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000; // 2 seconds

    const handleOnline = async () => {
      setIsOnline(true);
      setConnectionError(null);
      try {
        await enableNetwork(businessDb);
        retryCount = 0; // Reset retry count on successful connection
      } catch (error) {
        console.error('Error enabling network:', error);
        handleConnectionError(error);
      }
    };

    const handleOffline = async () => {
      setIsOnline(false);
      try {
        await disableNetwork(businessDb);
      } catch (error) {
        console.error('Error disabling network:', error);
      }
    };

    const handleConnectionError = (error) => {
      setConnectionError(error);
      if (retryCount < MAX_RETRIES) {
        retryCount++;
        retryTimeout = setTimeout(async () => {
          try {
            await enableNetwork(businessDb);
            setConnectionError(null);
            retryCount = 0;
          } catch (error) {
            handleConnectionError(error);
          }
        }, RETRY_DELAY * retryCount);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial connection attempt
    if (window.navigator.onLine) {
      handleOnline();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
    };
  }, []);

  async function signup(email, password, businessInfo) {
    try {
      const userCredential = await createUserWithEmailAndPassword(businessAuth, email, password);
      
      if (businessInfo && isOnline) {
        await setDoc(doc(businessDb, 'businesses', userCredential.user.uid), {
          ...businessInfo,
          email,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }

      return userCredential;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(businessAuth, email, password);
      if (isOnline) {
        try {
          const businessDoc = await getDoc(doc(businessDb, 'businesses', userCredential.user.uid));
          if (businessDoc.exists()) {
            setBusinessData(businessDoc.data());
          }
        } catch (error) {
          console.error('Error fetching business data:', error);
        }
      }
      return userCredential;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  function logout() {
    setBusinessData(null);
    return signOut(businessAuth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(businessAuth, email);
  }

  async function updateBusinessInfo(businessInfo) {
    if (!currentUser) throw new Error('No business user logged in');
    if (!isOnline) throw new Error('Cannot update business info while offline');
    
    try {
      await setDoc(doc(businessDb, 'businesses', currentUser.uid), {
        ...businessInfo,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      setBusinessData(prev => ({
        ...prev,
        ...businessInfo,
        updatedAt: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Update business info error:', error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(businessAuth, async (user) => {
      setCurrentUser(user);
      
      if (user && isOnline) {
        try {
          const businessDoc = await getDoc(doc(businessDb, 'businesses', user.uid));
          if (businessDoc.exists()) {
            setBusinessData(businessDoc.data());
          }
        } catch (error) {
          console.error('Error fetching business data:', error);
        }
      } else {
        setBusinessData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, [isOnline]);

  const value = {
    currentUser,
    businessData,
    isOnline,
    connectionError,
    signup,
    login,
    logout,
    resetPassword,
    updateBusinessInfo
  };

  return (
    <BusinessAuthContext.Provider value={value}>
      {!loading && children}
    </BusinessAuthContext.Provider>
  );
} 