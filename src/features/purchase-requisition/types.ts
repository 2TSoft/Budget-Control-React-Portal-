import type { DataverseBaseEntity } from '../../types/dataverse';

// ============================================================
// Enums - map từ Dataverse option sets
// Dùng const object thay vì enum vì tsconfig có erasableSyntaxOnly
// ============================================================

export const PRStatus = {
  Draft: 1,
  Submitted: 756150001,
  InProgress: 756150002,
  Approved: 756150003,
  Rejected: 756150004,
  Cancelled: 756150005,
  Closed: 756150006,
} as const;
export type PRStatus = (typeof PRStatus)[keyof typeof PRStatus];

export const PRLineStatus = {
  Open: 1,
  Closed: 756150001,
} as const;
export type PRLineStatus = (typeof PRLineStatus)[keyof typeof PRLineStatus];

// ============================================================
// PR Header
// ============================================================

export interface PRHeader extends DataverseBaseEntity {
  balas_purchaserequisitionheaderid: string;
  balas_name: string;
  balas_description?: string;
  balas_requestdate?: string;
  balas_requireddate?: string;
  statuscode?: PRStatus;
  statecode?: number;

  // Lookups (read: _*_value)
  _balas_departmentid_value?: string;
  _balas_departmentid_value_Formatted?: string;
  _balas_companyid_value?: string;
  _balas_companyid_value_Formatted?: string;
  _ownerid_value?: string;
  _ownerid_value_Formatted?: string;

  // Computed
  statuscode_Formatted?: string;
}

export interface CreatePRHeader {
  balas_name: string;
  balas_description?: string;
  balas_requestdate?: string;
  balas_requireddate?: string;
  'balas_departmentid@odata.bind'?: string;
  'balas_companyid@odata.bind'?: string;
}

export type UpdatePRHeader = Partial<CreatePRHeader>;

// ============================================================
// PR Line
// ============================================================

export interface PRLine extends DataverseBaseEntity {
  balas_purchaserequisitionlineid: string;
  balas_name: string;
  balas_linenumber?: number;
  balas_description?: string;
  balas_quantity?: number;
  balas_unitprice?: number;
  balas_totalamount?: number;
  balas_uom?: string;
  statuscode?: PRLineStatus;

  // Lookups
  _balas_purchaserequisitionheaderid_value?: string;
  _balas_servicecategoryid_value?: string;
  _balas_servicecategoryid_value_Formatted?: string;
  _balas_vendorid_value?: string;
  _balas_vendorid_value_Formatted?: string;
  _transactioncurrencyid_value?: string;
}

export interface CreatePRLine {
  balas_name: string;
  balas_linenumber?: number;
  balas_description?: string;
  balas_quantity?: number;
  balas_unitprice?: number;
  balas_uom?: string;
  'balas_purchaserequisitionheaderid@odata.bind': string;
  'balas_servicecategoryid@odata.bind'?: string;
  'balas_vendorid@odata.bind'?: string;
  'transactioncurrencyid@odata.bind'?: string;
}

export type UpdatePRLine = Partial<Omit<CreatePRLine, 'balas_purchaserequisitionheaderid@odata.bind'>>;

// ============================================================
// Zod schemas (dùng cho React Hook Form)
// ============================================================

import { z } from 'zod';

export const prHeaderSchema = z.object({
  balas_name: z.string().min(1, 'Tên PR là bắt buộc'),
  balas_description: z.string().optional(),
  balas_requestdate: z.string().optional(),
  balas_requireddate: z.string().optional(),
  balas_departmentid: z.string().optional(),
  balas_companyid: z.string().optional(),
});

export type PRHeaderFormData = z.infer<typeof prHeaderSchema>;

export const prLineSchema = z.object({
  balas_name: z.string().min(1, 'Tên dòng là bắt buộc'),
  balas_description: z.string().optional(),
  balas_quantity: z.number({ error: 'Số lượng phải là số' }).positive('Số lượng phải > 0').optional(),
  balas_unitprice: z.number({ error: 'Đơn giá phải là số' }).nonnegative().optional(),
  balas_uom: z.string().optional(),
  balas_servicecategoryid: z.string().optional(),
  balas_vendorid: z.string().optional(),
});

export type PRLineFormData = z.infer<typeof prLineSchema>;
