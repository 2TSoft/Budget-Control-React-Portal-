import { useState, useEffect, type ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { ConfigProvider, App as AntApp, Spin } from 'antd';
import viVN from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { AuthProvider } from '../auth/AuthProvider';
import { msalConfig } from '../auth/msal-config';
import { router } from './router';

dayjs.locale('vi');

const msalInstance = new PublicClientApplication(msalConfig);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function Providers({ children }: { children: ReactNode }) {
  return (
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          locale={viVN}
          theme={{
            token: {
              colorPrimary: '#1447e6',
              colorBgContainer: '#ffffff',
              colorBgLayout: '#f8fafc',
              colorBgElevated: '#ffffff',
              colorBorder: '#cbd5e1',
              colorText: '#0f172a',
              colorTextSecondary: '#374151',
              colorError: '#b91c1c',
              colorSuccess: '#15803d',
              colorWarning: '#a16207',
              borderRadius: 8,
              fontFamily: "system-ui, 'Inter', 'Segoe UI', Roboto, sans-serif",
              fontSize: 14,
              lineHeight: 1.6,
              controlHeight: 44,
            },
          }}
        >
          <AntApp>
            <AuthProvider>{children}</AuthProvider>
          </AntApp>
        </ConfigProvider>
      </QueryClientProvider>
    </MsalProvider>
  );
}

export function AppProviders() {
  const [msalReady, setMsalReady] = useState(false);

  // MSAL v3 yêu cầu gọi initialize() trước khi sử dụng
  // MsalProvider tự động gọi handleRedirectPromise() để xử lý OAuth callback
  useEffect(() => {
    msalInstance.initialize().then(() => setMsalReady(true));
  }, []);

  if (!msalReady) {
    return <Spin size="large" fullscreen tip="Đang khởi động..." />;
  }

  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}
