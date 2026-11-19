import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: 'M-1001',
    name: 'Nitya Sharma',
    email: 'nitya.sharma@pulsegms.com',
    role: 'General Manager'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function initAuth() {
      if (isSupabaseConfigured && supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            id: session.user.id,
            name: session.user.user_metadata?.full_name || 'Nitya Sharma',
            email: session.user.email,
            role: 'General Manager'
          });
        }
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session?.user) {
            setUser({
              id: session.user.id,
              name: session.user.user_metadata?.full_name || 'Nitya Sharma',
              email: session.user.email,
              role: 'General Manager'
            });
          }
        });
        return () => subscription.unsubscribe();
      }
    }

    initAuth();
  }, []);

  const signIn = async (email, password) => {
    if (isSupabaseConfigured && supabase) {
      return await supabase.auth.signInWithPassword({ email, password });
    }
    return { data: { user }, error: null };
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, isSupabaseConfigured }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
