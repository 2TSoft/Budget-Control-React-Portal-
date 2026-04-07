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

- Components: `PascalCase` (PRListPage, BudgetCheck)
- Hooks: `useCamelCase` (usePurchaseRequisitions)
- Files: `PascalCase.tsx` cho components, `camelCase.ts` cho utils
- Types: `PascalCase` cho interfaces/types
- Page components: `<Name>Page` suffix (PRListPage, PRFormPage, PRViewPage)

## Feature Module

```
features/<name>/
├── components/     # UI components
│   ├── <Name>ListPage.tsx    # Danh sách (Table + search + pagination)
│   ├── <Name>FormPage.tsx    # Tạo/Sửa (React Hook Form + Zod, dynamic mode)
│   └── <Name>ViewPage.tsx    # Xem chi tiết (Descriptions + action buttons)
├── hooks/          # Custom hooks (TanStack Query)
│   └── use<Name>.ts
├── types.ts        # TypeScript types + Zod schemas
└── index.ts        # Public exports
```

## State Management

- **Server state**: TanStack Query - queries, mutations, cache invalidation
- **Form state**: React Hook Form + Zod schemas
- **App state**: React Context (auth, theme, sidebar)
- **Không dùng**: Redux, Zustand, hoặc global state cho server data

## List Page Pattern (tham chiếu PRListPage)

```tsx
export function EntityListPage() {
  const [searchText, setSearchText] = useState('');
  const { data, isLoading } = useEntities({ $filter: ... });
  const deleteMutation = useDeleteEntity();
  const navigate = useNavigate();

  const columns: ColumnsType<Entity> = [
    { title: 'Tên', dataIndex: 'entity_name', sorter: true },
    { title: 'Trạng thái', dataIndex: 'statuscode',
      render: (status) => <Tag color={STATUS_COLOR[status]}>{status_Formatted}</Tag> },
    { title: 'Thao tác',
      render: (_, record) => (
        <Space>
          <Button onClick={() => navigate(`/entities/${record.id}`)}>Xem</Button>
          <Popconfirm onConfirm={() => deleteMutation.mutate(record.id)}>
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Input.Search onSearch={setSearchText} />
        <Button type="primary" onClick={() => navigate('/entities/new')}>Tạo mới</Button>
      </div>
      <Table columns={columns} dataSource={data?.value} loading={isLoading} />
    </div>
  );
}
```

## Form Page Pattern (tham chiếu PRFormPage)

```tsx
export function EntityFormPage() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { data: entity } = useEntity(id);
  const createMutation = useCreateEntity();
  const updateMutation = useUpdateEntity();

  const { control, handleSubmit, reset } = useForm<EntityFormData>({
    resolver: zodResolver(entitySchema),
  });

  useEffect(() => {
    if (entity && isEditMode) reset(mapEntityToForm(entity));
  }, [entity]);

  const onSubmit = (formData: EntityFormData) => {
    const payload = mapFormToPayload(formData);
    if (isEditMode) {
      updateMutation.mutate({ id: id!, data: payload }, { onSuccess: () => navigate(-1) });
    } else {
      createMutation.mutate(payload, { onSuccess: () => navigate('/entities') });
    }
  };

  return <Form onFinish={handleSubmit(onSubmit)}>...</Form>;
}
```

## Form Pattern (Zod + React Hook Form)

```tsx
// Sử dụng React Hook Form + Zod
const schema = z.object({
  balas_name: z.string().min(1, 'Tên là bắt buộc'),
  balas_departmentid: z.string().optional(),
});

const form = useForm<EntityFormData>({
  resolver: zodResolver(schema),
});
```

## Error Handling

- Sử dụng ErrorBoundary cho component-level errors
- TanStack Query `onError` cho API errors
- Toast notifications (Ant Design `message` / `notification`) cho user-facing errors
