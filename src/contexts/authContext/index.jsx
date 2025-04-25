import { auth } from "../../firebase/firebase";
import React, { useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return () => unsubscribe();
    }, []);

    async function initializeUser(user) {
        if (user) {
            setCurrentUser(user);
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading,
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
