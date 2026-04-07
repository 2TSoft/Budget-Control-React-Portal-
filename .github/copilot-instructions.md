# Budget Control Portal - React SPA

## Quy tắc chung

- **Ngôn ngữ giao tiếp**: Tiếng Việt (có dấu) cho mọi giải thích và comment
- **Code language**: TypeScript (strict mode)
- **Framework**: React 19 + Vite 8
- **Publisher**: Balas Technologies Co., Ltd.

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
├── features/     # Feature modules (PR, Budget, Department...)
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

## Commit Convention

```
<type>(<scope>): <subject>
```

Types: feat, fix, docs, style, refactor, test, chore

## Dataverse Tables

| Table | Prefix | Purpose |
|-------|--------|---------|
| balas_purchaserequisitionheader | PR | Purchase Requisition |
| balas_purchaserequisitionline | PR | PR Line Items |
| balas_department | Master | Departments |
| balas_approvalmatrix | Master | Approval Matrix |
| balas_servicecategory | Master | Service Categories |
| balas_dimensionvalue | Master | Dimension Values |
| balas_siteconfiguration | Config | Site Settings |
| bcbi_company | Master | Companies |
| contact | User | Contacts/Users |
| account | Master | Vendors |
