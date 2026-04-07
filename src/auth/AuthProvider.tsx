import { createContext, useMemo, type ReactNode } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import type { AppUser, AppRole } from '../types/auth';

export interface AuthContextValue {
  user: AppUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasRole: (role: AppRole | AppRole[]) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  // Derive user trực tiếp từ accounts — không cần useEffect + setState
  const user = useMemo<AppUser | null>(() => {
    if (!isAuthenticated || accounts.length === 0) return null;
    const account = accounts[0];
    const claims = account.idTokenClaims as Record<string, unknown> | undefined;
    const rawRoles = (claims?.roles as string[] | undefined) ?? [];
    return {
      id: account.localAccountId,
      name: account.name ?? '',
      email: account.username,
      roles: rawRoles as AppRole[],
    };
  }, [isAuthenticated, accounts]);

  const isLoading = inProgress !== 'none';

  const hasRole = (role: AppRole | AppRole[]): boolean => {
    if (!user) return false;
    const rolesToCheck = Array.isArray(role) ? role : [role];
    return rolesToCheck.some((r) => user.roles.includes(r));
  };

  const logout = () => {
    instance.logoutRedirect();
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, hasRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
