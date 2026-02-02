import { createQueryKeys } from "@lukemorales/query-key-factory";
import { GET } from "@shared/lib/AxiosClient";
import type { IProductListResponse, IProductListQuery } from "./contract";

export const productQueries = createQueryKeys("products", {
  list: (params: IProductListQuery) => ({
    queryKey: [params],
    queryFn: () =>
      GET<IProductListResponse>({
        url: "/products",
        params,
      }),
  }),
  infiniteList: (params: Omit<IProductListQuery, 'page'>) => ({
    queryKey: [params],
    queryFn: ({ pageParam = 1 }) =>
      GET<IProductListResponse>({
        url: "/products",
        params: {
          ...params,
          page: pageParam,
        },
      }),
  }),
});
