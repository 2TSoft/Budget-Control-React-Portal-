import { describe, it, expect } from 'vitest';
import dataverseClient from './dataverse-client';

describe('dataverseClient', () => {
  it('có baseURL là /_api/', () => {
    expect(dataverseClient.defaults.baseURL).toBe('/_api/');
  });

  it('có OData headers đúng', () => {
    const headers = dataverseClient.defaults.headers;
    expect(headers['Content-Type']).toBe('application/json');
    expect(headers['OData-MaxVersion']).toBe('4.0');
    expect(headers['OData-Version']).toBe('4.0');
    expect(headers['Accept']).toBe('application/json');
  });

  it('withCredentials = true cho session cookie', () => {
    expect(dataverseClient.defaults.withCredentials).toBe(true);
  });

  it('không có Authorization header mặc định (dùng session cookie)', () => {
    expect(dataverseClient.defaults.headers['Authorization']).toBeUndefined();
  });
});
