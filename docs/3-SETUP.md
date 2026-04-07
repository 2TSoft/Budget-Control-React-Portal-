# Hướng Dẫn Cài Đặt & Phát Triển (Setup Guide)

## Yêu Cầu Hệ Thống

- **Node.js** >= 20.x (khuyến nghị LTS)
- **npm** >= 10.x
- **Git** >= 2.x
- **Azure AD App Registration** (SPA type, public client)
- **Power Pages portal** đã cấu hình Dataverse Web API

## 1. Clone & Cài Đặt

```bash
# Clone repository
git clone https://github.com/Nguyen-Trieu-dev/Budget-Control-React-Portal-.git
cd Budget-Control-React-Portal-

# Cài đặt dependencies
npm install
```

## 2. Cấu Hình Environment

```bash
# Copy template
cp .env.example .env
```

Cập nhật file `.env`:

```env
# Azure AD App Registration (SPA - public client, KHÔNG cần client secret)
# API Permissions: Dynamics CRM → Delegated → user_impersonation
VITE_AZURE_CLIENT_ID=your-azure-ad-client-id
VITE_AZURE_TENANT_ID=your-azure-ad-tenant-id

# Dataverse URL (không có trailing slash)
VITE_DATAVERSE_URL=https://orgXXXXXXXX.crm5.dynamics.com

# Power Pages Portal URL (dùng cho Vite dev proxy)
VITE_PORTAL_URL=https://your-portal.powerappsportals.com
```

### Lưu Ý Quan Trọng

- **Azure AD App Registration** phải là **Public Client (SPA)** — không cần client secret
- **API Permissions** cần thêm: `Dynamics CRM` → `Delegated` → `user_impersonation`
- **Redirect URI** trong App Registration phải bao gồm `http://localhost:5173` (Vite dev server)

## 3. Chạy Development Server

```bash
npm run dev
```

Vite dev server sẽ chạy tại `http://localhost:5173` với:
- **Hot Module Replacement (HMR)** — thay đổi code tự động cập nhật
- **Proxy** — `/_api/*` sẽ được proxy tới Power Pages portal URL (tránh CORS)
- **Path alias** — `@/` map tới `src/`

## 4. Scripts Có Sẵn

| Script | Lệnh | Mô Tả |
|--------|-------|--------|
| `dev` | `npm run dev` | Chạy Vite dev server |
| `build` | `npm run build` | TypeScript check + Vite production build |
| `lint` | `npm run lint` | ESLint kiểm tra code |
| `preview` | `npm run preview` | Preview production build locally |

## 5. Cấu Trúc Dev Proxy

Vite proxy trong `vite.config.ts`:

```
http://localhost:5173/_api/*  →  https://your-portal.powerappsportals.com/_api/*
```

Điều này cho phép gọi Dataverse Web API và Cloud Flow triggers mà không gặp lỗi CORS trong development.

## 6. Path Alias

Cấu hình trong `vite.config.ts` + `tsconfig.app.json`:

```typescript
// Import dùng alias thay vì relative path
import { prHeaderApi } from '@/api/endpoints/purchase-requisition';
import { useAuth } from '@/auth/AuthProvider';
```

## 7. IDE Khuyến Nghị

- **VS Code** với extensions:
  - GitHub Copilot (đã có AI instructions cấu hình sẵn)
  - ESLint
  - TypeScript Vue Plugin (nếu cần)
  - Ant Design Snippets

## 8. Tạo Feature Module Mới

Sử dụng Copilot Skill `feature-scaffold` hoặc tạo thủ công:

```
src/features/<module-name>/
├── components/
│   ├── <Name>ListPage.tsx    # Trang danh sách
│   ├── <Name>FormPage.tsx    # Trang tạo/sửa
│   └── <Name>ViewPage.tsx    # Trang xem chi tiết
├── hooks/
│   └── use<Name>.ts          # TanStack Query hooks
├── types.ts                  # TypeScript types + Zod schemas
└── index.ts                  # Barrel exports
```

Sau đó:
1. Tạo API endpoint tại `src/api/endpoints/<entity>.ts`
2. Thêm route vào `src/app/router.tsx`
3. Thêm menu item vào `src/shared/components/Layout/Sidebar.tsx`

## 9. Troubleshooting

### Lỗi CORS khi gọi API
- Kiểm tra `VITE_PORTAL_URL` trong `.env` đúng URL portal
- Đảm bảo Vite dev server đang chạy (proxy chỉ hoạt động khi dev server active)

### Lỗi Authentication
- Kiểm tra `VITE_AZURE_CLIENT_ID` và `VITE_AZURE_TENANT_ID`
- Đảm bảo `http://localhost:5173` đã được thêm vào Redirect URIs trong Azure AD App Registration
- Kiểm tra API Permissions đã được admin consent

### Build lỗi TypeScript
- Chạy `npx tsc --noEmit` để xem chi tiết lỗi type
- Kiểm tra `tsconfig.app.json` có `"erasableSyntaxOnly": true` — KHÔNG dùng `enum`, dùng `const object` thay thế
