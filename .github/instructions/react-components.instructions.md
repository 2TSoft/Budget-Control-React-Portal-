---
description: "Sử dụng khi tạo React components: pages, forms, tables, modals. Áp dụng cho feature modules và shared components."
applyTo: "src/**/*.tsx"
---
# React Component Standards

## Component Structure

```tsx
// 1. Imports (external → internal → types → styles)
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { PRHeader } from './types';

// 2. Types/Interfaces (nếu local)
interface PRListProps {
  companyId?: string;
}

// 3. Component
export function PRList({ companyId }: PRListProps) {
  // hooks trước
  // derived state
  // handlers
  // render
}
```

## Naming

- Components: `PascalCase` (PRList, BudgetCheck)
- Hooks: `useCamelCase` (usePurchaseRequisitions)
- Files: `PascalCase.tsx` cho components, `camelCase.ts` cho utils
- Types: `PascalCase` cho interfaces/types

## Feature Module

```
features/<name>/
├── components/     # UI components
├── hooks/          # Custom hooks (TanStack Query)
├── types.ts        # TypeScript types
└── index.ts        # Public exports
```

## State Management

- **Server state**: TanStack Query - queries, mutations, optimistic updates
- **Form state**: React Hook Form + Zod schemas
- **App state**: React Context (auth, theme, sidebar)
- **Không dùng**: Redux, Zustand, hoặc global state cho server data

## DataTable Pattern

```tsx
// Sử dụng shared DataTable component
<DataTable
  queryKey={['purchaseRequisitions']}
  queryFn={fetchPRs}
  columns={columns}
  searchable
  pagination={{ pageSize: 20 }}
  actions={[
    { label: 'Xem', onClick: (row) => navigate(`/pr/${row.id}`) },
    { label: 'Sửa', onClick: (row) => navigate(`/pr/${row.id}/edit`) },
  ]}
/>
```

## Form Pattern

```tsx
// Sử dụng React Hook Form + Zod
const schema = z.object({
  balas_name: z.string().min(1, 'Tên là bắt buộc'),
  balas_departmentid: z.string().uuid('Chọn phòng ban'),
});

const form = useForm<PRFormData>({
  resolver: zodResolver(schema),
});
```

## Error Handling

- Sử dụng ErrorBoundary cho component-level errors
- TanStack Query `onError` cho API errors
- Toast notifications cho user-facing errors
