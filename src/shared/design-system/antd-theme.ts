import type { ThemeConfig } from 'antd';
import { theme as antdTheme } from 'antd';

/**
 * Bento Design System — Ant Design Theme
 * Map CSS custom properties vào Ant Design ConfigProvider
 * Primary: #00A1E4 (Balas Technologies brand blue)
 */

const BENTO_COLORS = {
    primary: '#00A1E4',
    primaryHover: '#0090CC',
    primaryActive: '#007FB5',
    bg: '#F5F5F7',
    bgCard: '#FFFFFF',
    text: '#1D1D1F',
    textSecondary: '#6E6E73',
    textTertiary: '#86868B',
    border: '#E5E5EA',
    borderLight: '#F2F2F7',
    error: '#FF3B30',
    warning: '#FF9F0A',
    success: '#34C759',
} as const;

export const bentoTheme: ThemeConfig = {
    token: {
        colorPrimary: BENTO_COLORS.primary,

        colorBgBase: BENTO_COLORS.bg,
        colorBgContainer: BENTO_COLORS.bgCard,
        colorBgElevated: BENTO_COLORS.bgCard,
        colorBgLayout: BENTO_COLORS.bg,
        colorBgSpotlight: BENTO_COLORS.bgCard,

        colorText: BENTO_COLORS.text,
        colorTextSecondary: BENTO_COLORS.textSecondary,
        colorTextTertiary: BENTO_COLORS.textTertiary,
        colorTextPlaceholder: '#AEAEB2',

        colorBorder: BENTO_COLORS.border,
        colorBorderSecondary: BENTO_COLORS.borderLight,

        colorError: BENTO_COLORS.error,
        colorWarning: BENTO_COLORS.warning,
        colorSuccess: BENTO_COLORS.success,

        borderRadius: 12,
        borderRadiusLG: 16,
        borderRadiusSM: 8,
        borderRadiusXS: 6,

        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        boxShadowSecondary: '0 4px 6px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.03)',

        fontFamily: "'Inter', 'SF Pro Display', 'Segoe UI', system-ui, -apple-system, sans-serif",
        fontSize: 14,
        fontSizeLG: 16,
        fontSizeXL: 18,
        fontSizeHeading1: 36,
        fontSizeHeading2: 28,
        fontSizeHeading3: 22,
        fontSizeHeading4: 18,
        fontSizeHeading5: 16,

        padding: 16,
        paddingLG: 24,
        paddingSM: 12,
        paddingXS: 8,

        motionDurationMid: '0.2s',
        motionDurationSlow: '0.3s',
        motionEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    components: {
        Button: {
            borderRadius: 10,
            paddingInline: 20,
            controlHeight: 40,
            primaryShadow: '0 2px 4px rgba(0, 161, 228, 0.25)',
        },
        Card: {
            borderRadiusLG: 16,
            paddingLG: 24,
            boxShadowTertiary: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.03)',
        },
        Input: {
            borderRadius: 10,
            controlHeight: 40,
            activeBorderColor: BENTO_COLORS.primary,
            hoverBorderColor: BENTO_COLORS.primaryHover,
        },
        Select: {
            borderRadius: 10,
            controlHeight: 40,
        },
        Modal: {
            borderRadiusLG: 20,
            paddingContentHorizontal: 28,
        },
        Table: {
            borderRadiusLG: 16,
            headerBg: '#FAFAFA',
            rowHoverBg: '#F5F5F7',
        },
        Menu: {
            borderRadius: 10,
            itemBorderRadius: 10,
            itemMarginInline: 4,
        },
        Layout: {
            headerBg: BENTO_COLORS.bgCard,
            bodyBg: BENTO_COLORS.bg,
            siderBg: BENTO_COLORS.bgCard,
        },
        Tag: {
            borderRadiusSM: 6,
        },
        Notification: {
            borderRadiusLG: 14,
        },
        Alert: {
            borderRadiusLG: 12,
        },
        Breadcrumb: {
            fontSize: 14,
        },
    },
};

export const bentoDarkTheme: ThemeConfig = {
    ...bentoTheme,
    algorithm: antdTheme.darkAlgorithm,
    token: {
        ...bentoTheme.token,
        colorBgBase: '#1A1A1E',
        colorBgContainer: '#2C2C30',
        colorBgElevated: '#38383C',
        colorBgLayout: '#1A1A1E',
        colorBgSpotlight: '#2C2C30',
        colorText: '#F5F5F7',
        colorTextSecondary: '#A1A1A6',
        colorTextTertiary: '#8E8E93',
        colorTextPlaceholder: '#636366',
        colorBorder: '#3A3A3C',
        colorBorderSecondary: '#2C2C2E',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
        boxShadowSecondary: '0 4px 6px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.15)',
    },
    components: {
        ...bentoTheme.components,
        Table: {
            borderRadiusLG: 16,
            headerBg: '#222226',
            rowHoverBg: '#2C2C30',
        },
        Layout: {
            headerBg: '#2C2C30',
            bodyBg: '#1A1A1E',
            siderBg: '#222226',
        },
    },
};
