import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

// Create context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for active session
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.warn('Error getting session:', error.message);
          setLoading(false);
          return;
        }
        
        if (data.session) {
          setSession(data.session);
          
          // Lấy thông tin user từ session
          if (data.session.user) {
            setUser(data.session.user);
          } else {
            try {
              const { data: userData, error: userError } = await supabase.auth.getUser();
              if (userError) {
                console.warn('Error getting user:', userError.message);
              } else if (userData?.user) {
                setUser(userData.user);
              }
            } catch (userError) {
              console.warn('Error getting user:', userError.message);
            }
          }
        }
      } catch (error) {
        console.error('Error checking session:', error.message);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    let authListener;
    try {
      authListener = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('Auth state changed:', event);
          setSession(session);
          
          if (session?.user) {
            setUser(session.user);
          } else {
            setUser(null);
          }
          
          setLoading(false);
        }
      );
    } catch (error) {
      console.error('Error setting up auth listener:', error.message);
      setLoading(false);
    }

    // Cleanup
    return () => {
      if (authListener && authListener.data && authListener.data.subscription) {
        try {
          authListener.data.subscription.unsubscribe();
        } catch (error) {
          console.warn('Error unsubscribing:', error.message);
        }
      }
    };
  }, []);

  // Auth value
  const value = {
    session,
    user,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
