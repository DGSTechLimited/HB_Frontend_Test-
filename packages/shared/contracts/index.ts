// Paginated response
export interface IPaginatedRes<T> {
  data: T[];
  totalCount: number;
  totalPage: number;
  pageSize: number;
  currentPage: number;
}

// Base entity with timestamps
export interface ITimestampEntity {
  _id: string;
  status: boolean;
  deleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// API error response (based on backend error handler)
export interface IErrorResponse {
  success: false;
  errors: string[];
  code: string;
  fields?: Record<string, string[]>; // Validation field errors
  stack?: string; // Dev only
}

// Common status enum
export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

// Pagination params
export interface IPaginationParams {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
