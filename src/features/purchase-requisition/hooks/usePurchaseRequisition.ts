import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { prHeaderApi, prLineApi } from '../../../api/endpoints/purchase-requisition';
import { triggerCloudFlow } from '../../../api/cloudflow-client';
import { CLOUD_FLOWS, DEFAULT_PAGE_SIZE } from '../../../shared/utils/constants';
import type { ODataParams } from '../../../types/dataverse';
import type { CreatePRHeader, UpdatePRHeader, CreatePRLine, UpdatePRLine } from '../types';

// ============================================================
// PR Header Queries
// ============================================================

export function usePRHeaders(params?: ODataParams) {
  return useQuery({
    queryKey: ['prHeaders', params],
    queryFn: () =>
      prHeaderApi.list({
        $select:
          'balas_purchaserequisitionheaderid,balas_name,balas_requestdate,balas_requireddate,statuscode,createdon,_balas_departmentid_value,_ownerid_value',
        $orderby: 'createdon desc',
        $top: DEFAULT_PAGE_SIZE,
        ...params,
      }),
  });
}

export function usePRHeader(id: string | undefined) {
  return useQuery({
    queryKey: ['prHeader', id],
    queryFn: () =>
      prHeaderApi.get(id!, {
        $expand: 'balas_purchaserequisitionheader_balas_purchaserequisitionline',
      }),
    enabled: !!id,
  });
}

// ============================================================
// PR Header Mutations
// ============================================================

export function useCreatePR() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePRHeader) => prHeaderApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['prHeaders'] }),
  });
}

export function useUpdatePR() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePRHeader }) =>
      prHeaderApi.update(id, data),
    onSuccess: (_r, { id }) => {
      qc.invalidateQueries({ queryKey: ['prHeaders'] });
      qc.invalidateQueries({ queryKey: ['prHeader', id] });
    },
  });
}

export function useDeletePR() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => prHeaderApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['prHeaders'] }),
  });
}

// ============================================================
// PR Line Queries & Mutations
// ============================================================

export function usePRLines(headerId: string | undefined) {
  return useQuery({
    queryKey: ['prLines', headerId],
    queryFn: () => prLineApi.listByHeader(headerId!),
    enabled: !!headerId,
  });
}

export function useCreatePRLine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePRLine) => prLineApi.create(data),
    onSuccess: (_r, data) => {
      const headerId = data['balas_purchaserequisitionheaderid@odata.bind']
        .replace('/balas_purchaserequisitionheaders(', '')
        .replace(')', '');
      qc.invalidateQueries({ queryKey: ['prLines', headerId] });
    },
  });
}

export function useUpdatePRLine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, headerId }: { id: string; data: UpdatePRLine; headerId: string }) =>
      prLineApi.update(id, data).then(() => headerId),
    onSuccess: (_r, { headerId }) =>
      qc.invalidateQueries({ queryKey: ['prLines', headerId] }),
  });
}

export function useDeletePRLine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, headerId }: { id: string; headerId: string }) =>
      prLineApi.delete(id).then(() => headerId),
    onSuccess: (_r, { headerId }) =>
      qc.invalidateQueries({ queryKey: ['prLines', headerId] }),
  });
}

// ============================================================
// Approval Workflow Actions (Cloud Flow)
// ============================================================

interface PRActionPayload {
  prId: string;
  reason?: string;
}

function usePRCloudFlowAction(flowKey: keyof typeof CLOUD_FLOWS) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: PRActionPayload) =>
      triggerCloudFlow(CLOUD_FLOWS[flowKey], { id: payload.prId, reason: payload.reason }),
    onSuccess: (_r, { prId }) => {
      qc.invalidateQueries({ queryKey: ['prHeaders'] });
      qc.invalidateQueries({ queryKey: ['prHeader', prId] });
    },
  });
}

export const useSubmitPR = () => usePRCloudFlowAction('requestApproval');
export const useApprovePR = () => usePRCloudFlowAction('approve');
export const useRejectPR = () => usePRCloudFlowAction('reject');
export const useReopenPR = () => usePRCloudFlowAction('reopen');
export const useCancelPR = () => usePRCloudFlowAction('cancelRequest');
export const useClosePR = () => usePRCloudFlowAction('closePR');

// ============================================================
// Budget Check
// ============================================================

export function useBudgetCheck() {
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      triggerCloudFlow(CLOUD_FLOWS.budgetControl, payload),
  });
}
