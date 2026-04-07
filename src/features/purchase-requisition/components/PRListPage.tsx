import { useState } from 'react';
import { Table, Button, Input, Space, Tag, Typography, Tooltip, App } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { TableColumnsType, TablePaginationConfig } from 'antd';
import { useNavigate } from 'react-router-dom';
import { usePRHeaders, useDeletePR } from '../hooks/usePurchaseRequisition';
import { PRStatus, type PRHeader } from '../types';
import { DEFAULT_PAGE_SIZE } from '../../../shared/utils/constants';

const { Title } = Typography;

const STATUS_COLOR: Record<number, string> = {
  [PRStatus.Draft]: 'default',
  [PRStatus.Submitted]: 'processing',
  [PRStatus.InProgress]: 'blue',
  [PRStatus.Approved]: 'success',
  [PRStatus.Rejected]: 'error',
  [PRStatus.Cancelled]: 'warning',
  [PRStatus.Closed]: 'default',
};

const STATUS_LABEL: Record<number, string> = {
  [PRStatus.Draft]: 'Nháp',
  [PRStatus.Submitted]: 'Đã gửi',
  [PRStatus.InProgress]: 'Đang xử lý',
  [PRStatus.Approved]: 'Đã duyệt',
  [PRStatus.Rejected]: 'Từ chối',
  [PRStatus.Cancelled]: 'Đã hủy',
  [PRStatus.Closed]: 'Đã đóng',
};

export default function PRListPage() {
  const navigate = useNavigate();
  const { modal } = App.useApp();
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);

  const filter = searchText ? `contains(balas_name,'${searchText}')` : undefined;

  const { data, isLoading, isFetching } = usePRHeaders({
    $filter: filter,
    $skip: (page - 1) * DEFAULT_PAGE_SIZE,
    $top: DEFAULT_PAGE_SIZE,
  });

  const deletePR = useDeletePR();

  const handleDelete = (record: PRHeader) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc muốn xóa "${record.balas_name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => deletePR.mutateAsync(record.balas_purchaserequisitionheaderid),
    });
  };

  const columns: TableColumnsType<PRHeader> = [
    {
      title: 'Số PR',
      dataIndex: 'balas_name',
      key: 'balas_name',
      render: (name: string, record) => (
        <Button
          type="link"
          style={{ padding: 0 }}
          onClick={() => navigate(`/purchase-requisitions/${record.balas_purchaserequisitionheaderid}`)}
        >
          {name}
        </Button>
      ),
    },
    {
      title: 'Phòng Ban',
      dataIndex: '_balas_departmentid_value_Formatted',
      key: 'department',
    },
    {
      title: 'Ngày Yêu Cầu',
      dataIndex: 'balas_requestdate',
      key: 'balas_requestdate',
      render: (v: string) => v ? new Date(v).toLocaleDateString('vi-VN') : '—',
    },
    {
      title: 'Ngày Cần',
      dataIndex: 'balas_requireddate',
      key: 'balas_requireddate',
      render: (v: string) => v ? new Date(v).toLocaleDateString('vi-VN') : '—',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'statuscode',
      key: 'statuscode',
      render: (status: PRStatus) => (
        <Tag color={STATUS_COLOR[status] ?? 'default'}>
          {STATUS_LABEL[status] ?? status}
        </Tag>
      ),
    },
    {
      title: 'Ngày Tạo',
      dataIndex: 'createdon',
      key: 'createdon',
      render: (v: string) => v ? new Date(v).toLocaleDateString('vi-VN') : '—',
    },
    {
      title: '',
      key: 'actions',
      width: 120,
      render: (_: unknown, record: PRHeader) => (
        <Space>
          <Tooltip title="Xem">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/purchase-requisitions/${record.balas_purchaserequisitionheaderid}`)}
            />
          </Tooltip>
          <Tooltip title="Sửa">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => navigate(`/purchase-requisitions/${record.balas_purchaserequisitionheaderid}/edit`)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const pagination: TablePaginationConfig = {
    current: page,
    pageSize: DEFAULT_PAGE_SIZE,
    total: data?.['@odata.count'] ?? 0,
    onChange: (p) => setPage(p),
    showSizeChanger: false,
    showTotal: (total) => `Tổng ${total} bản ghi`,
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>Danh Sách Yêu Cầu Mua Hàng</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/purchase-requisitions/new')}>
          Tạo Mới
        </Button>
      </div>

      <Input
        prefix={<SearchOutlined />}
        placeholder="Tìm theo số PR..."
        value={searchText}
        onChange={(e) => { setSearchText(e.target.value); setPage(1); }}
        allowClear
        style={{ maxWidth: 300, marginBottom: 16 }}
      />

      <Table<PRHeader>
        rowKey="balas_purchaserequisitionheaderid"
        columns={columns}
        dataSource={data?.value ?? []}
        pagination={pagination}
        loading={isLoading || isFetching}
        size="small"
      />
    </div>
  );
}
