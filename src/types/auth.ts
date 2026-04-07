export type AppRole = 'admin' | 'local-admin' | 'authenticated';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  roles: AppRole[];
  contactId?: string; // Dataverse contact GUID
  companyId?: string; // bcbi_company GUID
}
