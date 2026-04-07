import { describe, it, expect } from 'vitest';
import type { ODataResponse, ODataParams, DataverseError, DataverseBaseEntity } from './dataverse';
import type { AppUser, AppRole } from './auth';

// ============================================================
// Type structure validation (compile-time + runtime shape checks)
// ============================================================

describe('ODataResponse shape', () => {
  it('có đúng structure cho response data', () => {
    const response: ODataResponse<{ id: string }> = {
      value: [{ id: '123' }],
      '@odata.count': 1,
    };
    expect(response.value).toHaveLength(1);
    expect(response['@odata.count']).toBe(1);
  });

  it('cho phép empty value array', () => {
    const response: ODataResponse<unknown> = {
      value: [],
    };
    expect(response.value).toHaveLength(0);
    expect(response['@odata.count']).toBeUndefined();
  });

  it('hỗ trợ @odata.nextLink cho pagination', () => {
    const response: ODataResponse<unknown> = {
      value: [],
      '@odata.nextLink': 'https://example.com/next',
    };
    expect(response['@odata.nextLink']).toBeDefined();
  });
});

describe('ODataParams shape', () => {
  it('tất cả fields đều optional', () => {
    const params: ODataParams = {};
    expect(params.$select).toBeUndefined();
    expect(params.$filter).toBeUndefined();
    expect(params.$top).toBeUndefined();
  });

  it('chấp nhận full query params', () => {
    const params: ODataParams = {
      $select: 'id,name',
      $filter: "contains(name,'test')",
      $expand: 'lines',
      $orderby: 'createdon desc',
      $top: 20,
      $skip: 0,
      $count: true,
    };
    expect(params.$top).toBe(20);
    expect(params.$count).toBe(true);
  });
});

describe('DataverseError shape', () => {
  it('có cấu trúc error đúng', () => {
    const error: DataverseError = {
      error: {
        code: '0x80040217',
        message: 'Entity not found',
      },
    };
    expect(error.error.code).toBeDefined();
    expect(error.error.message).toBeDefined();
  });

  it('hỗ trợ innererror optional', () => {
    const error: DataverseError = {
      error: {
        code: '0x80040217',
        message: 'Entity not found',
        innererror: {
          message: 'Detail',
          stacktrace: 'at ...',
        },
      },
    };
    expect(error.error.innererror?.message).toBe('Detail');
  });
});

describe('DataverseBaseEntity shape', () => {
  it('chứa các trường audit cơ bản', () => {
    const entity: DataverseBaseEntity = {
      createdon: '2024-01-01T00:00:00Z',
      modifiedon: '2024-01-02T00:00:00Z',
      statecode: 0,
      statuscode: 1,
    };
    expect(entity.createdon).toBeDefined();
    expect(entity.statecode).toBe(0);
  });

  it('tất cả fields optional', () => {
    const entity: DataverseBaseEntity = {};
    expect(entity.createdon).toBeUndefined();
  });
});

describe('AppUser shape', () => {
  it('có đúng structure', () => {
    const user: AppUser = {
      id: '123',
      name: 'Test User',
      email: 'test@example.com',
      roles: ['admin'],
    };
    expect(user.id).toBe('123');
    expect(user.roles).toContain('admin');
  });

  it('hỗ trợ optional contactId và companyId', () => {
    const user: AppUser = {
      id: '123',
      name: 'Test',
      email: 'test@example.com',
      roles: ['authenticated'],
      contactId: 'contact-guid',
      companyId: 'company-guid',
    };
    expect(user.contactId).toBe('contact-guid');
  });
});

describe('AppRole type', () => {
  it('chỉ chấp nhận 3 roles hợp lệ', () => {
    const validRoles: AppRole[] = ['admin', 'local-admin', 'authenticated'];
    expect(validRoles).toHaveLength(3);
    // Type-level validation — compile sẽ fail nếu thêm role không hợp lệ
    validRoles.forEach((role) => {
      expect(['admin', 'local-admin', 'authenticated']).toContain(role);
    });
  });
});
