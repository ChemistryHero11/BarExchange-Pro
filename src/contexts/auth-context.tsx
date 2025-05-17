'use client';
import type { AppUser } from '@/types';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// For real auth:
// import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
// import { auth } from '@/lib/firebase'; 
// import { getUserData } from '@/lib/authService'; // Assuming a service to get user data including role

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  setUser: (user: AppUser | null) => void; // For mock login/logout
  // login: (email, password) => Promise<void>;
  // logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock setUser function for now to allow UI building
  const setUser = (appUser: AppUser | null) => {
    setUserState(appUser);
    setLoading(false); // Assume loading finishes when user is set
  };

  useEffect(() => {
    // Simulate initial auth check loading
    const timer = setTimeout(() => {
      setLoading(false); // Default to no user after loading
    }, 500); 

    // Real Firebase Auth subscription would go here
    // const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
    //   if (firebaseUser) {
    //     const userData = await getUserData(firebaseUser.uid); // Fetch AppUser with role
    //     setUserState(userData);
    //   } else {
    //     setUserState(null);
    //   }
    //   setLoading(false);
    // });

    return () => {
      clearTimeout(timer);
      // unsubscribe?.(); // Clean up Firebase listener
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
