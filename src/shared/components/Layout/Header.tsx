import { Layout, Button, Avatar, Dropdown, Space, Typography, type MenuProps } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../../../auth/AuthProvider';

const { Header } = Layout;

interface AppHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppHeader({ collapsed, onToggle }: AppHeaderProps) {
  const { user, logout } = useAuth();

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'name',
      label: <Typography.Text strong>{user?.name}</Typography.Text>,
      disabled: true,
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: logout,
    },
  ];

  return (
    <Header
      style={{
        padding: '0 16px',
        background: '#ffffff',
        borderBottom: '2px solid #cbd5e1',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={onToggle}
        style={{ fontSize: 16, width: 64, height: 64, color: '#0f172a' }}
        aria-label={collapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
      />
      <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
        <Space style={{ cursor: 'pointer' }}>
          <Avatar icon={<UserOutlined />} />
          <Typography.Text style={{ color: '#374151' }}>{user?.email}</Typography.Text>
        </Space>
      </Dropdown>
    </Header>
  );
}
