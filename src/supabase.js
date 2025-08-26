import { createClient } from '@supabase/supabase-js';


// Lấy giá trị từ biến môi trường Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Đảm bảo URL hợp lệ
if (!supabaseUrl || !supabaseUrl.startsWith('https://')) {
  throw new Error('Invalid Supabase URL.');
}

// Đảm bảo có Anon Key
if (!supabaseAnonKey) {
  throw new Error('Missing Supabase Anon Key.');
}

// Khởi tạo client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get session
export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    return { session: data?.session, error };
  } catch (error) {
    console.error('Error getting session:', error.message);
    return { session: null, error };
  }
};

// Helper function to get current user
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    return { user: data?.user, error };
  } catch (error) {
    console.error('Error getting user:', error.message);
    return { user: null, error };
  }
};

// Helper function for sign in
export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  } catch (error) {
    console.error('Error signing in:', error.message);
    return { data: null, error };
  }
};

// Helper function for sign up with full name
export const signUp = async (email, password, fullName) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || '',
        }
      }
    });
    return { data, error };
  } catch (error) {
    console.error('Error signing up:', error.message);
    return { data: null, error };
  }
};

// Helper function for sign out
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    console.error('Error signing out:', error.message);
    return { error };
  }
};

// Helper function for reset password
export const resetPassword = async (email) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { data, error };
  } catch (error) {
    console.error('Error resetting password:', error.message);
    return { data: null, error };
  }
};

// Helper function for updating password
export const updatePassword = async (password) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });
    return { data, error };
  } catch (error) {
    console.error('Error updating password:', error.message);
    return { data: null, error };
  }
};
