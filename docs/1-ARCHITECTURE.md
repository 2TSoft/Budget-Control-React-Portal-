# Kiến Trúc Hệ Thống (Architecture)

## 1. Tổng Quan

```
Business Central ←— API —→ Dataverse ←— Web API —→ React SPA ←— UI —→ User
                            (/_api/)
                            (/_api/cloudflow/v1.0/trigger/)
```

React SPA giao tiếp với Dataverse qua 2 kênh:
- **Dataverse Web API** (`/_api/<entity>`) — CRUD operations
- **Cloud Flow Triggers** (`/_api/cloudflow/v1.0/trigger/<flowId>`) — Business logic workflows

## 2. Cấu Trúc Thư Mục

```
src/
├── app/                      # App-level configuration
│   ├── providers.tsx         # Provider tree: MSAL → QueryClient → Ant Design → Auth
│   └── router.tsx            # Route definitions (lazy-loaded pages)
│
├── auth/                     # Authentication module
│   ├── msal-config.ts        # MSAL configuration (Azure AD client ID, tenant, scopes)
│   └── AuthProvider.tsx      # Auth context: user info, roles, token acquisition, logout
│
├── api/                      # API layer
│   ├── dataverse-client.ts   # Axios instance — auto-injects Bearer token via interceptor
│   ├── cloudflow-client.ts   # Generic Cloud Flow trigger function
│   └── endpoints/
│       └── purchase-requisition.ts  # CRUD operations cho PR Header & PR Line
│
├── features/                 # Feature modules (self-contained)
│   └── purchase-requisition/ # ✅ Phase 1 — HOÀN THÀNH
│       ├── components/
│       │   ├── PRListPage.tsx    # Danh sách PR
│       │   ├── PRFormPage.tsx    # Tạo/Sửa PR
│       │   ├── PRViewPage.tsx    # Chi tiết PR
│       │   └── PRLineTable.tsx   # Subgrid PR lines
│       ├── hooks/
│       │   └── usePurchaseRequisition.ts  # TanStack Query hooks
│       ├── types.ts          # Interfaces, const enums, Zod schemas
│       └── index.ts          # Barrel exports
│
├── shared/                   # Shared/reusable code
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── AppLayout.tsx     # Main layout: Sidebar + Content area
│   │   │   ├── Sidebar.tsx       # Navigation menu (role-aware)
│   │   │   └── Header.tsx        # Top bar: breadcrumb, user info, logout
│   │   ├── ProtectedRoute.tsx    # Auth guard
│   │   └── NotFoundPage.tsx      # 404 page
│   └── utils/
│       └── constants.ts      # Cloud Flow IDs, entity paths, defaults
│
├── types/                    # Global TypeScript types
│   ├── dataverse.ts          # ODataResponse, ODataParams, DataverseBaseEntity
│   └── auth.ts               # AppRole, AppUser
│
└── styles/                   # Global styles
```

## 3. Entry Point & Provider Tree

```
main.tsx
  └── <StrictMode>
        └── <AppProviders>    (src/app/providers.tsx)
              ├── MSAL Initialize → wait for msalReady
              └── <MsalProvider>
                    └── <QueryClientProvider>   (staleTime: 5 min, retry: 1)
                          └── <ConfigProvider>  (Ant Design: vi_VN locale, custom theme)
                                └── <AntApp>
                                      └── <AuthProvider>    (src/auth/AuthProvider.tsx)
                                            └── <RouterProvider>  (src/app/router.tsx)
```

## 4. Authentication Flow

1. **MSAL v3** khởi tạo → `msalInstance.initialize()`
2. **ProtectedRoute** kiểm tra `isAuthenticated`:
   - Chưa đăng nhập → `loginRedirect()` (tự động redirect tới Azure AD)
   - Đã đăng nhập → kiểm tra role nếu route yêu cầu
3. **AuthProvider** cung cấp context:
   - `user`: thông tin user (id, name, email, roles)
   - `hasRole()`: kiểm tra quyền
   - `getAccessToken()`: lấy token silently (MSAL acquireTokenSilent)
   - `logout()`: redirect logout
4. **Token injection**: `AuthProvider` gọi `setTokenProvider(getAccessToken)` → `dataverse-client.ts` interceptor tự động thêm `Bearer` token vào mọi API call

## 5. API Layer

```
dataverse-client.ts          (Axios instance: baseURL = /_api/, OData headers)
  ├── interceptor: auto Bearer token
  └── endpoints/
        └── purchase-requisition.ts
              ├── prHeaderApi.list(params)       → GET  /_api/balas_purchaserequisitionheaders
              ├── prHeaderApi.get(id, params)     → GET  /_api/balas_purchaserequisitionheaders(guid)
              ├── prHeaderApi.create(data)        → POST /_api/balas_purchaserequisitionheaders
              ├── prHeaderApi.update(id, data)    → PATCH /_api/balas_purchaserequisitionheaders(guid)
              ├── prHeaderApi.delete(id)          → DELETE
              ├── prLineApi.listByHeader(headerId)→ GET  /_api/balas_purchaserequisitionlines?$filter=...
              ├── prLineApi.create(data)          → POST
              ├── prLineApi.update(id, data)      → PATCH
              └── prLineApi.delete(id)            → DELETE

cloudflow-client.ts
  └── triggerCloudFlow(flowId, payload)  → POST /_api/cloudflow/v1.0/trigger/{flowId}
```

