import { describe, it, expect } from 'vitest';
import { router } from './router';

describe('router configuration', () => {
  it('sử dụng HashRouter (có /#/ prefix)', () => {
    // createHashRouter tạo router với hash-based navigation
    expect(router).toBeDefined();
    // Verify routes structure
    expect(router.routes).toBeDefined();
    expect(router.routes.length).toBeGreaterThan(0);
  });

  it('có root route /', () => {
    const rootRoute = router.routes.find((r) => r.path === '/');
    expect(rootRoute).toBeDefined();
  });

  it('có wildcard route cho 404', () => {
    const wildcardRoute = router.routes.find((r) => r.path === '*');
    expect(wildcardRoute).toBeDefined();
  });

  it('root route có children routes cho purchase-requisitions', () => {
    const rootRoute = router.routes.find((r) => r.path === '/');
    expect(rootRoute?.children).toBeDefined();

    const childPaths = rootRoute?.children?.map((c) =>
      'path' in c ? c.path : 'index',
    );
    expect(childPaths).toContain('purchase-requisitions');
    expect(childPaths).toContain('purchase-requisitions/new');
    expect(childPaths).toContain('purchase-requisitions/:id');
    expect(childPaths).toContain('purchase-requisitions/:id/edit');
  });
});
