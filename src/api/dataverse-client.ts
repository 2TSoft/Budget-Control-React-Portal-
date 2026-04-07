import axios, { type AxiosInstance } from 'axios';

// Power Pages /_api/ proxy sử dụng session cookie authentication.
// Browser tự gửi cookie kèm mỗi request cùng domain — không cần Bearer token.
// withCredentials: true đảm bảo cookie được gửi qua Vite dev proxy.

const dataverseClient: AxiosInstance = axios.create({
  baseURL: '/_api/',
  headers: {
    'Content-Type': 'application/json',
    'OData-MaxVersion': '4.0',
    'OData-Version': '4.0',
    Accept: 'application/json',
  },
  withCredentials: true,
});

export default dataverseClient;
