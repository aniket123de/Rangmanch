import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, enableNetwork, disableNetwork } from 'firebase/firestore';
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

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      enableNetwork(businessDb).catch(console.error);
    };

    const handleOffline = () => {
      setIsOnline(false);
      disableNetwork(businessDb).catch(console.error);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  async function signup(email, password, businessInfo) {
    try {
      // Create the user account
      const userCredential = await createUserWithEmailAndPassword(businessAuth, email, password);
      
      // Store additional business information in Firestore
      if (businessInfo) {
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
      // Fetch business data after successful login
      if (isOnline) {
        const businessDoc = await getDoc(doc(businessDb, 'businesses', userCredential.user.uid));
        if (businessDoc.exists()) {
          setBusinessData(businessDoc.data());
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
        // Fetch business data when user is logged in and online
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