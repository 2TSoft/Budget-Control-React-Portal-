---
description: "Instructions cho Phase 2 Master Data modules: Department, Approval Matrix, Contact, Company. Áp dụng khi tạo hoặc sửa các feature modules này."
applyTo: "src/features/{department,approval-matrix,contact,company}/**"
---
# Phase 2: Master Data Modules

## Tổng Quan

Phase 2 bao gồm 4 module Master Data. Tất cả tuân theo patterns đã establish trong Phase 1 (Purchase Requisition).

**Tham chiếu chuẩn:** `src/features/purchase-requisition/` — copy pattern, thay đổi entity.

## Module 1: Department

**Dataverse Table:** `balas_departments`
**API Path:** `DATAVERSE_ENTITIES.department`
**Roles:** admin, local-admin

### Routes

```
/departments           → DepartmentListPage
/departments/new       → DepartmentFormPage (create)
/departments/:id       → DepartmentViewPage
/departments/:id/edit  → DepartmentFormPage (edit)
```

### Key Fields (dự kiến)

- `balas_departmentid` (PK)
- `balas_name` (tên phòng ban)
- `balas_code` (mã phòng ban)
- `_balas_companyid_value` (lookup → Company)
- `statuscode`, `statecode`

## Module 2: Approval Matrix

**Dataverse Table:** `balas_approvalmatrixes`
**API Path:** `DATAVERSE_ENTITIES.approvalMatrix`
**Roles:** admin, local-admin

### Routes

```
/approval-matrix           → ApprovalMatrixListPage
/approval-matrix/new       → ApprovalMatrixFormPage (create)
/approval-matrix/:id/edit  → ApprovalMatrixFormPage (edit)
```

### Key Fields (dự kiến)

- `balas_approvalmatrixid` (PK)
- `balas_name`
- `_balas_departmentid_value` (lookup → Department)
- `balas_minamount`, `balas_maxamount` (ngưỡng phê duyệt)
- `_balas_approverid_value` (lookup → Contact)

## Module 3: Contact Management

**Dataverse Table:** `contacts`
**API Path:** `DATAVERSE_ENTITIES.contact`
**Roles:** admin, local-admin

### Routes

```
/contacts           → ContactListPage
/contacts/new       → ContactFormPage (create)
/contacts/:id       → ContactViewPage
/contacts/:id/edit  → ContactFormPage (edit)
```

### Key Fields

- `contactid` (PK)
- `fullname`, `firstname`, `lastname`
- `emailaddress1`
- `telephone1`
- `_parentcustomerid_value` (lookup → Account/Company)

## Module 4: Company

**Dataverse Table:** `bcbi_companies`
**API Path:** `DATAVERSE_ENTITIES.company`
**Roles:** authenticated
**⚠️ OData filter KHÔNG hỗ trợ** — load toàn bộ, filter client-side

### Routes

```
/companies           → CompanyListPage
/companies/:id       → CompanyViewPage (+ department subgrid)
```

### Lưu Ý Đặc Biệt

- Chỉ có List + View (KHÔNG có Create/Edit/Delete — data sync từ BC)
- CompanyViewPage cần hiển thị department subgrid:
  ```typescript
  useDepartments({ $filter: `_balas_companyid_value eq ${companyId}` })
  ```

## Checklist Cho Mỗi Module

1. [ ] `src/features/<module>/types.ts` — Interfaces + Zod schema
2. [ ] `src/api/endpoints/<entity>.ts` — API CRUD object
3. [ ] `src/features/<module>/hooks/use<Name>.ts` — TanStack Query hooks
4. [ ] `src/features/<module>/components/<Name>ListPage.tsx`
5. [ ] `src/features/<module>/components/<Name>FormPage.tsx` (nếu có)
6. [ ] `src/features/<module>/components/<Name>ViewPage.tsx` (nếu có)
7. [ ] `src/features/<module>/index.ts` — Barrel exports
8. [ ] Routes trong `src/app/router.tsx`
9. [ ] Menu item trong `src/shared/components/Layout/Sidebar.tsx`
