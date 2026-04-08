import {
  FileTextOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  TeamOutlined,
  PlusOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  PageContainer,
  BentoGrid,
  BentoCard,
  BentoStat,
} from '@/shared/design-system';

const Home = () => {
  const navigate = useNavigate();
  const portalUser = window.Microsoft?.Dynamic365?.Portal?.User;
  const firstName = portalUser?.firstName ?? 'User';

  return (
    <PageContainer
      title={`Xin chào, ${firstName}`}
      subtitle="Tổng quan hoạt động mua sắm & ngân sách"
    >
      {/* Stat Cards */}
      <BentoGrid columns={4} gap="md">
        <BentoStat
          icon={<FileTextOutlined />}
          label="Tổng yêu cầu mua hàng"
          value={24}
          trend={{ value: 12, label: 'tháng này' }}
        />
        <BentoStat
          icon={<ClockCircleOutlined />}
          label="Chờ phê duyệt"
          value={5}
          color="#FF9F0A"
        />
        <BentoStat
          icon={<DollarOutlined />}
          label="Ngân sách đã sử dụng"
          value={68}
          suffix="%"
          trend={{ value: -3, label: 'vs tháng trước' }}
          color="#34C759"
        />
        <BentoStat
          icon={<TeamOutlined />}
          label="Phòng ban"
          value={8}
        />
      </BentoGrid>

      {/* Quick Actions + Recent */}
      <BentoGrid columns={3} gap="md">
        <BentoCard span={2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 'var(--bento-text-lg)', fontWeight: 600 }}>
                Yêu cầu mua hàng gần đây
              </h3>
              <Button
                type="link"
                onClick={() => navigate('/purchase-requisitions')}
                style={{ padding: 0 }}
              >
                Xem tất cả <RightOutlined />
              </Button>
            </div>
            <div style={{ color: 'var(--bento-text-secondary)', fontSize: 'var(--bento-text-sm)' }}>
              Chưa có dữ liệu — tích hợp API trong Phase tiếp theo.
            </div>
          </div>
        </BentoCard>

        <BentoCard variant="accent">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ margin: 0, fontSize: 'var(--bento-text-lg)', fontWeight: 600 }}>
              Thao tác nhanh
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                block
                onClick={() => navigate('/purchase-requisitions')}
              >
                Tạo yêu cầu mới
              </Button>
              <Button
                block
                icon={<DollarOutlined />}
                onClick={() => navigate('/budget')}
              >
                Xem ngân sách
              </Button>
              <Button
                block
                icon={<TeamOutlined />}
                onClick={() => navigate('/department')}
              >
                Quản lý phòng ban
              </Button>
            </div>
          </div>
        </BentoCard>
      </BentoGrid>
    </PageContainer>
  );
};

export default Home;
