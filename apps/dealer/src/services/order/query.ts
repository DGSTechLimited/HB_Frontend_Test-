import { createQueryKeys } from "@lukemorales/query-key-factory";
import { GET } from "@shared/lib/AxiosClient";
import type { IOrderResponse, IOrdersListResponse, IOrdersListParams } from "./contract";

export const orderQueries = createQueryKeys("order", {
  detail: (orderId: number) => ({
    queryKey: [orderId],
    queryFn: () =>
      GET<IOrderResponse>({
        url: `/orders/${orderId}`,
      }),
  }),
  list: (params?: IOrdersListParams) => ({
    queryKey: [params],
    queryFn: () =>
      GET<IOrdersListResponse>({
        url: "/orders",
        params: {
          status: params?.status,
          type: params?.type,
          page: params?.page || 1,
          limit: params?.limit || 10,
        },
      }),
  }),
});