### API Object Pattern

Mỗi entity API được tổ chức thành 1 const object:

```typescript
export const entityApi = {
  list: (params?: ODataParams) => dataverseClient.get<ODataResponse<Entity>>(...),
  get: (id: string, params?) => dataverseClient.get<Entity>(...),
  create: (data: CreateEntity) => dataverseClient.post<Entity>(...),
  update: (id: string, data: UpdateEntity) => dataverseClient.patch(...),
  delete: (id: string) => dataverseClient.delete(...),
};
```

## 6. Feature Module Pattern

Mỗi feature module tuân theo cấu trúc tự chứa:

```
features/<module>/
├── components/         # React components (pages + sub-components)
├── hooks/              # TanStack Query hooks (queries + mutations)
├── types.ts            # TypeScript interfaces + Zod schemas
└── index.ts            # Public barrel exports
```

## 7. State Management

| Loại State | Công Cụ | Ví Dụ |
|-----------|---------|-------|
| **Server State** | TanStack Query | `usePRHeaders()`, `usePRHeader(id)`, cache invalidation |
| **Form State** | React Hook Form + Zod | `useForm<PRHeaderFormData>({ resolver: zodResolver(schema) })` |
| **Auth State** | React Context | `useAuth()` → user, roles, token |
| **UI State** | React `useState` | sidebar collapsed, search text, pagination |
| **Routing State** | React Router v7 | `useNavigate()`, `useParams()`, lazy loading |

## 8. Routing

```
/                                → Redirect → /purchase-requisitions
/purchase-requisitions           → PRListPage (lazy loaded)
/purchase-requisitions/new       → PRFormPage mode="create" (lazy loaded)
/purchase-requisitions/:id       → PRViewPage (lazy loaded)
/purchase-requisitions/:id/edit  → PRFormPage mode="edit" (lazy loaded)
*                                → NotFoundPage
```

Tất cả routes nằm trong `<ProtectedRoute>` → yêu cầu Azure AD authentication.

## 9. Dataverse Tables

| Entity | API Path | OData | Dùng Cho |
|--------|----------|-------|----------|
| PR Header | `balas_purchaserequisitionheaders` | ✅ | Purchase Requisition |
| PR Line | `balas_purchaserequisitionlines` | ✅ | PR Line Items |
| Department | `balas_departments` | ✅ | Phòng Ban |
| Approval Matrix | `balas_approvalmatrixes` | ✅ | Ma Trận Phê Duyệt |
| Service Category | `balas_servicecategories` | ✅ | Danh Mục Dịch Vụ |
| Dimension Value | `balas_dimensionvalues` | ✅ | Giá Trị Chiều |
| Site Config | `balas_siteconfigurations` | ✅ | Cấu Hình Site |
| Company | `bcbi_companies` | ❌ | Công Ty (BC sync) |
| Contact | `contacts` | ✅ | Users |
| Account | `accounts` | ✅ | Vendors |

## 10. Cloud Flows

14 Cloud Flows trigger qua `/_api/cloudflow/v1.0/trigger/{flowId}`:

| Tên | Flow Key | Mục Đích |
|-----|----------|----------|
| Budget Control Entry | `budgetControlEntry` | Kiểm tra ngân sách |
| Budget Control Status | `budgetControlStatus` | Trạng thái ngân sách |
| Budget Control | `budgetControl` | Tra cứu ngân sách |
| Request Approval | `requestApproval` | Gửi yêu cầu phê duyệt |
| Reopen | `reopen` | Mở lại PR |
| Cancel Request | `cancelRequest` | Hủy yêu cầu |
| Approve | `approve` | Phê duyệt |
| Reject | `reject` | Từ chối |
| Close PR | `closePR` | Đóng PR |
| Vendor Purchase Price | `vendorPurchasePrice` | Giá mua NCC |
| Special PR | `specialPR` | PR đặc biệt |
| Item UOM | `itemUOM` | Đơn vị đo lường |
| Update Vendor | `updateVendor` | Cập nhật NCC |
| Import Lines | `importLines` | Nhập dòng PR |

Flow IDs được quản lý tập trung tại `src/shared/utils/constants.ts`.

## 11. Role-Based Access Control

| Role | Nguồn | Quyền |
|------|-------|-------|
| `admin` | Azure AD token claims → `roles` | Full access, bao gồm Site Config |
| `local-admin` | Azure AD token claims → `roles` | CRUD departments, contacts, approval matrix |
| `authenticated` | Đăng nhập thành công qua MSAL | Xem/tạo PR, xem budget |

Sidebar tự động ẩn/hiện menu items dựa trên role.
