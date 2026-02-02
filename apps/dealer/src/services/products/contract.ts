// Product types
export type ProductType = "Genuine" | "Aftermarket" | "Branded";

export interface IProduct {
  id: string;
  code: string;
  name: string;
  type: ProductType;
  stock: number;
  currency: string;
  net1: number;
  net2: number;
  net3: number;
  net4: number;
  net5: number;
  net6: number;
  net7: number;
  createdAt: number;
  updatedAt: number;
  supersededBy?: string;
  superseding: ISupersedingProduct | null;
}

export interface ISupersedingProduct {
  id: string;
  code: string;
  name: string;
  type: ProductType;
  stock: number;
  currency: string;
  net1: number;
  net2: number;
  net3: number;
  net4: number;
  net5: number;
  net6: number;
  net7: number;
  createdAt: number;
  updatedAt: number;
  supersededBy?: string;
}

export interface IProductListQuery {
  page?: number;
  limit?: number;
  q?: string;
  type?: ProductType;
}

export interface IProductListMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IProductListResponse {
  success: true;
  data: IProduct[];
  meta: IProductListMeta;
}
