import { useQuery, useInfiniteQuery, type UseInfiniteQueryOptions, type UseInfiniteQueryResult } from "@tanstack/react-query";
import type { UseQueryDataType } from "@shared/contracts/query";
import type { IProductListResponse, IProductListQuery } from "./contract";
import { queries } from "../queryKeys";

// Product list query
export const useProductList: UseQueryDataType<
  IProductListResponse,
  IProductListQuery
> = (params, options) =>
    useQuery({
      ...queries.products.list(params),
      ...options,
    });

// Infinite product list query (for "Load More" functionality)
export const useInfiniteProductList = (
  params: Omit<IProductListQuery, 'page'>,
  options?: Omit<UseInfiniteQueryOptions<IProductListResponse>, 'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'>
) =>
  useInfiniteQuery({
    ...queries.products.infiniteList(params),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!params.q && params.q.length >= 3,
    ...options,
  });

// Re-export contracts
export * from "./contract";
