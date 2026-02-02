import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { POST } from "@shared/lib/AxiosClient";
import type { UseMutationType, UseQueryDataType } from "@shared/contracts/query";
import type {
  ICreateDealerRequest,
  ICreateDealerResponse,
  IListDealersParams,
  IListDealersResponse,
} from "./contract";
import { queries } from "../queryKeys";

// List Dealers Query
export const useListDealers: UseQueryDataType<
  IListDealersResponse,
  IListDealersParams
> = (params = {}, options) => useQuery({
  ...queries.dealer.list(params),
  ...options,
})

// Create Dealer Mutation
export const useCreateDealer: UseMutationType<
  ICreateDealerResponse,
  ICreateDealerRequest
> = (options) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      POST<ICreateDealerResponse>({
        url: "/user/dealer",
        data,
      }),
    onSuccess: (data, variables, context) => {
      // Invalidate all dealer list queries using centralized query keys
      queryClient.invalidateQueries({
        queryKey: queries.dealer.list({}).queryKey,
      });

      // Call user's onSuccess if provided
      // @ts-expect-error - Type mismatch between UseMutationType and actual onSuccess signature
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

// Re-export contracts
export * from "./contract";
