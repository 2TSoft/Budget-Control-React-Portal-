# Memory

> Chronological action log. Hooks and AI append to this file automatically.
> Old sessions are consolidated by the daemon weekly.

## 2026-04-08

- **Neumorphism theme** triển khai cho toàn bộ site.
  - Tạo `src/shared/theme/neumorphism.ts` — Ant Design `ThemeConfig` (màu, borderRadius, boxShadow, component overrides)
  - Tạo `src/shared/theme/neumorphism.css` — CSS custom properties (`--neu-*`) + global overrides cho Button, Card, Input, Table, Modal, Menu, v.v.
  - Cập nhật `src/index.css` — base background `#E8E8E8`, text `#4A4A6A`, loại bỏ dark mode
  - Cập nhật `src/main.tsx` — wrap với `ConfigProvider theme={neumorphismTheme} locale={vi_VN}`
  - Nguồn: uistyleguide.com/style/neumorphism — bảng màu: #E8E8E8 (base), #FFFFFF (shadow light), #C8C8C8 (shadow dark), #5B9AC2 (primary)
