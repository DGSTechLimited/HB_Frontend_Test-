import type { QueryClientConfig } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  WEB_DOMAIN: import.meta.env.VITE_WEB_DOMAIN || "",
};

export const API_CONFIG = {
  baseURL: ENV.API_BASE_URL,
  timeout: 5 * 60 * 1000, // 5 minutes
};


export const QUERY_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1 * 60 * 1000, // 1 minute
      retry: (_, error) => {
        const axiosError = error as AxiosError;
        const statusCode = axiosError?.response?.status;
        const excludeStatus = [401, 404, 403, 500];
        return !excludeStatus.includes(statusCode as number);
      },
    },
    mutations: {
      retry: false, // Don't retry mutations by default
    },
  },
};
