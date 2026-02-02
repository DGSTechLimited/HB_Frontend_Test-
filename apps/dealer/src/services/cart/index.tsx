import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { POST, PATCH, DELETE } from "@shared/lib/AxiosClient";
import type { UseQueryType, UseMutationType } from "@shared/contracts/query";
import type {
  ICartResponse,
  ICartCountResponse,
  IAddToCartRequest,
  IAddToCartResponse,
  IUpdateCartItemRequest,
  IUpdateCartItemResponse,
  IRemoveCartItemRequest,
  IRemoveCartItemResponse,
} from "./contract";
import { queries } from "../queryKeys";

// Get cart
export const useCart: UseQueryType<ICartResponse> = (options) =>
  useQuery({
    ...queries.cart.get,
    ...options,
  });

// Get cart count
export const useCartCount: UseQueryType<ICartCountResponse> = (options) =>
  useQuery({
    ...queries.cart.count,
    ...options,
  });

// Add to cart mutation
export const useAddToCart: UseMutationType<
  IAddToCartResponse,
  IAddToCartRequest
> = (options) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      POST<IAddToCartResponse>({
        url: "/cart/items",
        data,
      }),
    onSuccess: () => {
      // Invalidate cart queries to refetch
      queryClient.invalidateQueries({ queryKey: queries.cart._def });
    },
    ...options,
  });
};

// Update cart item quantity
export const useUpdateCartItem: UseMutationType<
  IUpdateCartItemResponse,
  IUpdateCartItemRequest
> = (options) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      PATCH<IUpdateCartItemResponse>({
        url: "/cart/items",
        data,
      }),
    onSuccess: () => {
      // Invalidate cart queries to refetch
      queryClient.invalidateQueries({ queryKey: queries.cart._def });
    },
    ...options,
  });
};

// Remove cart item
export const useRemoveCartItem: UseMutationType<
  IRemoveCartItemResponse,
  IRemoveCartItemRequest
> = (options) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      DELETE<IRemoveCartItemResponse>({
        url: "/cart/items",
        data,
      }),
    onSuccess: () => {
      // Invalidate cart queries to refetch
      queryClient.invalidateQueries({ queryKey: queries.cart._def });
    },
    ...options,
  });
};

// Re-export contracts
export * from "./contract";
