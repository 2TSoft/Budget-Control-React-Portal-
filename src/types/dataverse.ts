// Kiểu dữ liệu chung cho Dataverse Web API responses

export interface ODataResponse<T> {
  value: T[];
  '@odata.count'?: number;
  '@odata.nextLink'?: string;
}

export interface ODataParams {
  $select?: string;
  $filter?: string;
  $expand?: string;
  $orderby?: string;
  $top?: number;
  $skip?: number;
  $count?: boolean;
}

export interface DataverseError {
  error: {
    code: string;
    message: string;
    innererror?: {
      message: string;
      stacktrace: string;
    };
  };
}

// Các trường chung có trong mọi Dataverse entity
export interface DataverseBaseEntity {
  createdon?: string;
  modifiedon?: string;
  statecode?: number;
  statuscode?: number;
}
