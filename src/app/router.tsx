import { createHashRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../shared/components/Layout/AppLayout';
import { ProtectedRoute } from '../shared/components/ProtectedRoute';

// Lazy load pages để tối ưu bundle size
import { lazy } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
const PRListPage = lazy(() => import('../features/purchase-requisition/components/PRListPage'));
// eslint-disable-next-line react-refresh/only-export-components
const PRFormPage = lazy(() => import('../features/purchase-requisition/components/PRFormPage'));
// eslint-disable-next-line react-refresh/only-export-components
const PRViewPage = lazy(() => import('../features/purchase-requisition/components/PRViewPage'));
// eslint-disable-next-line react-refresh/only-export-components
const NotFoundPage = lazy(() => import('../shared/components/NotFoundPage'));

// HashRouter vì Power Pages không hỗ trợ server-side URL rewrite.
// Tất cả routes sẽ dùng /#/ prefix (ví dụ: /#/purchase-requisitions).
export const router = createHashRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/purchase-requisitions" replace />,
      },
      // Phase 1 - Purchase Requisition
      {
        path: 'purchase-requisitions',
        element: <PRListPage />,
      },
      {
        path: 'purchase-requisitions/new',
        element: <PRFormPage mode="create" />,
      },
      {
        path: 'purchase-requisitions/:id',
        element: <PRViewPage />,
      },
      {
        path: 'purchase-requisitions/:id/edit',
        element: <PRFormPage mode="edit" />,
      },
      // Phase 2 - Master data sẽ thêm sau
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
