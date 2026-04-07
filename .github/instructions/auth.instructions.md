---
description: "Sử dụng khi cần setup authentication, authorization, role-based access control, MSAL configuration, protected routes."
applyTo: "src/auth/**"
---
# Authentication & Authorization

## MSAL Configuration

```tsx
// src/auth/msal-config.ts
export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
  },
};
```

## Roles (từ Power Pages)

| Role | Mô tả | Quyền |
|------|--------|-------|
| `admin` | Quản trị viên hệ thống | Full CRUD tất cả entities |
| `local-admin` | Admin cục bộ | CRUD departments, contacts, approval matrix |
| `authenticated` | Người dùng đã đăng nhập | Xem/tạo PR, xem budget |

## Protected Routes

```tsx
<ProtectedRoute roles={['admin']}>
  <SiteConfigPage />
</ProtectedRoute>

<ProtectedRoute roles={['admin', 'local-admin']}>
  <DepartmentEditPage />
</ProtectedRoute>

<ProtectedRoute> {/* Chỉ cần authenticated */}
  <PRListPage />
</ProtectedRoute>
```

## Route → Role Mapping (từ Power Pages Web Page Access Control)

| Route | Roles |
|-------|-------|
| `/config` | admin |
| `/departments/new`, `/departments/:id/edit` | admin, local-admin |
| `/contacts/:id/edit` | admin, local-admin |
| `/service-categories/new` | admin |
| `/purchase-requisitions` | authenticated |
| `/budget` | authenticated |

## Environment Variables (.env)

```env
VITE_AZURE_CLIENT_ID=
VITE_AZURE_TENANT_ID=
VITE_DATAVERSE_URL=
VITE_PORTAL_URL=
```
