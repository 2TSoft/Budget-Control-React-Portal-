---
name: feature-scaffold
description: "Scaffold một feature module hoàn chỉnh cho React SPA từ Dataverse entity. Sử dụng khi cần tạo toàn bộ files cho một feature mới: types, API, hooks, components (List, Form, View)."
argument-hint: "Tên feature module cần tạo, ví dụ: purchase-requisition, department, approval-matrix"
---

# Feature Module Scaffolding

## Khi nào sử dụng
- Tạo feature module mới cho một Dataverse entity
- Migrate một module từ Power Pages sang React
- Cần tạo đầy đủ: types, API endpoints, hooks, components

## Quy trình

### Bước 1: Thu thập thông tin
1. Đọc form YAML configs trong `purchaserequisition---site-q342v2/basic-forms/` để biết fields
2. Đọc list YAML configs trong `purchaserequisition---site-q342v2/lists/` để biết columns, actions
3. Xem table permissions để biết access control
4. Xem `docs/migration-plan.md` để biết Cloud Flow IDs

### Bước 2: Tạo TypeScript Types
Tạo file `src/features/<module>/types.ts`:
- Interface cho entity (read model)
- Interface cho create/update payload (write model)
- Enum cho status/option fields
- Zod schema cho form validation

### Bước 3: Tạo API Endpoints
Tạo file `src/api/endpoints/<entity>.ts`:
- CRUD functions sử dụng `dataverseClient`
- Cloud Flow trigger functions nếu cần
- OData query params support

### Bước 4: Tạo Hooks
Tạo file `src/features/<module>/hooks/use<Name>.ts`:
- `useQuery` cho list/get operations
- `useMutation` cho create/update/delete
- Custom hooks cho Cloud Flow operations (approval, budget check...)

### Bước 5: Tạo Components

#### List Component (`<Name>List.tsx`)
- Sử dụng shared DataTable
- Search, pagination, sorting
- Row actions (View, Edit, Delete)
- Create button
- Map từ Entity List config

#### Form Component (`<Name>Form.tsx`)
- React Hook Form + Zod validation
- Support cả create và edit mode
- Lookup fields → Select/Autocomplete
- File attachments nếu cần
- Map từ Basic Form config

#### View Component (`<Name>View.tsx`)
- Read-only display
- Related data sections
- Action buttons (Edit, Back)
- Map từ Basic Form (Read) config

### Bước 6: Tạo barrel exports
Tạo file `src/features/<module>/index.ts`

## Template cấu trúc output

```
src/features/<module-name>/
├── components/
│   ├── <Name>List.tsx
│   ├── <Name>Form.tsx    
│   └── <Name>View.tsx    
├── hooks/
│   └── use<Name>.ts
├── types.ts
└── index.ts
```

## Tham khảo
- Migration Plan: `docs/migration-plan.md`
- React Component Standards: `.github/instructions/react-components.instructions.md`
- Dataverse API Standards: `.github/instructions/dataverse-api.instructions.md`
- Power Pages source: `purchaserequisition---site-q342v2/`
