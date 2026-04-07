import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock import.meta.env trước khi import module
vi.stubEnv('VITE_AZURE_CLIENT_ID', 'test-client-id');
vi.stubEnv('VITE_AZURE_TENANT_ID', 'test-tenant-id');

describe('msalConfig', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('cấu hình auth đúng', async () => {
    const { msalConfig } = await import('./msal-config');
    expect(msalConfig.auth.clientId).toBe('test-client-id');
    expect(msalConfig.auth.authority).toContain('test-tenant-id');
    expect(msalConfig.auth.authority).toContain('login.microsoftonline.com');
  });

  it('dùng sessionStorage cho cache (bảo mật hơn localStorage)', async () => {
    const { msalConfig } = await import('./msal-config');
    expect(msalConfig.cache?.cacheLocation).toBe('sessionStorage');
  });

  it('redirectUri và postLogoutRedirectUri dùng window.location.origin', async () => {
    const { msalConfig } = await import('./msal-config');
    expect(msalConfig.auth.redirectUri).toBe(window.location.origin);
    expect(msalConfig.auth.postLogoutRedirectUri).toBe(window.location.origin);
  });
});
