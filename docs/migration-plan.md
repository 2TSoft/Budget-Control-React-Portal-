# Kế Hoạch Nâng Cấp Budget Control Portal: Power Pages → React SPA

## 1. Tổng Quan

Nâng cấp giao diện Budget Control Portal từ Power Pages (Liquid + Bootstrap) sang React SPA (Vite + TypeScript), giữ nguyên backend Dataverse và Business Central API.

### Kiến Trúc Mới

```
Business Central <--API--> Dataverse <--Web API--> React SPA <--UI--> User
                                     (/_api/cloudflow/)
                                     (Dataverse Web API)
```

### Kiến Trúc Cũ

```
Business Central <--API--> Dataverse <--Liquid/API--> Power Pages <--UI--> User
```

---

## 2. Phạm Vi Dự Án

### Dataverse Tables (9 bảng chính)

| # | Table | Mô tả | Forms |
|---|-------|--------|-------|
| 1 | `balas_purchaserequisitionheader` | PR Header | New, Edit, View |
| 2 | `balas_purchaserequisitionline` | PR Lines | Subgrid trong PR |
| 3 | `balas_department` | Phòng ban | New, Edit, View |
| 4 | `balas_approvalmatrix` | Ma trận phê duyệt | New, Edit, View |
| 5 | `balas_servicecategory` | Danh mục dịch vụ | Add, Edit, View |
| 6 | `balas_dimensionvalue` | Dimension Values | List only |
| 7 | `balas_siteconfiguration` | Cấu hình site | Edit |
| 8 | `bcbi_company` | Công ty (BC) | View + Subgrid |
| 9 | `contact` | Liên hệ / User | New, Edit, View |
| 10 | `account` | Vendor | List only |

### Trang / Module

| # | Module | Mô tả | Ưu tiên |
|---|--------|--------|---------|
| 1 | **Authentication** | Azure AD login, role-based access | P0 |
| 2 | **Purchase Requisition** | CRUD + approval workflow | P0 |
| 3 | **Budget Check** | Tra cứu ngân sách qua Cloud Flow | P0 |
| 4 | **Department** | Quản lý phòng ban | P1 |
| 5 | **Approval Matrix** | Ma trận phê duyệt | P1 |
| 6 | **Contact Management** | Quản lý user/contact | P1 |
| 7 | **Company** | Xem công ty + department subgrid | P2 |
| 8 | **Service Category** | Danh mục dịch vụ | P2 |
| 9 | **Vendor List** | Danh sách nhà cung cấp | P2 |
| 10 | **Reports** | Báo cáo | P2 |
| 11 | **Site Config** | Cấu hình hệ thống (Admin) | P3 |

---

## 3. Kiến Trúc Kỹ Thuật React

### Tech Stack

| Layer | Technology | Lý do |
|-------|-----------|-------|
| **Framework** | React 19 + TypeScript | Modern, type-safe |
| **Build Tool** | Vite 8 | Fast HMR, optimized build |
| **Routing** | React Router v7 | SPA routing |
| **State Management** | TanStack Query v5 | Server state, caching, optimistic updates |
| **UI Library** | Ant Design 5 / Shadcn UI | Enterprise-grade components |
| **Forms** | React Hook Form + Zod | Validation, performance |
| **Auth** | MSAL.js v3 | Azure AD authentication |
| **HTTP Client** | Axios | Interceptors, error handling |
| **i18n** | react-i18next | Đa ngôn ngữ (vi, en) |

### Cấu Trúc Thư Mục

