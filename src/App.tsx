import { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import {
  HomeOutlined,
  FileTextOutlined,
  DollarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { AppShell } from '@/shared/design-system';
import type { SidebarNavItem } from '@/shared/design-system';

import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import PurchaseRequisitionList from './pages/PurchaseRequisitionList';
import BudgetPage from './pages/BudgetPage';
import DepartmentPage from './pages/DepartmentPage';

const NAV_ITEMS: SidebarNavItem[] = [
  { key: 'home', label: 'Tổng quan', icon: <HomeOutlined />, path: '/', group: '' },
  { key: 'pr', label: 'Yêu cầu mua hàng', icon: <FileTextOutlined />, path: '/purchase-requisitions', group: 'Quản lý' },
  { key: 'budget', label: 'Ngân sách', icon: <DollarOutlined />, path: '/budget', group: 'Quản lý' },
  { key: 'dept', label: 'Phòng ban', icon: <TeamOutlined />, path: '/department', group: 'Dữ liệu chủ' },
];

function AuthenticatedApp() {
  return (
    <AppShell navItems={NAV_ITEMS}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/purchase-requisitions" element={<PurchaseRequisitionList />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/department" element={<DepartmentPage />} />
      </Routes>
    </AppShell>
  );
}

function checkAuthSync(): boolean {
  const user = window.Microsoft?.Dynamic365?.Portal?.User;
  if (!user) return false;
  return !!(user.userName || user.contactid || user.email);
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => checkAuthSync());

  useEffect(() => {
    if (isAuthenticated) return;

    // Cách 1: poll User object (có thể inject trễ)
    let cancelled = false;
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (checkAuthSync()) {
        setIsAuthenticated(true);
        clearInterval(interval);
      } else if (attempts >= 10) {
        clearInterval(interval);
      }
    }, 100);

    // Cách 2: gọi /_api/ để kiểm tra session cookie — đáng tin cậy nhất
    fetch('/_api/', { method: 'HEAD', credentials: 'same-origin' })
      .then((res) => {
        if (!cancelled && (res.ok || res.status === 404 || res.status === 403)) {
          // 200/404/403 = session hợp lệ (server nhận diện user)
          // 401 = chưa đăng nhập
          setIsAuthenticated(true);
          clearInterval(interval);
        }
      })
      .catch(() => { });

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  return (
    <Router>
      {isAuthenticated ? <AuthenticatedApp /> : <LoginPage />}
    </Router>
  );
}

export default App;
