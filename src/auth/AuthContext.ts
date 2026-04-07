import { createContext } from 'react';
import type { AppRole } from '../types/auth';
import type { AppUser } from '../types/auth';

export interface AuthContextValue {
  user: AppUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasRole: (role: AppRole | AppRole[]) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
