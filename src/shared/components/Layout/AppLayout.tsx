import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { AppHeader } from './Header';
import { AppSidebar } from './Sidebar';

const { Content } = Layout;

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
      <Layout>
        <AppHeader collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} />
        <Content style={{ margin: '24px 16px', padding: 24, background: '#f8fafc', borderRadius: 10 }}>
          <Suspense fallback={<Spin size="large" style={{ display: 'block', textAlign: 'center', marginTop: 48 }} />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}
