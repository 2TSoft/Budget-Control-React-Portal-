import dataverseClient from './dataverse-client';

export async function triggerCloudFlow<TRequest = unknown, TResponse = unknown>(
  flowId: string,
  payload: TRequest,
): Promise<TResponse> {
  const response = await dataverseClient.post<TResponse>(
    `cloudflow/v1.0/trigger/${flowId}`,
    payload,
  );
  return response.data;
}
