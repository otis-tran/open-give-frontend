import useAuth, { UseAuthReturn } from '@/hooks/useAuth';
import React, { createContext, useContext, ReactNode } from 'react';

const AuthContext = createContext<UseAuthReturn | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): UseAuthReturn => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
