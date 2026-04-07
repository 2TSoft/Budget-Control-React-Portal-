import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { Spin } from 'antd';
import { useAuth } from '../../auth/useAuth';
import type { AppRole } from '../../types/auth';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: AppRole[];
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const { isLoading, hasRole } = useAuth();

  // Redirect đăng nhập nếu chưa authenticated
  // Chỉ cần openid scope — API calls dùng Power Pages session cookie
  useEffect(() => {
    if (!isAuthenticated && inProgress === InteractionStatus.None) {
      instance.loginRedirect({ scopes: ['openid', 'profile'] });
    }
  }, [isAuthenticated, inProgress, instance]);

  if (isLoading || inProgress !== InteractionStatus.None) {
    return <Spin size="large" fullscreen tip="Đang xác thực..." />;
  }

  if (!isAuthenticated) {
    return <Spin size="large" fullscreen tip="Đang chuyển hướng đăng nhập..." />;
  }

  if (roles && roles.length > 0 && !hasRole(roles)) {
    return <Navigate to="/access-denied" replace />;
  }

  return <>{children}</>;
}
