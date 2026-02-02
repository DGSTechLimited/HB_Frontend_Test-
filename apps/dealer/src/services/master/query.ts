import { createQueryKeys } from "@lukemorales/query-key-factory";
import { GET } from "@shared/lib/AxiosClient";
import type {
  IDispatchMethodsResponse,
  IUserRolesResponse,
  IDealerTiersResponse,
  IProductTypesResponse,
} from "./contract";

export const masterQueries = createQueryKeys("master", {
  dispatchMethods: {
    queryKey: null,
    queryFn: () =>
      GET<IDispatchMethodsResponse>({
        url: "/master/dispatch_methods",
      }),
  },
  roles: {
    queryKey: null,
    queryFn: () =>
      GET<IUserRolesResponse>({
        url: "/master/roles",
      }),
  },
  tiers: {
    queryKey: null,
    queryFn: () =>
      GET<IDealerTiersResponse>({
        url: "/master/tiers",
      }),
  },
  productTypes: {
    queryKey: null,
    queryFn: () =>
      GET<IProductTypesResponse>({
        url: "/master/product_types",
      }),
  },
});
