import { useContext } from 'react';
import { AuthContext } from './AuthContext';

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // Return a default object with isAuthenticated: false if context is null
  // This prevents throwing errors when the context is not available
  if (context === null) {
    console.warn('useAuth hook was used outside of AuthProvider');
    return {
      user: null,
      session: null,
      loading: false,
      isAuthenticated: false
    };
  }
  
  return context;
};
