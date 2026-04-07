# Tính Năng & Modules (Features)

## Tổng Quan Modules

| # | Module | Mô Tả | Trạng Thái |
|---|--------|--------|-----------|
| 1 | **Authentication** | Azure AD login, role-based access | ✅ Hoàn thành |
| 2 | **Purchase Requisition** | CRUD + approval workflow | ✅ Hoàn thành |
| 3 | **Budget Check** | Tra cứu ngân sách qua Cloud Flow | 🔲 Hook có sẵn, chưa có UI |
| 4 | **Department** | Quản lý phòng ban | 🔲 Phase 2 |
| 5 | **Approval Matrix** | Ma trận phê duyệt | 🔲 Phase 2 |
| 6 | **Contact Management** | Quản lý user/contact | 🔲 Phase 2 |
| 7 | **Company** | Xem công ty + department subgrid | 🔲 Phase 2 |
| 8 | **Service Category** | Danh mục dịch vụ | 🔲 Phase 3 |
| 9 | **Vendor List** | Danh sách nhà cung cấp (read-only) | 🔲 Phase 3 |
| 10 | **Dimension Values** | Danh sách giá trị chiều | 🔲 Phase 3 |
| 11 | **Reports** | Báo cáo | 🔲 Phase 3 |
| 12 | **Site Config** | Cấu hình hệ thống (Admin only) | 🔲 Phase 3 |

---

## Module Chi Tiết

### 1. Authentication (Phase 0) ✅

**Công nghệ:** MSAL.js v3 + Azure AD

- Đăng nhập tự động qua Azure AD (`loginRedirect`)
- Token acquisition silent (`acquireTokenSilent`)
- Role-based access control (admin, local-admin, authenticated)
- `ProtectedRoute` component bao bọc tất cả routes
- `AuthProvider` context cung cấp user info, roles, token

**Files:**
- `src/auth/msal-config.ts` — MSAL configuration
- `src/auth/AuthProvider.tsx` — Auth context provider
- `src/shared/components/ProtectedRoute.tsx` — Route guard

### 2. Purchase Requisition (Phase 1) ✅

**Dataverse Tables:** `balas_purchaserequisitionheader`, `balas_purchaserequisitionline`

#### Trang Danh Sách (PRListPage)
- Ant Design Table với search, pagination, sorting
- Status tags với màu sắc theo trạng thái
- Actions: Xem, Sửa, Xóa
- Nút Tạo Mới

#### Trang Tạo/Sửa (PRFormPage)
- React Hook Form + Zod validation
- Dynamic mode: create hoặc edit (cùng component)
- Lookup fields cho Department, Company
- Auto-save hoặc submit

#### Trang Xem Chi Tiết (PRViewPage)
- Ant Design Descriptions hiển thị thông tin header
- Action buttons theo trạng thái PR:
  - Draft → Submit, Edit, Delete
  - Submitted → Cancel
  - InProgress → Approve, Reject (admin/approver)
  - Approved → Close
  - Rejected → Reopen
  - Cancelled → Reopen

#### PR Line Items (PRLineTable)
- Subgrid trong PRViewPage và PRFormPage
- Inline add/edit/delete rows
- Columns: Tên, Mô tả, Số lượng, Đơn giá, Thành tiền, ĐVT, NCC

#### Approval Workflow
- Sử dụng Cloud Flow triggers:
  - `requestApproval` — Gửi yêu cầu phê duyệt
  - `approve` — Phê duyệt
  - `reject` — Từ chối
  - `reopen` — Mở lại
  - `cancelRequest` — Hủy yêu cầu
  - `closePR` — Đóng PR

**PR Status Flow:**

```
Draft → Submitted → InProgress → Approved → Closed
                  ↘            ↘
                  Cancelled   Rejected → (Reopen) → Draft
```

**Files:**
- `src/features/purchase-requisition/components/` — 4 components
- `src/features/purchase-requisition/hooks/usePurchaseRequisition.ts` — Query hooks
- `src/features/purchase-requisition/types.ts` — Types + Zod schemas
- `src/api/endpoints/purchase-requisition.ts` — API CRUD

### 3. Budget Check (Phase 1 — partial) 🔲

**Hook có sẵn:** `useBudgetCheck()` trong `usePurchaseRequisition.ts`
**Cloud Flows:** `budgetControlEntry`, `budgetControlStatus`, `budgetControl`
**Cần làm:** UI component BudgetCheck, BudgetStatus

### 4. Department (Phase 2) 🔲

**Dataverse Table:** `balas_departments`
**Chức năng:** CRUD phòng ban
**Roles:** admin, local-admin
**Routes:** `/departments`, `/departments/new`, `/departments/:id`, `/departments/:id/edit`

### 5. Approval Matrix (Phase 2) 🔲

**Dataverse Table:** `balas_approvalmatrixes`
**Chức năng:** CRUD ma trận phê duyệt (ai phê duyệt PR nào, theo Department + Amount)
**Roles:** admin, local-admin
**Routes:** `/approval-matrix`, `/approval-matrix/new`, `/approval-matrix/:id/edit`

### 6. Contact Management (Phase 2) 🔲

**Dataverse Table:** `contacts`
**Chức năng:** CRUD users/contacts, gán roles, quản lý portal access
**Roles:** admin, local-admin
**Routes:** `/contacts`, `/contacts/new`, `/contacts/:id`, `/contacts/:id/edit`

### 7. Company (Phase 2) 🔲

**Dataverse Table:** `bcbi_companies`
**Chức năng:** Xem danh sách công ty + department subgrid
**Roles:** authenticated
**Routes:** `/companies`, `/companies/:id`
**Lưu ý:** OData filter KHÔNG được hỗ trợ cho table này

### 8. Service Category (Phase 3) 🔲

**Dataverse Table:** `balas_servicecategories`
**Chức năng:** CRUD danh mục dịch vụ
**Roles:** admin
**Routes:** `/service-categories`, `/service-categories/new`, `/service-categories/:id/edit`

### 9. Vendor List (Phase 3) 🔲

**Dataverse Table:** `accounts`
**Chức năng:** Danh sách nhà cung cấp (read-only)
**Roles:** authenticated
**Routes:** `/vendors`

### 10. Site Config (Phase 3) 🔲

**Dataverse Table:** `balas_siteconfigurations`
**Chức năng:** Cấu hình hệ thống
**Roles:** admin only
**Routes:** `/config`
