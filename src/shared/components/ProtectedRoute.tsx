import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { Spin } from 'antd';
import { useAuth } from '../../auth/AuthProvider';
import type { AppRole } from '../../types/auth';
import type { ReactNode } from 'react';
import { dataverseLoginRequest } from '../../auth/msal-config';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: AppRole[];
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const { isLoading, hasRole } = useAuth();

  // Chỉ redirect khi chắc chắn chưa đăng nhập và MSAL không đang xử lý gì
  useEffect(() => {
    if (!isAuthenticated && inProgress === InteractionStatus.None) {
      instance.loginRedirect(dataverseLoginRequest);
    }
  }, [isAuthenticated, inProgress, instance]);

  // Đang xử lý redirect callback hoặc auth state đang load
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
