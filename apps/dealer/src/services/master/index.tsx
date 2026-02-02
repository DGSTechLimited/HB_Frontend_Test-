import { useQuery } from "@tanstack/react-query";
import type { UseQueryType } from "@shared/contracts/query";
import type {
  IDispatchMethodsResponse,
  IUserRolesResponse,
  IDealerTiersResponse,
  IProductTypesResponse,
} from "./contract";
import { queries } from "../queryKeys";

// Get dispatch methods (shipping methods)
export const useDispatchMethods: UseQueryType<IDispatchMethodsResponse> = (
  options
) =>
  useQuery({
    ...queries.master.dispatchMethods,
    ...options,
  });

// Get user roles
export const useUserRoles: UseQueryType<IUserRolesResponse> = (options) =>
  useQuery({
    ...queries.master.roles,
    ...options,
  });

// Get dealer tiers
export const useDealerTiers: UseQueryType<IDealerTiersResponse> = (options) =>
  useQuery({
    ...queries.master.tiers,
    ...options,
  });

// Get product types
export const useProductTypes: UseQueryType<IProductTypesResponse> = (options) =>
  useQuery({
    ...queries.master.productTypes,
    ...options,
  });

// Re-export contracts
export * from "./contract";
