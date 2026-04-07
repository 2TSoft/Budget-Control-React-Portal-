---
name: feature-scaffold
description: "Scaffold một feature module hoàn chỉnh cho React SPA từ Dataverse entity. Sử dụng khi cần tạo toàn bộ files cho một feature mới: types, API, hooks, components (List, Form, View)."
argument-hint: "Tên feature module cần tạo, ví dụ: department, approval-matrix, contact, company"
---

# Feature Module Scaffolding

## Khi nào sử dụng
- Tạo feature module mới cho một Dataverse entity
- Cần tạo đầy đủ: types, API endpoints, hooks, components
- Áp dụng cho Phase 2+ modules

## Quy trình

### Bước 1: Thu thập thông tin
1. Xem `docs/2-FEATURES.md` để biết entity, routes, roles
2. Xem `docs/1-ARCHITECTURE.md` để hiểu patterns
3. Xem `src/shared/utils/constants.ts` để biết entity API path (DATAVERSE_ENTITIES)
4. Tham chiếu `src/features/purchase-requisition/` làm mẫu chuẩn

### Bước 2: Tạo TypeScript Types
Tạo file `src/features/<module>/types.ts`:

```typescript
import type { DataverseBaseEntity } from '../../types/dataverse';
import { z } from 'zod';

// Const object cho option sets (KHÔNG dùng enum)
export const EntityStatus = { Active: 1, Inactive: 2 } as const;
export type EntityStatus = (typeof EntityStatus)[keyof typeof EntityStatus];

// Read model
export interface Entity extends DataverseBaseEntity {
  entity_entityid: string;
  entity_name: string;
  // Lookups: _fieldname_value, _fieldname_value_Formatted
}

// Write model (lookups dùng @odata.bind)
export interface CreateEntity {
  entity_name: string;
  'entity_lookupid@odata.bind'?: string;  // "/related_entities(guid)"
}

// Update model
export type UpdateEntity = Partial<CreateEntity>;

// Zod schema
export const entitySchema = z.object({
  entity_name: z.string().min(1, 'Tên là bắt buộc'),
});
export type EntityFormData = z.infer<typeof entitySchema>;
```

### Bước 3: Tạo API Endpoints
Tạo file `src/api/endpoints/<entity>.ts`:

```typescript
import dataverseClient from '../dataverse-client';
import { DATAVERSE_ENTITIES } from '../../shared/utils/constants';
import type { ODataParams, ODataResponse } from '../../types/dataverse';
import type { Entity, CreateEntity, UpdateEntity } from '../../features/<module>/types';

const ENTITY_PATH = DATAVERSE_ENTITIES.<entityKey>;

export const entityApi = {
  list: (params?: ODataParams) =>
    dataverseClient.get<ODataResponse<Entity>>(ENTITY_PATH, { params: { $count: true, ...params } }).then(r => r.data),
  get: (id: string, params?: Pick<ODataParams, '$select' | '$expand'>) =>
    dataverseClient.get<Entity>(`${ENTITY_PATH}(${id})`, { params }).then(r => r.data),
  create: (data: CreateEntity) =>
    dataverseClient.post<Entity>(ENTITY_PATH, data).then(r => r.data),
  update: (id: string, data: UpdateEntity) =>
    dataverseClient.patch(`${ENTITY_PATH}(${id})`, data),
  delete: (id: string) =>
    dataverseClient.delete(`${ENTITY_PATH}(${id})`),
};
```

### Bước 4: Tạo Hooks
Tạo file `src/features/<module>/hooks/use<Name>.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { entityApi } from '../../../api/endpoints/<entity>';
import { DEFAULT_PAGE_SIZE } from '../../../shared/utils/constants';
import type { ODataParams } from '../../../types/dataverse';
import type { CreateEntity, UpdateEntity } from '../types';

export function useEntities(params?: ODataParams) {
  return useQuery({
    queryKey: ['entities', params],
    queryFn: () => entityApi.list({ $orderby: 'createdon desc', $top: DEFAULT_PAGE_SIZE, ...params }),
  });
}

export function useEntity(id: string | undefined) {
  return useQuery({
    queryKey: ['entity', id],
    queryFn: () => entityApi.get(id!),
    enabled: !!id,
  });
}

export function useCreateEntity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEntity) => entityApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['entities'] }),
  });
}

export function useUpdateEntity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEntity }) => entityApi.update(id, data),
    onSuccess: (_r, { id }) => {
      qc.invalidateQueries({ queryKey: ['entities'] });
      qc.invalidateQueries({ queryKey: ['entity', id] });
    },
  });
}

export function useDeleteEntity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => entityApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['entities'] }),
  });
}
```

### Bước 5: Tạo Components
- `<Name>ListPage.tsx` — Ant Design Table + search + pagination + actions
- `<Name>FormPage.tsx` — React Hook Form + Zod, support create & edit mode
- `<Name>ViewPage.tsx` — Ant Design Descriptions + action buttons

### Bước 6: Tạo barrel exports + Router + Sidebar
- Tạo `src/features/<module>/index.ts`
- Thêm lazy-loaded routes vào `src/app/router.tsx`
- Thêm menu item vào `src/shared/components/Layout/Sidebar.tsx`

## Template cấu trúc output

```
src/features/<module-name>/
├── components/
│   ├── <Name>ListPage.tsx
│   ├── <Name>FormPage.tsx
│   └── <Name>ViewPage.tsx
├── hooks/
│   └── use<Name>.ts
├── types.ts
└── index.ts

src/api/endpoints/
└── <entity>.ts
```

## Tham khảo
- **Mẫu chuẩn (Phase 1):** `src/features/purchase-requisition/` — full implementation
- **Feature details:** `docs/2-FEATURES.md`
- **Architecture:** `docs/1-ARCHITECTURE.md`
- **Contributing:** `docs/4-CONTRIBUTING.md`
