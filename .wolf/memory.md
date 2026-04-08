# Memory

> Chronological action log. Hooks and AI append to this file automatically.
> Old sessions are consolidated by the daemon weekly.

## 2026-04-08

- **Bento Design System** — Thay thế hoàn toàn neumorphism theme
  - Tạo `src/shared/design-system/tokens.css` — CSS Custom Properties: colors (#F5F5F7 bg, #FFFFFF cards, #00A1E4 Balas blue primary), soft drop shadows, radii, spacing, typography Inter
  - Tạo `src/shared/design-system/antd-theme.ts` — Ant Design ThemeConfig mapping tokens
  - Tạo `src/shared/design-system/global.css` — Body reset, scrollbar, focus-visible, AntD overrides (thay thế neumorphism.css + index.css)
  - Tạo `src/shared/design-system/motion.ts` — Framer Motion variants (fadeIn, cardHover, bentoItemReveal, pageTransition, pulse...)
  - Tạo `src/shared/design-system/index.ts` — Barrel export
  - **Layout Components:** AppShell (sidebar + topbar), Sidebar (nav items, logo, user section), TopBar (toggle, breadcrumb, avatar dropdown), PageContainer
  - **Bento Grid:** BentoGrid (CSS Grid container), BentoCard (span/variant/hover), BentoStat (animated count-up), BentoChart (placeholder)
  - **UI Components:** BentoTable (AntD Table wrapper), BentoForm, StatusBadge (pulse on pending), EmptyState
  - **Login Page:** Full-screen bento composition, hero card, feature cards, gradient background orbs
  - **Route Guard:** isAuthenticated → AppShell, else → LoginPage
  - **Page Redesigns:** Home→Dashboard (bento stats + quick actions), PR list (BentoTable + filters), Budget (stats + chart placeholder), Department (BentoTable)
  - Cập nhật `main.tsx` import bentoTheme thay neumorphism
  - Cập nhật `App.tsx` — AppShell wrap, LoginPage route guard
  - Old neumorphism files (`neumorphism.css`, `neumorphism.ts`, `App.css`) giữ chưa xóa
  - Install `framer-motion` dependency
  - Build: ✅ Pass | Lint: ✅ Clean
