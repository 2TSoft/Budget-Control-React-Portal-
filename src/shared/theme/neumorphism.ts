import type { ThemeConfig } from 'antd';

/**
 * Neumorphism theme cho Budget Control Portal
 * Dựa trên bảng màu từ uistyleguide.com/style/neumorphism
 *
 * Màu sắc:
 *   Base background : #E8E8E8
 *   Light shadow    : #FFFFFF
 *   Dark shadow     : #C8C8C8
 *   Primary accent  : #5B9AC2  (derive từ #C8E0F4)
 *   Pink accent     : #D4849A  (derive từ #F5E0E8)
 *   Text primary    : #4A4A6A
 */

export const NEUMORPHISM_COLORS = {
  base: '#E8E8E8',
  shadowLight: '#FFFFFF',
  shadowDark: '#C8C8C8',
  primary: '#5B9AC2',
  primaryHover: '#4A89B1',
  primaryActive: '#3A7AA0',
  accent: '#D4849A',
  textPrimary: '#4A4A6A',
  textSecondary: '#7A7A9A',
  border: '#D4D4D4',
  error: '#D9534F',
  warning: '#E8A838',
  success: '#5BAA7A',
} as const;

export const neumorphismTheme: ThemeConfig = {
  token: {
    // Màu nền
    colorBgBase: NEUMORPHISM_COLORS.base,
    colorBgContainer: NEUMORPHISM_COLORS.base,
    colorBgElevated: NEUMORPHISM_COLORS.base,
    colorBgLayout: NEUMORPHISM_COLORS.base,
    colorBgSpotlight: NEUMORPHISM_COLORS.base,

    // Màu primary
    colorPrimary: NEUMORPHISM_COLORS.primary,

    // Màu văn bản
    colorText: NEUMORPHISM_COLORS.textPrimary,
    colorTextSecondary: NEUMORPHISM_COLORS.textSecondary,
    colorTextTertiary: NEUMORPHISM_COLORS.textSecondary,
    colorTextPlaceholder: '#A0A0BA',

    // Border
    colorBorder: NEUMORPHISM_COLORS.border,
    colorBorderSecondary: '#DCDCDC',

    // Trạng thái
    colorError: NEUMORPHISM_COLORS.error,
    colorWarning: NEUMORPHISM_COLORS.warning,
    colorSuccess: NEUMORPHISM_COLORS.success,

    // Border radius — neumorphism dùng bo tròn nhiều
    borderRadius: 16,
    borderRadiusLG: 20,
    borderRadiusSM: 12,
    borderRadiusXS: 8,

    // Shadows — 2 lớp tạo hiệu ứng nổi
    boxShadow: `-5px -5px 15px ${NEUMORPHISM_COLORS.shadowLight}, 5px 5px 15px ${NEUMORPHISM_COLORS.shadowDark}`,
    boxShadowSecondary: `-3px -3px 8px ${NEUMORPHISM_COLORS.shadowLight}, 3px 3px 8px ${NEUMORPHISM_COLORS.shadowDark}`,

    // Typography
    fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
    fontSize: 14,
    fontSizeLG: 16,
    fontSizeXL: 20,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,

    // Spacing
    padding: 16,
    paddingLG: 24,
    paddingSM: 12,
    paddingXS: 8,

    // Motion
    motionDurationMid: '0.15s',
    motionDurationSlow: '0.25s',
    motionEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  components: {
    Button: {
      borderRadius: 14,
      paddingInline: 20,
      controlHeight: 40,
      boxShadow: `-4px -4px 10px ${NEUMORPHISM_COLORS.shadowLight}, 4px 4px 10px ${NEUMORPHISM_COLORS.shadowDark}`,
    },
    Card: {
      borderRadius: 20,
      paddingLG: 24,
      boxShadow: `-8px -8px 20px ${NEUMORPHISM_COLORS.shadowLight}, 8px 8px 20px ${NEUMORPHISM_COLORS.shadowDark}`,
    },
    Input: {
      borderRadius: 12,
      controlHeight: 40,
    },
    Select: {
      borderRadius: 12,
      controlHeight: 40,
    },
    Modal: {
      borderRadius: 20,
      paddingContentHorizontal: 32,
    },
    Table: {
      borderRadius: 16,
    },
    Menu: {
      borderRadius: 12,
    },
    Layout: {
      colorBgHeader: NEUMORPHISM_COLORS.base,
      colorBgBody: NEUMORPHISM_COLORS.base,
      colorBgTrigger: NEUMORPHISM_COLORS.base,
    },
    Breadcrumb: {
      fontSize: 14,
    },
    Tag: {
      borderRadius: 8,
    },
    Badge: {
      borderRadius: 10,
    },
    Notification: {
      borderRadius: 16,
    },
    Alert: {
      borderRadius: 14,
    },
    Tooltip: {
      borderRadius: 10,
    },
  },
};
