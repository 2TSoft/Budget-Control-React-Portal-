# Quy Tắc Đóng Góp (Contributing Guide)

## Ngôn Ngữ

- **Giao tiếp & comment**: Tiếng Việt (có dấu)
- **Code & variable names**: Tiếng Anh
- **Commit messages**: Tiếng Anh (theo convention)

## Coding Standards

### TypeScript

- **Strict mode** — không dùng `any`, luôn define proper types
- **Const object thay cho enum** — do tsconfig có `erasableSyntaxOnly: true`
- **Interface** cho entity models, **type** cho unions/aliases
- **Zod schemas** cho form validation, export cả schema và inferred type

```typescript
// ✅ Đúng — const object + type
export const PRStatus = {
  Draft: 1,
  Submitted: 756150001,
} as const;
export type PRStatus = (typeof PRStatus)[keyof typeof PRStatus];

// ❌ Sai — enum (không hỗ trợ với erasableSyntaxOnly)
export enum PRStatus { Draft = 1, Submitted = 756150001 }
```

### React Components

- **Functional components** + hooks (không dùng class components)
- **Named exports** (`export function PRList`) thay vì default exports
- **Import order**: external → internal → types → styles
- **Component structure**: hooks → derived state → handlers → render

```tsx
// 1. Imports
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { PRHeader } from './types';

// 2. Component
export function PRListPage() {
  // hooks
  const { data, isLoading } = usePRHeaders();
  // derived state
  const total = data?.['@odata.count'] ?? 0;
  // handlers
  const handleDelete = (id: string) => { ... };
  // render
  return <Table ... />;
}
```

### Naming Conventions

| Loại | Convention | Ví Dụ |
|------|-----------|-------|
| Components | PascalCase | `PRListPage`, `BudgetCheck` |
| Hooks | useCamelCase | `usePRHeaders`, `useCreatePR` |
| Files (components) | PascalCase.tsx | `PRListPage.tsx` |
| Files (utils/hooks) | camelCase.ts | `usePurchaseRequisition.ts` |
| Types/Interfaces | PascalCase | `PRHeader`, `CreatePRHeader` |
| Constants | UPPER_SNAKE_CASE | `CLOUD_FLOWS`, `DEFAULT_PAGE_SIZE` |
| API objects | camelCase | `prHeaderApi`, `prLineApi` |

### State Management

| Loại | Công Cụ | Khi Nào |
|------|---------|---------|
| Server state | TanStack Query | Data từ API (queries, mutations, cache) |
| Form state | React Hook Form + Zod | Form inputs, validation |
| Auth state | React Context | User info, roles, token |
| UI state | React `useState` | Local component state |
| **Không dùng** | Redux, Zustand | Không cần global state cho server data |

### API Endpoint Pattern

```typescript
export const entityApi = {
  list: (params?: ODataParams) =>
    dataverseClient.get<ODataResponse<Entity>>(ENTITY_PATH, { params }).then(r => r.data),
  get: (id: string, params?) =>
    dataverseClient.get<Entity>(`${ENTITY_PATH}(${id})`, { params }).then(r => r.data),
  create: (data: CreateEntity) =>
    dataverseClient.post<Entity>(ENTITY_PATH, data).then(r => r.data),
  update: (id: string, data: UpdateEntity) =>
    dataverseClient.patch(`${ENTITY_PATH}(${id})`, data),
  delete: (id: string) =>
    dataverseClient.delete(`${ENTITY_PATH}(${id})`),
};
```

### TanStack Query Hook Pattern

```typescript
// Query hook — tên bắt đầu bằng use + noun (plural cho list, singular cho get)
export function usePRHeaders(params?: ODataParams) {
  return useQuery({
    queryKey: ['prHeaders', params],
    queryFn: () => prHeaderApi.list(params),
  });
}

// Mutation hook — tên bắt đầu bằng use + verb + noun
export function useCreatePR() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePRHeader) => prHeaderApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['prHeaders'] }),
  });
}
```

### Lookup Fields (Dataverse)

```typescript
// Read: _fieldname_value (Dataverse tự thêm prefix _ và suffix _value)
interface Entity {
  _balas_departmentid_value?: string;
  _balas_departmentid_value_Formatted?: string;  // Display name
}

// Write: fieldname@odata.bind (dạng URI reference)
interface CreateEntity {
  'balas_departmentid@odata.bind'?: string;  // "/balas_departments(guid)"
}
```

## Commit Convention

```
<type>(<scope>): <subject>
```

### Types

| Type | Mô Tả |
|------|--------|
| `feat` | Tính năng mới |
| `fix` | Sửa lỗi |
| `docs` | Thay đổi documentation |
| `style` | Format, missing semicolons (không thay đổi logic) |
| `refactor` | Refactor code (không thêm feature/fix bug) |
| `test` | Thêm hoặc sửa tests |
| `chore` | Thay đổi build process, dependencies, configs |

### Scope (tùy chọn)

Tên module hoặc area: `pr`, `auth`, `api`, `layout`, `docs`, `config`

### Ví Dụ

```
feat(pr): add PR line items inline editing
fix(auth): handle token refresh failure gracefully
docs: update architecture documentation
chore: upgrade antd to v6.3.5
refactor(api): extract common CRUD pattern
```

## Branch Strategy

- `main` — production branch
- `feature/<name>` — feature branches
- `fix/<name>` — bug fix branches
- `docs/<name>` — documentation changes

## Pull Request

1. Tạo branch từ `main`
2. Implement changes
3. Chạy `npm run lint` và `npm run build` trước khi commit
4. Tạo PR với mô tả rõ ràng
5. Chờ review và merge
