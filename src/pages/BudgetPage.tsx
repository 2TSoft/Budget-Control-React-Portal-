import {
  DollarOutlined,
  PieChartOutlined,
  BarChartOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  BentoGrid,
  BentoStat,
  BentoCard,
  BentoChart,
} from '@/shared/design-system';

const BudgetPage = () => (
  <PageContainer
    title="Ngân sách"
    subtitle="Tổng quan tình hình ngân sách theo phòng ban"
  >
    <BentoGrid columns={4} gap="md">
      <BentoStat
        icon={<DollarOutlined />}
        label="Tổng ngân sách năm"
        value={2500}
        prefix=""
        suffix="M"
        color="#00A1E4"
      />
      <BentoStat
        icon={<PieChartOutlined />}
        label="Đã sử dụng"
        value={1700}
        prefix=""
        suffix="M"
        trend={{ value: 68, label: '% kế hoạch' }}
        color="#34C759"
      />
      <BentoStat
        icon={<BarChartOutlined />}
        label="Còn lại"
        value={800}
        prefix=""
        suffix="M"
        color="#FF9F0A"
      />
      <BentoStat
        icon={<WarningOutlined />}
        label="Phòng ban vượt mức"
        value={2}
        color="#FF3B30"
      />
    </BentoGrid>

    <BentoGrid columns={2} gap="md">
      <BentoChart title="Ngân sách theo phòng ban" subtitle="Top 5 phòng ban chi tiêu nhiều nhất">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'var(--bento-text-tertiary)',
            fontSize: 'var(--bento-text-sm)',
          }}
        >
          Chart placeholder — tích hợp trong Phase tiếp theo
        </div>
      </BentoChart>

      <BentoCard>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ margin: 0, fontSize: 'var(--bento-text-lg)', fontWeight: 600 }}>
            Cảnh báo ngân sách
          </h3>
          <div
            style={{
              color: 'var(--bento-text-secondary)',
              fontSize: 'var(--bento-text-sm)',
              padding: '24px 0',
              textAlign: 'center',
            }}
          >
            Chưa có cảnh báo nào
          </div>
        </div>
      </BentoCard>
    </BentoGrid>
  </PageContainer>
);

export default BudgetPage;