```
src/
├── app/                      # App-level config
│   ├── App.tsx
│   ├── router.tsx            # Route definitions
│   └── providers.tsx         # Context providers
├── auth/                     # Authentication
│   ├── msal-config.ts
│   ├── AuthProvider.tsx
│   └── useAuth.ts
├── api/                      # API layer
│   ├── dataverse-client.ts   # Dataverse Web API client
│   ├── cloudflow-client.ts   # Cloud Flow trigger client
│   └── endpoints/
│       ├── purchase-requisition.ts
│       ├── department.ts
│       ├── approval-matrix.ts
│       ├── contact.ts
│       ├── company.ts
│       ├── service-category.ts
│       ├── vendor.ts
│       └── budget.ts
├── features/                 # Feature modules
│   ├── purchase-requisition/
│   │   ├── components/
│   │   │   ├── PRList.tsx
│   │   │   ├── PRForm.tsx
│   │   │   ├── PRView.tsx
│   │   │   ├── PRLineTable.tsx
│   │   │   └── PRApprovalActions.tsx
│   │   ├── hooks/
│   │   │   ├── usePurchaseRequisitions.ts
│   │   │   └── usePRActions.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── budget/
│   │   ├── components/
│   │   │   ├── BudgetCheck.tsx
│   │   │   └── BudgetStatus.tsx
│   │   ├── hooks/
│   │   │   └── useBudgetCheck.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── department/
│   ├── approval-matrix/
│   ├── contact/
│   ├── company/
│   ├── service-category/
│   ├── vendor/
│   ├── reports/
│   └── site-config/
├── shared/                   # Shared components
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── AppLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── DataTable/
│   │   │   ├── DataTable.tsx
│   │   │   └── TableActions.tsx
│   │   ├── EntityForm/
│   │   │   ├── EntityForm.tsx
│   │   │   └── FormFields.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── ErrorBoundary.tsx
│   ├── hooks/
│   │   ├── useDataverse.ts
│   │   ├── useCloudFlow.ts
│   │   └── usePermissions.ts
│   └── utils/
│       ├── constants.ts
│       └── formatters.ts
├── types/                    # Global types
│   ├── dataverse.ts
│   └── auth.ts
└── styles/                   # Global styles
    └── theme.ts
```

---

## 4. Mapping Power Pages → React

### Cloud Flow API Endpoints

| Tên | URL | Dùng cho |
|-----|-----|----------|
| Budget Control Entry | `/_api/cloudflow/v1.0/trigger/31ead744...` | Kiểm tra ngân sách |
| Budget Control Status | `/_api/cloudflow/v1.0/trigger/4fead744...` | Trạng thái ngân sách |
| Budget Control | `/_api/cloudflow/v1.0/trigger/20d7c23e...` | Tra cứu ngân sách |
| Request Approval | `/_api/cloudflow/v1.0/trigger/45c84438...` | Gửi yêu cầu phê duyệt |
| Reopen | `/_api/cloudflow/v1.0/trigger/333bf51a...` | Mở lại PR |
| Cancel Request | `/_api/cloudflow/v1.0/trigger/f7b6c327...` | Hủy yêu cầu |
| Approve | `/_api/cloudflow/v1.0/trigger/1bb7c327...` | Phê duyệt |
| Reject | `/_api/cloudflow/v1.0/trigger/3915db2d...` | Từ chối |
| Close PR | `/_api/cloudflow/v1.0/trigger/14f6c821...` | Đóng PR |
| Vendor Purchase Price | `/_api/cloudflow/v1.0/trigger/b0c42435...` | Giá mua NCC |
| Special PR | `/_api/cloudflow/v1.0/trigger/eb4ed2dc...` | PR đặc biệt |
| Item UOM | `/_api/cloudflow/v1.0/trigger/25cca410...` | Đơn vị đo lường |
| Update Vendor | `/_api/cloudflow/v1.0/trigger/6d5585b7...` | Cập nhật NCC |
| Import Lines | `/_api/cloudflow/v1.0/trigger/77661104...` | Nhập dòng PR |

### Dataverse Web API Endpoints

| Entity | API Path | Fields |
|--------|----------|--------|
| PR Header | `/_api/balas_purchaserequisitionheaders` | `*` |
| PR Line | `/_api/balas_purchaserequisitionlines` | `*` |
| Contact | `/_api/contacts` | enabled |
| Account | `/_api/accounts` | enabled |
| Dimension Value | `/_api/balas_dimensionvalues` | enabled, OData filter on |
| Company | `/_api/bcbi_companies` | `*`, OData filter off |
| Budget Setup | `/_api/balas_budgetsetups` | `*` |

### Role Mapping

| Power Pages Role | React Equivalent |
|-----------------|------------------|
| Administrators | `admin` role claim |
| Local Admin | `local-admin` role claim |
| Authenticated Users | Authenticated via MSAL |
| Anonymous Users | Không hỗ trợ (deprecated) |

