import { useEffect } from 'react';
import { Form, Input, DatePicker, Button, Space, Typography, Spin, App } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { prHeaderSchema, type PRHeaderFormData } from '../types';
import { usePRHeader, useCreatePR, useUpdatePR } from '../hooks/usePurchaseRequisition';

const { Title } = Typography;
const { TextArea } = Input;

interface PRFormPageProps {
  mode: 'create' | 'edit';
}

export default function PRFormPage({ mode }: PRFormPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const { data: prData, isLoading } = usePRHeader(mode === 'edit' ? id : undefined);
  const createPR = useCreatePR();
  const updatePR = useUpdatePR();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PRHeaderFormData>({
    resolver: zodResolver(prHeaderSchema),
    defaultValues: {
      balas_name: '',
      balas_description: '',
      balas_requestdate: '',
      balas_requireddate: '',
    },
  });

  // Prefill form khi edit
  useEffect(() => {
    if (mode === 'edit' && prData) {
      reset({
        balas_name: prData.balas_name ?? '',
        balas_description: prData.balas_description ?? '',
        balas_requestdate: prData.balas_requestdate ?? '',
        balas_requireddate: prData.balas_requireddate ?? '',
      });
    }
  }, [prData, mode, reset]);

  const onSubmit = async (formData: PRHeaderFormData) => {
    try {
      const payload = {
        balas_name: formData.balas_name,
        balas_description: formData.balas_description,
        balas_requestdate: formData.balas_requestdate || undefined,
        balas_requireddate: formData.balas_requireddate || undefined,
      };

      if (mode === 'create') {
        const result = await createPR.mutateAsync(payload);
        message.success('Tạo PR thành công');
        navigate(`/purchase-requisitions/${result.balas_purchaserequisitionheaderid}`);
      } else if (id) {
        await updatePR.mutateAsync({ id, data: payload });
        message.success('Cập nhật PR thành công');
        navigate(`/purchase-requisitions/${id}`);
      }
    } catch {
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  if (mode === 'edit' && isLoading) {
    return <Spin size="large" style={{ display: 'block', textAlign: 'center', marginTop: 48 }} />;
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
        <Title level={4} style={{ margin: 0 }}>
          {mode === 'create' ? 'Tạo Yêu Cầu Mua Hàng' : 'Sửa Yêu Cầu Mua Hàng'}
        </Title>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Controller
          name="balas_name"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Số PR / Tên"
              required
              validateStatus={errors.balas_name ? 'error' : ''}
              help={errors.balas_name?.message}
            >
              <Input {...field} placeholder="Nhập số PR..." />
            </Form.Item>
          )}
        />

        <Controller
          name="balas_description"
          control={control}
          render={({ field }) => (
            <Form.Item label="Mô tả">
              <TextArea {...field} rows={4} placeholder="Nhập mô tả..." />
            </Form.Item>
          )}
        />

        <Space size="large" style={{ width: '100%' }}>
          <Controller
            name="balas_requestdate"
            control={control}
            render={({ field }) => (
              <Form.Item label="Ngày Yêu Cầu">
                <DatePicker
                  format="DD/MM/YYYY"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(d) => field.onChange(d ? d.toISOString() : '')}
                  placeholder="Chọn ngày..."
                />
              </Form.Item>
            )}
          />

          <Controller
            name="balas_requireddate"
            control={control}
            render={({ field }) => (
              <Form.Item label="Ngày Cần">
                <DatePicker
                  format="DD/MM/YYYY"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(d) => field.onChange(d ? d.toISOString() : '')}
                  placeholder="Chọn ngày..."
                />
              </Form.Item>
            )}
          />
        </Space>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={isSubmitting}
            >
              {mode === 'create' ? 'Tạo Mới' : 'Lưu'}
            </Button>
            <Button onClick={() => navigate(-1)}>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
