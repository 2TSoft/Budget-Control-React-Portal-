import { Layout, Menu, type MenuProps } from 'antd';
import {
  FileTextOutlined,
  BankOutlined,
  TeamOutlined,
  ApartmentOutlined,
  CheckSquareOutlined,
  AppstoreOutlined,
  ShopOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../auth/useAuth';

const { Sider } = Layout;

interface AppSidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

type MenuItem = Required<MenuProps>['items'][number];

export function AppSidebar({ collapsed, onCollapse }: AppSidebarProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { hasRole } = useAuth();

  const items: MenuItem[] = [
    {
      key: '/purchase-requisitions',
      icon: <FileTextOutlined />,
      label: 'Yêu Cầu Mua Hàng',
    },
    {
      key: '/budget',
      icon: <BankOutlined />,
      label: 'Ngân Sách',
    },
    {
      key: 'master',
      icon: <AppstoreOutlined />,
      label: 'Danh Mục',
      children: [
        {
          key: '/departments',
          icon: <ApartmentOutlined />,
          label: 'Phòng Ban',
        },
        {
          key: '/approval-matrix',
          icon: <CheckSquareOutlined />,
          label: 'Ma Trận Phê Duyệt',
        },
        {
          key: '/contacts',
          icon: <TeamOutlined />,
          label: 'Người Dùng',
        },
        {
          key: '/companies',
          icon: <BankOutlined />,
          label: 'Công Ty',
        },
        {
          key: '/service-categories',
          icon: <AppstoreOutlined />,
          label: 'Danh Mục Dịch Vụ',
        },
        {
          key: '/vendors',
          icon: <ShopOutlined />,
          label: 'Nhà Cung Cấp',
        },
      ],
    },
    ...(hasRole('admin')
      ? [
          {
            key: '/config',
            icon: <SettingOutlined />,
            label: 'Cấu Hình',
          } as MenuItem,
        ]
      : []),
  ];

  // Xác định selected key từ pathname
  const selectedKeys = [pathname];
  const openKeys = pathname.startsWith('/departments') ||
    pathname.startsWith('/approval-matrix') ||
    pathname.startsWith('/contacts') ||
    pathname.startsWith('/companies') ||
    pathname.startsWith('/service-categories') ||
    pathname.startsWith('/vendors')
    ? ['master']
    : [];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        background: '#0f172a',
        borderRight: '2px solid #1e293b',
        boxShadow: '4px 0 12px rgba(0,0,0,0.15)',
      }}
    >
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '0 12px',
          borderBottom: '1px solid #1e293b',
          background: '#1447e6',
        }}
      >
        <span
          style={{
            fontWeight: 800,
            fontSize: collapsed ? 11 : 15,
            letterSpacing: 0.5,
            color: '#ffffff',
            whiteSpace: 'nowrap',
          }}
        >
          {collapsed ? 'BCP' : 'Budget Control'}
        </span>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
        items={items}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
}
