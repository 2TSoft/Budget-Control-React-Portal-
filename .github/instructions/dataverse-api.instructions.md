---
description: "Sử dụng khi làm việc với Dataverse Web API, Cloud Flow triggers, CRUD operations, OData queries. Dùng khi tạo API client, endpoints, hooks gọi API."
applyTo: "src/api/**"
---
# Dataverse API Standards

## Dataverse Web API Client

Base URL: `/_api/` (qua Power Pages proxy) hoặc direct Dataverse URL.

```tsx
// src/api/dataverse-client.ts
const dataverseClient = axios.create({
  baseURL: '/_api/',
  headers: { 'Content-Type': 'application/json' },
});
```

## Entity API Endpoints

| Entity | API Path | OData Filter |
|--------|----------|-------------|
| PR Header | `balas_purchaserequisitionheaders` | Có |
| PR Line | `balas_purchaserequisitionlines` | Có |
| Contact | `contacts` | Có |
| Account (Vendor) | `accounts` | Có |
| Department | `balas_departments` | Có |
| Approval Matrix | `balas_approvalmatrixes` | Có |
| Service Category | `balas_servicecategories` | Có |
| Dimension Value | `balas_dimensionvalues` | Có |
| Company | `bcbi_companies` | Không |
| Site Config | `balas_siteconfigurations` | Có |

## CRUD Operations

```tsx
// GET (list)
GET /_api/balas_purchaserequisitionheaders?$select=field1,field2&$filter=statuscode eq 1&$top=20&$orderby=createdon desc

// GET (single)
GET /_api/balas_purchaserequisitionheaders(guid)

// POST (create)
POST /_api/balas_purchaserequisitionheaders
Body: { "balas_name": "PR-001", ... }

// PATCH (update)
PATCH /_api/balas_purchaserequisitionheaders(guid)
Body: { "balas_name": "PR-001-updated" }

// DELETE
DELETE /_api/balas_purchaserequisitionheaders(guid)
```

## Cloud Flow Triggers

```tsx
// src/api/cloudflow-client.ts
async function triggerCloudFlow(flowId: string, payload: unknown) {
  return axios.post(`/_api/cloudflow/v1.0/trigger/${flowId}`, payload);
}
```

### Flow IDs (từ Power Pages config)

```tsx
export const CLOUD_FLOWS = {
  budgetControlEntry: '31ead744-3790-ee11-be37-000d3aa29810',
  budgetControlStatus: '4fead744-3790-ee11-be37-000d3aa29810',
  budgetControl: '20d7c23e-3790-ee11-be37-000d3aa29810',
  requestApproval: '45c84438-3790-ee11-be37-000d3aa29810',
  reopen: '333bf51a-3790-ee11-be37-000d3aa29810',
  cancelRequest: 'f7b6c327-3790-ee11-be37-000d3aa29810',
  approve: '1bb7c327-3790-ee11-be37-000d3aa29810',
  reject: '3915db2d-3790-ee11-be37-000d3aa29810',
  closePR: '14f6c821-3790-ee11-be37-000d3aa29810',
  vendorPurchasePrice: 'b0c42435-c04c-f011-877a-000d3aa25840',
  specialPR: 'eb4ed2dc-f458-f011-bec1-000d3a822442',
  itemUOM: '25cca410-c058-f011-bec2-6045bd5681f2',
  updateVendor: '6d5585b7-4673-f011-b4cd-000d3a85061f',
  importLines: '77661104-2db9-f011-bbd3-6045bd576979',
} as const;
```

## TanStack Query Hooks Pattern

```tsx
// src/features/purchase-requisition/hooks/usePurchaseRequisitions.ts
export function usePurchaseRequisitions(filters?: PRFilters) {
  return useQuery({
    queryKey: ['purchaseRequisitions', filters],
    queryFn: () => fetchPRHeaders(filters),
  });
}

export function useCreatePR() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPRHeader,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchaseRequisitions'] });
    },
  });
}
```

## Lookup Fields

Lookup fields trong Dataverse dùng `_fieldname_value` cho read, `fieldname@odata.bind` cho write:

```tsx
// Read: _balas_departmentid_value
// Write: "balas_departmentid@odata.bind": "/balas_departments(guid)"
```

## Pagination

```tsx
// OData pagination
const response = await dataverseClient.get(url, {
  params: { $top: pageSize, $skip: (page - 1) * pageSize, $count: true }
});
// Total count: response.data['@odata.count']
// Next page: response.data['@odata.nextLink']
```

## Default Currency

```tsx
export const DEFAULT_CURRENCY_ID = '398c296f-7437-f011-b4cd-6045bd599c55';
```
