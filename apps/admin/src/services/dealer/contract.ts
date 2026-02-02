// Dealer Tiers
export type DealerTier =
  | "Net1"
  | "Net2"
  | "Net3"
  | "Net4"
  | "Net5"
  | "Net6"
  | "Net7";

// Dealer Account Status
export type DealerAccountStatus = "Active" | "Inactive" | "Suspended";

// Create Dealer Request
export interface ICreateDealerRequest {
  firstName: string;
  lastName?: string;
  email: string;
  accountNumber: number;
  companyName: string;
  genuinePartsTier: DealerTier;
  aftermarketESTier: DealerTier;
  aftermarketBTier: DealerTier;
  notes?: string;
}

// Dealer Data
export interface IDealerData {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  createdAt: string;
  dealer: {
    accountNumber: number;
    companyName: string;
    genuinePartsTier: DealerTier;
    aftermarketESTier: DealerTier;
    aftermarketBTier: DealerTier;
    accountStatus: DealerAccountStatus;
  };
}

// Create Dealer Response
export interface ICreateDealerResponse {
  success: true;
  data: IDealerData;
}

// List Dealers Query Params
export interface IListDealersParams {
  page?: number;
  limit?: number;
  search?: string;
  accountStatus?: DealerAccountStatus;
}

// List Dealers Response
export interface IListDealersResponse {
  success: true;
  data: IDealerData[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
