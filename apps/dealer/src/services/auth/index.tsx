import { useMutation, useQuery } from "@tanstack/react-query";
import { POST } from "@shared/lib/AxiosClient";
import type { UseMutationType, UseQueryType } from "@shared/contracts/query";
import type {
  ILoginRequest,
  ILoginResponse,
  ILogoutResponse,
  IProfileResponse,
} from "./contract";
import { queries } from "../queryKeys";

// Profile query
export const useProfile: UseQueryType<IProfileResponse> = (options) =>
  useQuery({
    ...queries.auth.profile,
    ...options,
  });

// Dealer Login mutation
export const useLogin: UseMutationType<ILoginResponse, ILoginRequest> = (
  options
) =>
  useMutation({
    mutationFn: (data) =>
      POST<ILoginResponse>({
        url: "/auth/login/dealer",
        data,
      }),
    ...options,
  });

// Logout mutation
export const useLogout: UseMutationType<ILogoutResponse, void> = (options) =>
  useMutation({
    mutationFn: () =>
      POST<ILogoutResponse>({
        url: "/auth/logout",
      }),
    ...options,
  });

// Re-export contracts
export * from "./contract";
