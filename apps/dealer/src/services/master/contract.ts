// Shipping Method
export interface IShippingMethod {
  id: number;
  name: string;
}

// Dispatch Methods Response
export interface IDispatchMethodsResponse {
  success: true;
  data: IShippingMethod[];
}

// User Role
export interface IUserRole {
  id: number;
  code: string;
  name: string;
}

// User Roles Response
export interface IUserRolesResponse {
  success: true;
  data: IUserRole[];
}

// Dealer Tier
export interface IDealerTier {
  code: string;
  name: string;
}

// Dealer Tiers Response
export interface IDealerTiersResponse {
  success: true;
  data: IDealerTier[];
}

// Product Type
export interface IProductType {
  code: string;
  name: string;
}

// Product Types Response
export interface IProductTypesResponse {
  success: true;
  data: IProductType[];
}
