import dataverseClient from '../dataverse-client';
import { DATAVERSE_ENTITIES } from '../../shared/utils/constants';
import type { ODataParams, ODataResponse } from '../../types/dataverse';
import type { PRHeader, PRLine, CreatePRHeader, UpdatePRHeader, CreatePRLine, UpdatePRLine } from '../../features/purchase-requisition/types';

const PR_ENTITY = DATAVERSE_ENTITIES.prHeader;
const PR_LINE_ENTITY = DATAVERSE_ENTITIES.prLine;

// ============================================================
// PR Header CRUD
// ============================================================

export const prHeaderApi = {
  list: (params?: ODataParams) =>
    dataverseClient
      .get<ODataResponse<PRHeader>>(PR_ENTITY, { params: { $count: true, ...params } })
      .then((r) => r.data),

  get: (id: string, params?: Pick<ODataParams, '$select' | '$expand'>) =>
    dataverseClient
      .get<PRHeader>(`${PR_ENTITY}(${id})`, { params })
      .then((r) => r.data),

  create: (data: CreatePRHeader) =>
    dataverseClient
      .post<PRHeader>(PR_ENTITY, data)
      .then((r) => r.data),

  update: (id: string, data: UpdatePRHeader) =>
    dataverseClient.patch(`${PR_ENTITY}(${id})`, data),

  delete: (id: string) =>
    dataverseClient.delete(`${PR_ENTITY}(${id})`),
};

// ============================================================
// PR Line CRUD
// ============================================================

export const prLineApi = {
  listByHeader: (headerId: string, params?: ODataParams) =>
    dataverseClient
      .get<ODataResponse<PRLine>>(PR_LINE_ENTITY, {
        params: {
          $filter: `_balas_purchaserequisitionheaderid_value eq ${headerId}`,
          $orderby: 'balas_linenumber asc',
          ...params,
        },
      })
      .then((r) => r.data),

  create: (data: CreatePRLine) =>
    dataverseClient.post<PRLine>(PR_LINE_ENTITY, data).then((r) => r.data),

  update: (id: string, data: UpdatePRLine) =>
    dataverseClient.patch(`${PR_LINE_ENTITY}(${id})`, data),

  delete: (id: string) =>
    dataverseClient.delete(`${PR_LINE_ENTITY}(${id})`),
};
