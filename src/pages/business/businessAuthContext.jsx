import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Adjust the path

const BusinessAuthContext = createContext();

export const BusinessAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (session) {
          setCurrentUser({ id: session.user.id, email: session.user.email });
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Error getting Supabase session:', error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setCurrentUser({ id: session.user.id, email: session.user.email });
      } else {
        setCurrentUser(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Supabase login error:', error);
      throw error;
    }
  };

  // Only create the user and send verification email
  const signup = async (email, password) => {
    try {
      const { data: { user }, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'https://rangmanch-test.vercel.app/business/loginhere',
        }
      });
      if (signupError) throw signupError;
      if (!user) {
        throw new Error('User creation failed. No user returned.');
      }
      return user;
    } catch (error) {
      console.error('Supabase signup error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Supabase logout error:', error);
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/business/reset-password`
      });
      if (error) throw error;
    } catch (error) {
      console.error('Supabase reset password error:', error);
      throw error;
    }
  };

  return (
    <BusinessAuthContext.Provider value={{ currentUser, login, signup, logout, resetPassword, loading }}>
      {children}
    </BusinessAuthContext.Provider>
  );
};

export const useBusinessAuth = () => useContext(BusinessAuthContext);
