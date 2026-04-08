import { Button, Input, Select } from 'antd';
import { PlusOutlined, SearchOutlined, InboxOutlined } from '@ant-design/icons';
import { PageContainer, BentoTable, StatusBadge, EmptyState } from '@/shared/design-system';

const STATUS_OPTIONS = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 'draft', label: 'Nháp' },
  { value: 'pending', label: 'Chờ duyệt' },
  { value: 'approved', label: 'Đã duyệt' },
  { value: 'rejected', label: 'Từ chối' },
];

const COLUMNS = [
  { title: 'Mã PR', dataIndex: 'code', key: 'code', width: 140 },
  { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
  { title: 'Phòng ban', dataIndex: 'department', key: 'department', width: 160 },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    width: 130,
    render: (status: 'draft' | 'pending' | 'approved' | 'rejected') => (
      <StatusBadge status={status} />
    ),
  },
  { title: 'Ngày tạo', dataIndex: 'createdOn', key: 'createdOn', width: 120 },
  { title: 'Tổng tiền', dataIndex: 'total', key: 'total', width: 140, align: 'right' as const },
];

const PurchaseRequisitionList = () => (
  <PageContainer
    title="Yêu cầu mua hàng"
    subtitle="Quản lý các yêu cầu mua sắm của phòng ban"
    actions={
      <Button type="primary" icon={<PlusOutlined />}>
        Tạo yêu cầu
      </Button>
    }
  >
    <BentoTable
      title="Danh sách PR"
      toolbar={
        <div style={{ display: 'flex', gap: 8 }}>
          <Input
            placeholder="Tìm kiếm..."
            prefix={<SearchOutlined />}
            style={{ width: 220 }}
            allowClear
          />
          <Select
            options={STATUS_OPTIONS}
            defaultValue=""
            style={{ width: 160 }}
          />
        </div>
      }
      columns={COLUMNS}
      dataSource={[]}
      locale={{
        emptyText: (
          <EmptyState
            icon={<InboxOutlined />}
            title="Chưa có yêu cầu mua hàng"
            description="Tạo yêu cầu mua hàng đầu tiên để bắt đầu."
            action={
              <Button type="primary" icon={<PlusOutlined />}>
                Tạo yêu cầu
              </Button>
            }
          />
        ),
      }}
      pagination={{ pageSize: 10, showSizeChanger: true }}
    />
  </PageContainer>
);

export default PurchaseRequisitionList;
