# Lộ Trình Phát Triển (Roadmap)

## Tổng Quan Tiến Độ

| Phase | Tên | Trạng Thái | Mô Tả |
|-------|-----|-----------|--------|
| 0 | Foundation | ✅ Hoàn thành | Project structure, auth, API clients, layout |
| 1 | Purchase Requisition | ✅ Hoàn thành | CRUD + approval workflow |
| 2 | Master Data | 🔲 Chưa triển khai | Department, Approval Matrix, Contact, Company |
| 3 | Supporting Features | 🔲 Chưa triển khai | Service Category, Vendor, Reports, Site Config |
| 4 | Polish & Deploy | 🔲 Chưa triển khai | Responsive, i18n, testing, CI/CD |

---

## Phase 0: Foundation ✅

- [x] Cấu hình project structure (`src/app`, `auth`, `api`, `features`, `shared`, `types`)
- [x] Cài đặt dependencies (MSAL, TanStack Query, React Router, RHF, Zod, Ant Design, i18n, Axios)
- [x] Setup MSAL authentication (`msal-config.ts`, `AuthProvider.tsx`, `ProtectedRoute.tsx`)
- [x] Tạo Dataverse Web API client (`dataverse-client.ts` — với auto Bearer token)
- [x] Tạo Cloud Flow client (`cloudflow-client.ts`)
- [x] Setup routing + layout components (`AppLayout`, `Sidebar`, `Header`)
- [x] Setup theme + design system (Ant Design 6 + vi_VN locale)
- [x] Tạo global types (`dataverse.ts`, `auth.ts`) & constants (`CLOUD_FLOWS`, `DATAVERSE_ENTITIES`)
- [x] Path alias `@/` → `src/`, `.env.example`

## Phase 1: Purchase Requisition ✅

- [x] PR List page (Table + search + pagination + status tags + delete)
- [x] PR Create form (React Hook Form + Zod validation)
- [x] PR Edit form (prefill data, cùng component PRFormPage)
- [x] PR View page (Descriptions + action buttons theo trạng thái)
- [x] PR Line items subgrid (inline edit table — thêm/sửa/xóa dòng)
- [x] Approval workflow actions (Submit, Approve, Reject, Reopen, Cancel, Close via Cloud Flow)
- [x] Types: PRStatus const + PRHeader/PRLine interfaces + Zod schemas
- [x] API: `prHeaderApi`, `prLineApi` (CRUD)
- [x] Hooks: `usePRHeaders`, `usePRHeader`, `useCreatePR`, `useUpdatePR`, `useDeletePR`, `usePRLines`, `useCreatePRLine`, `useUpdatePRLine`, `useDeletePRLine`, `usePRCloudFlowAction`
- [x] Router: `/purchase-requisitions`, `/purchase-requisitions/new`, `/:id`, `/:id/edit`
- [ ] Budget Check integration (Cloud Flow) — hook có sẵn, chưa có UI
- [ ] Import Lines từ Excel — Phase 3

## Phase 2: Master Data 🔲

### Department CRUD
- [ ] Types: `Department`, `CreateDepartment`, `UpdateDepartment`, Zod schema
- [ ] API: `departmentApi` (list, get, create, update, delete)
- [ ] Hooks: `useDepartments`, `useDepartment`, `useCreateDepartment`, `useUpdateDepartment`, `useDeleteDepartment`
- [ ] Components: `DepartmentListPage`, `DepartmentFormPage`, `DepartmentViewPage`
- [ ] Routes: `/departments`, `/departments/new`, `/departments/:id`, `/departments/:id/edit`
- [ ] Roles: admin, local-admin

### Approval Matrix CRUD
- [ ] Types: `ApprovalMatrix`, `CreateApprovalMatrix`, Zod schema
- [ ] API: `approvalMatrixApi` (CRUD)
- [ ] Hooks: `useApprovalMatrixes`, `useCreateApprovalMatrix`, etc.
- [ ] Components: `ApprovalMatrixListPage`, `ApprovalMatrixFormPage`
- [ ] Routes: `/approval-matrix`, `/approval-matrix/new`, `/approval-matrix/:id/edit`
- [ ] Roles: admin, local-admin

### Contact Management
- [ ] Types: `Contact`, `CreateContact`, Zod schema
- [ ] API: `contactApi` (CRUD)
- [ ] Hooks: `useContacts`, `useContact`, `useCreateContact`, `useUpdateContact`
- [ ] Components: `ContactListPage`, `ContactFormPage`, `ContactViewPage`
- [ ] Routes: `/contacts`, `/contacts/new`, `/contacts/:id`, `/contacts/:id/edit`
- [ ] Roles: admin, local-admin

### Company View
- [ ] Types: `Company` interface
- [ ] API: `companyApi` (list, get) — chỉ read, OData filter KHÔNG hỗ trợ
- [ ] Hooks: `useCompanies`, `useCompany`
- [ ] Components: `CompanyListPage`, `CompanyViewPage` (+ department subgrid)
- [ ] Routes: `/companies`, `/companies/:id`
- [ ] Roles: authenticated

## Phase 3: Supporting Features 🔲

- [ ] Service Category CRUD (admin only)
- [ ] Vendor List — read-only (`accounts`)
- [ ] Dimension Values list — read-only
- [ ] Budget Check UI — sử dụng `useBudgetCheck()` hook đã có
- [ ] Import Lines từ Excel — Cloud Flow `importLines`
- [ ] Reports page
- [ ] Site Configuration — admin only (`balas_siteconfigurations`)

## Phase 4: Polish & Deploy 🔲

- [ ] Responsive design / Mobile optimization
- [ ] Error handling nâng cao & loading states
- [ ] i18n hoàn chỉnh (Tiếng Việt + English)
- [ ] Performance optimization (code splitting, lazy loading, memo)
- [ ] Unit testing + Integration testing
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Build & deploy lên Power Pages

---

## Lưu Ý

- **Ưu tiên hiện tại:** Phase 2 (Master Data modules)
- **Tham chiếu Power Pages:** Code cũ nằm trong `.powerpages-site/` — chỉ đọc, không chỉnh sửa
- **AI-assisted development:** Sử dụng Copilot agents, skills, instructions đã cấu hình để tăng tốc
