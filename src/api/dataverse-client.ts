import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

// Hàm callback để lấy access token - được inject từ AuthProvider
let getTokenFn: (() => Promise<string>) | null = null;

export function setTokenProvider(fn: () => Promise<string>) {
  getTokenFn = fn;
}

const dataverseClient: AxiosInstance = axios.create({
  // Dùng path tương đối để đi qua Vite proxy trong dev;
  // trong production, SPA phải được deploy cùng domain với portal
  baseURL: '/_api/',
  headers: {
    'Content-Type': 'application/json',
    'OData-MaxVersion': '4.0',
    'OData-Version': '4.0',
    Accept: 'application/json',
  },
});

// Tự động đính kèm Bearer token vào mỗi request
dataverseClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  if (getTokenFn) {
    try {
      const token = await getTokenFn();
      config.headers.Authorization = `Bearer ${token}`;
    } catch {
      // Nếu không lấy được token thì gửi request không có auth (sẽ bị 401)
    }
  }
  return config;
});

export default dataverseClient;
