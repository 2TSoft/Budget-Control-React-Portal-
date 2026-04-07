// Cloud Flow Trigger IDs (từ Power Pages content snippet "Config")
export const CLOUD_FLOWS = {
  budgetControlEntry: '31ead744-3790-ee11-be37-000d3aa29810',
  budgetControlStatus: '4fead744-3790-ee11-be37-000d3aa29810',
  budgetControl: '20d7c23e-3790-ee11-be37-000d3aa29810',
  requestApproval: '45c84438-3790-ee11-be37-000d3aa29810',
  reopen: '333bf51a-3790-ee11-be37-000d3aa29810',
  cancelRequest: 'f7b6c327-3790-ee11-be37-000d3aa29810',
  approve: '1bb7c327-3790-ee11-be37-000d3aa29810',
  reject: '3915db2d-3790-ee11-be37-000d3aa29810',
  closePR: '14f6c821-3790-ee11-be37-000d3aa29810',
  vendorPurchasePrice: 'b0c42435-c04c-f011-877a-000d3aa25840',
  specialPR: 'eb4ed2dc-f458-f011-bec1-000d3a822442',
  itemUOM: '25cca410-c058-f011-bec2-6045bd5681f2',
  updateVendor: '6d5585b7-4673-f011-b4cd-000d3a85061f',
  importLines: '77661104-2db9-f011-bbd3-6045bd576979',
} as const;

// Dataverse Entity API Paths
export const DATAVERSE_ENTITIES = {
  prHeader: 'balas_purchaserequisitionheaders',
  prLine: 'balas_purchaserequisitionlines',
  department: 'balas_departments',
  approvalMatrix: 'balas_approvalmatrixes',
  serviceCategory: 'balas_servicecategories',
  dimensionValue: 'balas_dimensionvalues',
  siteConfig: 'balas_siteconfigurations',
  company: 'bcbi_companies',
  contact: 'contacts',
  account: 'accounts',
  budgetSetup: 'balas_budgetsetups',
} as const;

// Cấu hình chung
export const DEFAULT_CURRENCY_ID = '398c296f-7437-f011-b4cd-6045bd599c55';
export const DEFAULT_PAGE_SIZE = 20;