---

## 5. Lộ Trình Triển Khai (Phases)

### Phase 0: Foundation (Tuần 1-2) ✅ HOÀN THÀNH
- [X] Cấu hình project structure (src/app, auth, api, features, shared, types)
- [X] Cài đặt dependencies (MSAL, TanStack Query, React Router, RHF, Zod, Ant Design, i18n, Axios)
- [X] Setup MSAL authentication (msal-config.ts, AuthProvider.tsx, ProtectedRoute.tsx)
- [X] Tạo Dataverse Web API client (dataverse-client.ts - với auto Bearer token)
- [X] Tạo Cloud Flow client (cloudflow-client.ts)
- [X] Setup routing + layout components (AppLayout, Sidebar, Header)
- [X] Setup theme + design system (Ant Design 5 + vi_VN locale)
- [X] Tạo global types (dataverse.ts, auth.ts) & constants (CLOUD_FLOWS, DATAVERSE_ENTITIES)
- [X] Path alias @/ → src/, .env.example

### Phase 1: Core - Purchase Requisition (Tuần 3-5) ✅ HOÀN THÀNH
- [X] PR List page (DataTable + search + pagination + status tags)
- [X] PR Create form (React Hook Form + Zod validation)
- [X] PR Edit form (prefill data, cùng component PRFormPage)
- [X] PR View page (Descriptions + action buttons theo trạng thái)
- [X] PR Line items subgrid (inline edit table - thêm/sửa/xóa dòng)
- [X] Approval workflow actions (Submit, Approve, Reject, Reopen, Cancel, Close via Cloud Flow)
- [X] Types: PRStatus const + PRHeader/PRLine interfaces + Zod schemas
- [X] API: prHeaderApi, prLineApi (CRUD)
- [X] Hooks: usePRHeaders, usePRHeader, useCreatePR, useUpdatePR, useDeletePR, usePRLines, useCreatePRLine, useUpdatePRLine, useDeletePRLine, usePRCloudFlowAction
- [X] Router: /purchase-requisitions, /purchase-requisitions/new, /:id, /:id/edit
- [ ] Budget Check integration (Cloud Flow) — hook có sẵn, chưa có UI
- [ ] Import Lines từ Excel — Phase 3

### Phase 2: Master Data (Tuần 6-7)
- [ ] Department CRUD
- [ ] Approval Matrix CRUD
- [ ] Contact Management (CRUD + portal user)
- [ ] Company view + department subgrid

### Phase 3: Supporting Features (Tuần 8-9)
- [ ] Service Category CRUD
- [ ] Vendor List (read-only)
- [ ] Dimension Values list
- [ ] Reports page
- [ ] Site Configuration (Admin only)

### Phase 4: Polish & Deploy (Tuần 10)
- [ ] Responsive design / Mobile optimization
- [ ] Error handling & loading states
- [ ] i18n (Vietnamese + English)
- [ ] Performance optimization
- [ ] Testing (unit + integration)
- [ ] Build & deployment pipeline

---

## 6. Lưu Ý Kỹ Thuật

### Authentication
- Sử dụng MSAL.js v3 với Azure AD (giữ nguyên Azure AD config từ Power Pages)
- Token-based auth cho Dataverse Web API calls
- Role-based route protection

### Dataverse Web API
- Base URL: Power Pages portal URL + `/_api/`
- Hoặc direct Dataverse: `https://<org>.crm.dynamics.com/api/data/v9.2/`
- Cần xử lý CORS nếu gọi trực tiếp Dataverse
- Pagination: `@odata.nextLink`
- Expand: `$expand` cho related entities

### Cloud Flow Integration
- POST requests tới `/_api/cloudflow/v1.0/trigger/<flow-id>`
- Gửi JSON body, nhận JSON response
- Async flows cần polling hoặc callback

### File Attachments
- PR form hỗ trợ attachments (tất cả file types)
- Cần sử dụng SharePoint integration hoặc Dataverse file columns

### Currency
- Default currency ID: `398c296f-7437-f011-b4cd-6045bd599c55`
- Cấu hình trong constants
