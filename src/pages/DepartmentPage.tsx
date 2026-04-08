import { Button, Input } from 'antd';
import { PlusOutlined, SearchOutlined, TeamOutlined } from '@ant-design/icons';
import { PageContainer, BentoTable, EmptyState } from '@/shared/design-system';

const COLUMNS = [
  { title: 'Mã phòng ban', dataIndex: 'code', key: 'code', width: 140 },
  { title: 'Tên phòng ban', dataIndex: 'name', key: 'name' },
  { title: 'Trưởng phòng', dataIndex: 'manager', key: 'manager', width: 180 },
  { title: 'Số nhân viên', dataIndex: 'headcount', key: 'headcount', width: 120, align: 'right' as const },
  { title: 'Ngân sách', dataIndex: 'budget', key: 'budget', width: 160, align: 'right' as const },
];

const DepartmentPage = () => (
  <PageContainer
    title="Phòng ban"
    subtitle="Quản lý danh sách phòng ban trong tổ chức"
    actions={
      <Button type="primary" icon={<PlusOutlined />}>
        Thêm phòng ban
      </Button>
    }
  >
    <BentoTable
      title="Danh sách phòng ban"
      toolbar={
        <Input
          placeholder="Tìm kiếm phòng ban..."
          prefix={<SearchOutlined />}
          style={{ width: 240 }}
          allowClear
        />
      }
      columns={COLUMNS}
      dataSource={[]}
      locale={{
        emptyText: (
          <EmptyState
            icon={<TeamOutlined />}
            title="Chưa có phòng ban"
            description="Thêm phòng ban đầu tiên để bắt đầu quản lý."
            action={
              <Button type="primary" icon={<PlusOutlined />}>
                Thêm phòng ban
              </Button>
            }
          />
        ),
      }}
      pagination={{ pageSize: 10, showSizeChanger: true }}
    />
  </PageContainer>
);

export default DepartmentPage;
