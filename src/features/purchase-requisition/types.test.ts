import { describe, it, expect } from 'vitest';
import {
  PRStatus,
  PRLineStatus,
  prHeaderSchema,
  prLineSchema,
} from './types';

// ============================================================
// PR Status constants
// ============================================================

describe('PRStatus', () => {
  it('chứa tất cả status values', () => {
    expect(PRStatus.Draft).toBe(1);
    expect(PRStatus.Submitted).toBe(756150001);
    expect(PRStatus.InProgress).toBe(756150002);
    expect(PRStatus.Approved).toBe(756150003);
    expect(PRStatus.Rejected).toBe(756150004);
    expect(PRStatus.Cancelled).toBe(756150005);
    expect(PRStatus.Closed).toBe(756150006);
  });

  it('có đúng 7 statuses', () => {
    expect(Object.keys(PRStatus)).toHaveLength(7);
  });

  it('tất cả values là unique', () => {
    const values = Object.values(PRStatus);
    const uniqueValues = new Set(values);
    expect(uniqueValues.size).toBe(values.length);
  });
});

describe('PRLineStatus', () => {
  it('chứa Open và Closed', () => {
    expect(PRLineStatus.Open).toBe(1);
    expect(PRLineStatus.Closed).toBe(756150001);
  });
});

// ============================================================
// Zod Schemas validation
// ============================================================

describe('prHeaderSchema', () => {
  it('validate dữ liệu hợp lệ', () => {
    const validData = {
      balas_name: 'PR-001',
      balas_description: 'Test PR',
      balas_requestdate: '2024-01-01',
      balas_requireddate: '2024-01-15',
      balas_departmentid: '12345678-1234-1234-1234-123456789012',
      balas_companyid: '12345678-1234-1234-1234-123456789012',
    };
    const result = prHeaderSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('chỉ yêu cầu balas_name', () => {
    const minimalData = { balas_name: 'PR-001' };
    const result = prHeaderSchema.safeParse(minimalData);
    expect(result.success).toBe(true);
  });

  it('reject khi thiếu balas_name', () => {
    const result = prHeaderSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it('reject khi balas_name rỗng', () => {
    const result = prHeaderSchema.safeParse({ balas_name: '' });
    expect(result.success).toBe(false);
  });

  it('cho phép tất cả fields optional trừ name', () => {
    const result = prHeaderSchema.safeParse({
      balas_name: 'PR-002',
      balas_description: undefined,
      balas_requestdate: undefined,
    });
    expect(result.success).toBe(true);
  });
});

describe('prLineSchema', () => {
  it('validate dữ liệu hợp lệ', () => {
    const validData = {
      balas_name: 'Line 1',
      balas_description: 'Mô tả dòng',
      balas_quantity: 10,
      balas_unitprice: 100.5,
      balas_uom: 'EA',
    };
    const result = prLineSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('chỉ yêu cầu balas_name', () => {
    const result = prLineSchema.safeParse({ balas_name: 'Line 1' });
    expect(result.success).toBe(true);
  });

  it('reject khi thiếu balas_name', () => {
    const result = prLineSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it('reject khi quantity <= 0', () => {
    const result = prLineSchema.safeParse({
      balas_name: 'Line 1',
      balas_quantity: -5,
    });
    expect(result.success).toBe(false);
  });

  it('reject khi unitprice < 0', () => {
    const result = prLineSchema.safeParse({
      balas_name: 'Line 1',
      balas_unitprice: -10,
    });
    expect(result.success).toBe(false);
  });

  it('cho phép unitprice = 0', () => {
    const result = prLineSchema.safeParse({
      balas_name: 'Line 1',
      balas_unitprice: 0,
    });
    expect(result.success).toBe(true);
  });
});
