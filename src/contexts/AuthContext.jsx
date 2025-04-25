import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const value = {
    userLoggedIn,
    setUserLoggedIn,
    currentUser,
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 