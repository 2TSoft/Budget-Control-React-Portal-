import type { Configuration, PopupRequest } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID as string,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID as string}`,
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
  },
};

// Scopes để lấy token truy cập Dataverse
// Yêu cầu: App Registration phải có API permission Dynamics CRM → user_impersonation
export const dataverseLoginRequest: PopupRequest = {
  scopes: [
    `${import.meta.env.VITE_DATAVERSE_URL as string}/user_impersonation`,
  ],
};
