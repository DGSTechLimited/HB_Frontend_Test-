import { createQueryKeys } from "@lukemorales/query-key-factory";
import { GET } from "@shared/lib/AxiosClient";
import type { IOrderResponse } from "./contract";

export const orderQueries = createQueryKeys("order", {
  detail: (orderId: number) => ({
    queryKey: [orderId],
    queryFn: () =>
      GET<IOrderResponse>({
        url: `/orders/${orderId}`,
      }),
  }),
});
