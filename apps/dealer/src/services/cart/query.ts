import { createQueryKeys } from "@lukemorales/query-key-factory";
import { GET } from "@shared/lib/AxiosClient";
import type { ICartResponse, ICartCountResponse } from "./contract";

export const cartQueries = createQueryKeys("cart", {
  get: {
    queryKey: null,
    queryFn: () =>
      GET<ICartResponse>({
        url: "/cart",
      }),
  },
  count: {
    queryKey: null,
    queryFn: () =>
      GET<ICartCountResponse>({
        url: "/cart/count",
      }),
  },
});
