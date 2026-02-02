import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { POST } from "@shared/lib/AxiosClient";
import type { UseQueryType, UseMutationType } from "@shared/contracts/query";
import type {
  ICreateOrderRequest,
  ICreateOrderResponse,
  IOrderResponse,
} from "./contract";
import { queries } from "../queryKeys";

// Get order details
export const useOrder: UseQueryType<IOrderResponse, [number]> = (
  orderId,
  options
) =>
  useQuery({
    ...queries.order.detail(orderId),
    ...options,
  });

// Create order mutation
export const useCreateOrder: UseMutationType<
  ICreateOrderResponse,
  ICreateOrderRequest
> = (options) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      POST<ICreateOrderResponse>({
        url: "/orders",
        data,
      }),
    onSuccess: () => {
      // Invalidate cart queries to refetch after order creation
      queryClient.invalidateQueries({ queryKey: queries.cart._def });
    },
    ...options,
  });
};

// Re-export contracts
export * from "./contract";
