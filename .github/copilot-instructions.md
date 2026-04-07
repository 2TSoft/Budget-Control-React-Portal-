# Budget Control Portal - React SPA

## Quy tắc chung

- **Ngôn ngữ giao tiếp**: Tiếng Việt (có dấu) cho mọi giải thích và comment
- **Code language**: TypeScript (strict mode)
- **Framework**: React 19 + Vite 8
- **Publisher**: Balas Technologies Co., Ltd.
- **Documentation**: Xem `docs/` cho tài liệu chi tiết (0-README → 6-DEPLOYMENT)

## Kiến trúc

```
Business Central <--API--> Dataverse <--Web API--> React SPA <--UI--> User
```

- Backend: Dataverse Web API (`/_api/`) + Power Automate Cloud Flow (`/_api/cloudflow/v1.0/trigger/`)
- Frontend: React SPA với feature-based architecture
- Auth: Azure AD via MSAL.js v3

## Cấu trúc thư mục

```
src/
├── app/          # App config, router, providers
├── auth/         # MSAL authentication
├── api/          # Dataverse & CloudFlow clients
│   └── endpoints/    # Entity-specific CRUD (prHeaderApi, prLineApi...)
├── features/     # Feature modules (self-contained)
│   └── purchase-requisition/  # ✅ Hoàn thành
├── shared/       # Shared components, hooks, utils
├── types/        # Global TypeScript types
└── styles/       # Theme & global styles
```

## Coding Standards

- Sử dụng functional components + hooks
- State management: TanStack Query cho server state, React Context cho app state
- Forms: React Hook Form + Zod validation
- Naming: PascalCase cho components, camelCase cho functions/variables
- Mỗi feature module tự chứa: components/, hooks/, types.ts, index.ts
- Export public API qua index.ts barrel files
- Không dùng `any` - luôn define proper TypeScript types
- Dùng `const object as const` thay vì `enum` (do tsconfig erasableSyntaxOnly)

## Established Patterns (Phase 1)

### API Endpoint Object

```typescript
// Mỗi entity 1 const object chứa CRUD methods
export const entityApi = {
  list: (params?) => dataverseClient.get<ODataResponse<Entity>>(PATH, { params }).then(r => r.data),
  get: (id, params?) => dataverseClient.get<Entity>(`${PATH}(${id})`, { params }).then(r => r.data),
  create: (data) => dataverseClient.post<Entity>(PATH, data).then(r => r.data),
  update: (id, data) => dataverseClient.patch(`${PATH}(${id})`, data),
  delete: (id) => dataverseClient.delete(`${PATH}(${id})`),
};
```

### TanStack Query Hook Naming

```typescript
// Queries: use + Noun (plural/singular)
usePRHeaders(params?)        // list
usePRHeader(id)              // get single

// Mutations: use + Verb + Noun
useCreatePR()                // create
useUpdatePR()                // update
useDeletePR()                // delete

// Cloud Flow: use + Action + Noun
useSubmitPR()                // trigger cloud flow
useApprovePR()
```

### Type Pattern

```typescript
// Read model — extends DataverseBaseEntity
interface PRHeader extends DataverseBaseEntity { ... }

// Write model — separate interface with @odata.bind for lookups
interface CreatePRHeader { ..., 'balas_departmentid@odata.bind'?: string }

// Update model — Partial of Create
type UpdatePRHeader = Partial<CreatePRHeader>;

// Zod schema — form validation
const prHeaderSchema = z.object({ ... });
type PRHeaderFormData = z.infer<typeof prHeaderSchema>;
```

## Commit Convention

```
<type>(<scope>): <subject>
```

Types: feat, fix, docs, style, refactor, test, chore

## Dataverse Tables

| Table | API Path | Prefix | Purpose |
|-------|----------|--------|---------|
| balas_purchaserequisitionheader | `balas_purchaserequisitionheaders` | PR | Purchase Requisition |
| balas_purchaserequisitionline | `balas_purchaserequisitionlines` | PR | PR Line Items |
| balas_department | `balas_departments` | Master | Departments |
| balas_approvalmatrix | `balas_approvalmatrixes` | Master | Approval Matrix |
| balas_servicecategory | `balas_servicecategories` | Master | Service Categories |
| balas_dimensionvalue | `balas_dimensionvalues` | Master | Dimension Values |
| balas_siteconfiguration | `balas_siteconfigurations` | Config | Site Settings |
| bcbi_company | `bcbi_companies` | Master | Companies (OData filter OFF) |
| contact | `contacts` | User | Contacts/Users |
| account | `accounts` | Master | Vendors |
