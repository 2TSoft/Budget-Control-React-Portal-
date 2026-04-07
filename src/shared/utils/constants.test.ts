import { describe, it, expect } from 'vitest';
import {
  CLOUD_FLOWS,
  DATAVERSE_ENTITIES,
  DEFAULT_CURRENCY_ID,
  DEFAULT_PAGE_SIZE,
} from './constants';

describe('CLOUD_FLOWS', () => {
  it('chứa tất cả flow IDs cần thiết', () => {
    const expectedKeys = [
      'budgetControlEntry',
      'budgetControlStatus',
      'budgetControl',
      'requestApproval',
      'reopen',
      'cancelRequest',
      'approve',
      'reject',
      'closePR',
      'vendorPurchasePrice',
      'specialPR',
      'itemUOM',
      'updateVendor',
      'importLines',
    ];
    expect(Object.keys(CLOUD_FLOWS)).toEqual(expectedKeys);
  });

  it('mỗi flow ID đều là GUID hợp lệ', () => {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    for (const [key, value] of Object.entries(CLOUD_FLOWS)) {
      expect(value, `Flow ${key} phải là GUID hợp lệ`).toMatch(guidRegex);
    }
  });
});

describe('DATAVERSE_ENTITIES', () => {
  it('chứa tất cả entity paths cần thiết', () => {
    const expectedKeys = [
      'prHeader',
      'prLine',
      'department',
      'approvalMatrix',
      'serviceCategory',
      'dimensionValue',
      'siteConfig',
      'company',
      'contact',
      'account',
      'budgetSetup',
    ];
    expect(Object.keys(DATAVERSE_ENTITIES)).toEqual(expectedKeys);
  });

  it('entity paths đều là string không rỗng', () => {
    for (const [key, value] of Object.entries(DATAVERSE_ENTITIES)) {
      expect(value, `Entity ${key} phải là string không rỗng`).toBeTruthy();
      expect(typeof value).toBe('string');
    }
  });

  it('entity paths mapping đúng', () => {
    expect(DATAVERSE_ENTITIES.prHeader).toBe('balas_purchaserequisitionheaders');
    expect(DATAVERSE_ENTITIES.prLine).toBe('balas_purchaserequisitionlines');
    expect(DATAVERSE_ENTITIES.department).toBe('balas_departments');
    expect(DATAVERSE_ENTITIES.company).toBe('bcbi_companies');
    expect(DATAVERSE_ENTITIES.contact).toBe('contacts');
    expect(DATAVERSE_ENTITIES.account).toBe('accounts');
  });
});

describe('DEFAULT_CURRENCY_ID', () => {
  it('là GUID hợp lệ', () => {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    expect(DEFAULT_CURRENCY_ID).toMatch(guidRegex);
  });
});

describe('DEFAULT_PAGE_SIZE', () => {
  it('là số dương hợp lý', () => {
    expect(DEFAULT_PAGE_SIZE).toBe(20);
    expect(DEFAULT_PAGE_SIZE).toBeGreaterThan(0);
    expect(DEFAULT_PAGE_SIZE).toBeLessThanOrEqual(100);
  });
});
