import { Descriptions, Tag, Button, Space, Spin, Typography, Divider, App, Popconfirm } from 'antd';
import {
  EditOutlined,
  ArrowLeftOutlined,
  SendOutlined,
  CheckOutlined,
  CloseOutlined,
  ReloadOutlined,
  StopOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import {
  usePRHeader,
  useSubmitPR,
  useApprovePR,
  useRejectPR,
  useReopenPR,
  useCancelPR,
  useClosePR,
} from '../hooks/usePurchaseRequisition';
import { PRStatus } from '../types';
import PRLineTable from './PRLineTable';

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

export default function PRViewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const { data: pr, isLoading } = usePRHeader(id);

  const submitPR = useSubmitPR();
  const approvePR = useApprovePR();
  const rejectPR = useRejectPR();
  const reopenPR = useReopenPR();
  const cancelPR = useCancelPR();
  const closePR = useClosePR();

  const handleAction = async (
    action: ReturnType<typeof useSubmitPR>,
    label: string,
  ) => {
    if (!id) return;
    try {
      await action.mutateAsync({ prId: id });
      message.success(`${label} thành công`);
    } catch {
      message.error(`${label} thất bại, vui lòng thử lại`);
    }
  };

  if (isLoading) {
    return <Spin size="large" style={{ display: 'block', textAlign: 'center', marginTop: 48 }} />;
  }

  if (!pr) return null;

  const status = pr.statuscode ?? PRStatus.Draft;
  const isDraft = status === PRStatus.Draft;
  const isSubmitted = status === PRStatus.Submitted || status === PRStatus.InProgress;
  const isRejected = status === PRStatus.Rejected;
  const isCancelled = status === PRStatus.Cancelled;
  const isClosed = status === PRStatus.Closed;
  const isApproved = status === PRStatus.Approved;
  const canEdit = isDraft || isRejected;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/purchase-requisitions')} />
          <Title level={4} style={{ margin: 0 }}>{pr.balas_name}</Title>
          <Tag color={STATUS_COLOR[status]}>{STATUS_LABEL[status]}</Tag>
        </Space>

        {/* Action buttons theo trạng thái */}
        <Space wrap>
          {canEdit && (
            <Button
              icon={<EditOutlined />}
              onClick={() => navigate(`/purchase-requisitions/${id}/edit`)}
            >
              Sửa
            </Button>
          )}
          {isDraft && (
            <Button
              type="primary"
              icon={<SendOutlined />}
              loading={submitPR.isPending}
              onClick={() => handleAction(submitPR, 'Gửi yêu cầu')}
            >
              Gửi Phê Duyệt
            </Button>
          )}
          {isSubmitted && (
            <>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                loading={approvePR.isPending}
                onClick={() => handleAction(approvePR, 'Phê duyệt')}
              >
                Phê Duyệt
              </Button>
              <Popconfirm
                title="Từ chối yêu cầu?"
                onConfirm={() => handleAction(rejectPR, 'Từ chối')}
                okText="Từ chối"
                okType="danger"
                cancelText="Hủy"
              >
                <Button danger icon={<CloseOutlined />} loading={rejectPR.isPending}>
                  Từ Chối
                </Button>
              </Popconfirm>
            </>
          )}
          {(isRejected || isCancelled) && (
            <Button
              icon={<ReloadOutlined />}
              loading={reopenPR.isPending}
              onClick={() => handleAction(reopenPR, 'Mở lại')}
            >
              Mở Lại
            </Button>
          )}
          {!isClosed && !isCancelled && (
            <Popconfirm
              title="Hủy yêu cầu?"
              onConfirm={() => handleAction(cancelPR, 'Hủy yêu cầu')}
              okText="Hủy yêu cầu"
              okType="danger"
              cancelText="Không"
            >
              <Button icon={<StopOutlined />} loading={cancelPR.isPending}>
                Hủy
              </Button>
            </Popconfirm>
          )}
          {isApproved && (
            <Button
              icon={<LockOutlined />}
              loading={closePR.isPending}
              onClick={() => handleAction(closePR, 'Đóng PR')}
            >
              Đóng
            </Button>
          )}
        </Space>
      </div>

      {/* Thông tin chung */}
      <Descriptions bordered column={2} size="small">
        <Descriptions.Item label="Số PR">{pr.balas_name}</Descriptions.Item>
        <Descriptions.Item label="Trạng Thái">
          <Tag color={STATUS_COLOR[status]}>{STATUS_LABEL[status]}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Phòng Ban">
          {pr._balas_departmentid_value_Formatted ?? '—'}
        </Descriptions.Item>
        <Descriptions.Item label="Người Tạo">
          {pr._ownerid_value_Formatted ?? '—'}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày Yêu Cầu">
          {pr.balas_requestdate ? new Date(pr.balas_requestdate).toLocaleDateString('vi-VN') : '—'}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày Cần">
          {pr.balas_requireddate ? new Date(pr.balas_requireddate).toLocaleDateString('vi-VN') : '—'}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày Tạo">
          {pr.createdon ? new Date(pr.createdon).toLocaleDateString('vi-VN') : '—'}
        </Descriptions.Item>
        <Descriptions.Item label="Mô Tả" span={2}>
          {pr.balas_description ?? '—'}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      {/* Danh sách dòng PR */}
      <PRLineTable headerId={id!} canEdit={canEdit} />
    </div>
  );
}
