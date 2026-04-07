import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import type { AppUser, AppRole } from '../types/auth';
import { dataverseLoginRequest } from './msal-config';
import { setTokenProvider } from '../api/dataverse-client';

interface AuthContextValue {
  user: AppUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasRole: (role: AppRole | AppRole[]) => boolean;
  getAccessToken: () => Promise<string>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && accounts.length > 0) {
      const account = accounts[0];
      // Roles được lưu trong idTokenClaims
      const claims = account.idTokenClaims as Record<string, unknown> | undefined;
      const rawRoles = (claims?.roles as string[] | undefined) ?? [];

      setUser({
        id: account.localAccountId,
        name: account.name ?? '',
        email: account.username,
        roles: rawRoles as AppRole[],
      });
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, [isAuthenticated, accounts]);

  const hasRole = (role: AppRole | AppRole[]): boolean => {
    if (!user) return false;
    const rolesToCheck = Array.isArray(role) ? role : [role];
    return rolesToCheck.some((r) => user.roles.includes(r));
  };

  const getAccessToken = useCallback(async (): Promise<string> => {
    const account = accounts[0];
    if (!account) throw new Error('Chưa đăng nhập');

    const response = await instance.acquireTokenSilent({
      ...dataverseLoginRequest,
      account,
    });
    return response.accessToken;
  }, [accounts, instance]);

  // Wire token provider vào dataverse-client để tất cả API calls tự động có Bearer token
  useEffect(() => {
    setTokenProvider(getAccessToken);
  }, [getAccessToken]);

  const logout = () => {
    instance.logoutRedirect();
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, hasRole, getAccessToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth phải được dùng trong AuthProvider');
  return ctx;
}
