import { useState } from 'react';
import { Table, Button, Space, Typography, InputNumber, Input, App, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import {
  usePRLines,
  useCreatePRLine,
  useUpdatePRLine,
  useDeletePRLine,
} from '../hooks/usePurchaseRequisition';
import type { PRLine } from '../types';
import { DATAVERSE_ENTITIES } from '../../../shared/utils/constants';

const { Title } = Typography;

interface PRLineTableProps {
  headerId: string;
  canEdit: boolean;
}

interface EditingLine {
  id?: string;
  balas_name: string;
  balas_description?: string;
  balas_quantity?: number;
  balas_unitprice?: number;
  balas_uom?: string;
}

const emptyLine = (): EditingLine => ({
  balas_name: '',
  balas_description: '',
  balas_quantity: 1,
  balas_unitprice: 0,
  balas_uom: '',
});

export default function PRLineTable({ headerId, canEdit }: PRLineTableProps) {
  const { data, isLoading } = usePRLines(headerId);
  const createLine = useCreatePRLine();
  const updateLine = useUpdatePRLine();
  const deleteLine = useDeletePRLine();
  const { modal, message } = App.useApp();

  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<EditingLine>(emptyLine());
  const [isAdding, setIsAdding] = useState(false);

  const lines = data?.value ?? [];

  const startAdd = () => {
    setIsAdding(true);
    setEditingKey('__new__');
    setEditingData(emptyLine());
  };

  const startEdit = (line: PRLine) => {
    setEditingKey(line.balas_purchaserequisitionlineid);
    setEditingData({
      id: line.balas_purchaserequisitionlineid,
      balas_name: line.balas_name,
      balas_description: line.balas_description,
      balas_quantity: line.balas_quantity,
      balas_unitprice: line.balas_unitprice,
      balas_uom: line.balas_uom,
    });
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setIsAdding(false);
    setEditingData(emptyLine());
  };

  const save = async () => {
    if (!editingData.balas_name.trim()) {
      message.warning('Tên dòng là bắt buộc');
      return;
    }
    try {
      if (editingKey === '__new__') {
        await createLine.mutateAsync({
          balas_name: editingData.balas_name,
          balas_description: editingData.balas_description,
          balas_quantity: editingData.balas_quantity,
          balas_unitprice: editingData.balas_unitprice,
          balas_uom: editingData.balas_uom,
          'balas_purchaserequisitionheaderid@odata.bind': `/${DATAVERSE_ENTITIES.prHeader}(${headerId})`,
        });
        message.success('Thêm dòng thành công');
      } else if (editingKey) {
        await updateLine.mutateAsync({
          id: editingKey,
          headerId,
          data: {
            balas_name: editingData.balas_name,
            balas_description: editingData.balas_description,
            balas_quantity: editingData.balas_quantity,
            balas_unitprice: editingData.balas_unitprice,
            balas_uom: editingData.balas_uom,
          },
        });
        message.success('Cập nhật dòng thành công');
      }
      cancelEdit();
    } catch {
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const handleDelete = (line: PRLine) => {
    modal.confirm({
      title: 'Xóa dòng?',
      content: `Xóa "${line.balas_name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => deleteLine.mutateAsync({ id: line.balas_purchaserequisitionlineid, headerId }),
    });
  };

  const isEditing = (id: string) => editingKey === id;

  const renderEditableCell = (
    value: React.ReactNode,
    field: keyof EditingLine,
    lineId: string,
    type: 'text' | 'number' = 'text',
  ) => {
    if (!isEditing(lineId)) return value ?? '—';
    if (type === 'number') {
      return (
        <InputNumber
          size="small"
          value={editingData[field] as number | undefined}
          min={0}
          onChange={(v) => setEditingData((d) => ({ ...d, [field]: v ?? 0 }))}
          style={{ width: 100 }}
        />
      );
    }
    return (
      <Input
        size="small"
        value={editingData[field] as string | undefined}
        onChange={(e) => setEditingData((d) => ({ ...d, [field]: e.target.value }))}
      />
    );
  };

  const allRows: (PRLine & { _isNew?: boolean })[] = [
    ...lines,
    ...(isAdding
      ? [
          {
            balas_purchaserequisitionlineid: '__new__',
            balas_name: '',
            _isNew: true,
          } as PRLine & { _isNew?: boolean },
        ]
      : []),
  ];

  const columns: TableColumnsType<PRLine & { _isNew?: boolean }> = [
    {
      title: '#',
      dataIndex: 'balas_linenumber',
      key: 'no',
      width: 50,
      render: (_v, _r, idx) => idx + 1,
    },
    {
      title: 'Tên / Mô tả',
      dataIndex: 'balas_name',
      key: 'balas_name',
      render: (v, r) => renderEditableCell(v, 'balas_name', r.balas_purchaserequisitionlineid),
    },
    {
      title: 'Diễn giải',
      dataIndex: 'balas_description',
      key: 'balas_description',
      render: (v, r) =>
        renderEditableCell(v, 'balas_description', r.balas_purchaserequisitionlineid),
    },
    {
      title: 'SL',
      dataIndex: 'balas_quantity',
      key: 'balas_quantity',
      width: 80,
      render: (v, r) =>
        renderEditableCell(v, 'balas_quantity', r.balas_purchaserequisitionlineid, 'number'),
    },
    {
      title: 'ĐVT',
      dataIndex: 'balas_uom',
      key: 'balas_uom',
      width: 80,
      render: (v, r) => renderEditableCell(v, 'balas_uom', r.balas_purchaserequisitionlineid),
    },
    {
      title: 'Đơn Giá',
      dataIndex: 'balas_unitprice',
      key: 'balas_unitprice',
      width: 120,
      render: (v, r) =>
        renderEditableCell(v, 'balas_unitprice', r.balas_purchaserequisitionlineid, 'number'),
    },
    {
      title: 'Thành Tiền',
      key: 'total',
      width: 120,
      render: (_v, r) => {
        if (isEditing(r.balas_purchaserequisitionlineid)) {
          const total = (editingData.balas_quantity ?? 0) * (editingData.balas_unitprice ?? 0);
          return total.toLocaleString('vi-VN');
        }
        return ((r.balas_quantity ?? 0) * (r.balas_unitprice ?? 0)).toLocaleString('vi-VN');
      },
    },
    ...(canEdit
      ? [
          {
            title: '',
            key: 'actions',
            width: 100,
            render: (_: unknown, r: PRLine & { _isNew?: boolean }) => {
              if (isEditing(r.balas_purchaserequisitionlineid)) {
                return (
                  <Space>
                    <Tooltip title="Lưu">
                      <Button
                        type="text"
                        icon={<SaveOutlined />}
                        loading={createLine.isPending || updateLine.isPending}
                        onClick={save}
                      />
                    </Tooltip>
                    <Button size="small" type="text" onClick={cancelEdit}>
                      Hủy
                    </Button>
                  </Space>
                );
              }
              return (
                <Space>
                  <Button size="small" type="text" onClick={() => startEdit(r)}>
                    Sửa
                  </Button>
                  <Tooltip title="Xóa">
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(r)}
                    />
                  </Tooltip>
                </Space>
              );
            },
          },
        ]
      : []),
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <Title level={5} style={{ margin: 0 }}>Dòng Yêu Cầu</Title>
        {canEdit && (
          <Button
            size="small"
            icon={<PlusOutlined />}
            onClick={startAdd}
            disabled={!!editingKey}
          >
            Thêm Dòng
          </Button>
        )}
      </div>
      <Table<PRLine & { _isNew?: boolean }>
        rowKey="balas_purchaserequisitionlineid"
        columns={columns}
        dataSource={allRows}
        loading={isLoading}
        pagination={false}
        size="small"
        bordered
      />
    </div>
  );
}
