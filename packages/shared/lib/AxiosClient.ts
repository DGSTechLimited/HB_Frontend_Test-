import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export interface ApiConfig {
  baseURL: string;
  timeout: number;
}

const axiosClient = axios.create();

// Initialize axios with config
export function initializeAxios(config: ApiConfig) {
  axiosClient.defaults.baseURL = config.baseURL;
  axiosClient.defaults.timeout = config.timeout;
  axiosClient.defaults.headers.Accept = "application/json";
  axiosClient.defaults.withCredentials = true; // Enable sending cookies with requests
}

// Request interceptor - clean undefined params
axiosClient.interceptors.request.use((config) => {
  if (config.params) {
    const cleanParams: Record<string, unknown> = {};
    Object.entries(config.params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        cleanParams[key] = value;
      }
    });
    config.params = cleanParams;
  }
  return config;
});

// Response interceptor - handle errors
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {

    if (error.response?.status === 401) {
      // Redirect to login on unauthorized (cookie expired or invalid)
      if (!window.location.pathname.includes("/login")) {
        globalThis.location.href = "/login";
      }
    }
    // Still reject the promise so React Query can set isError state
    return Promise.reject(error);
  }
);

// Note: Auth is handled via HTTP-only cookies, no need for manual header management
// These functions are kept for compatibility but are no-ops
export function setAuthHeader(_token: string) {
  // No-op: Authentication is handled via HTTP-only cookies
}

export function removeAuthHeader() {
  // No-op: Authentication is handled via HTTP-only cookies
}

// Request types
export interface AxiosRequestConfigType extends AxiosRequestConfig {
  url: string;
}

// Generic request function
async function AxiosClientRequest<T = unknown>(
  config: AxiosRequestConfigType
): Promise<T> {
  const response: AxiosResponse<T> = await axiosClient(config);
  return response.data;
}

// HTTP method helpers
export const GET = <T = unknown>(config: AxiosRequestConfigType) =>
  AxiosClientRequest<T>({ method: "GET", ...config });

export const POST = <T = unknown>(config: AxiosRequestConfigType) =>
  AxiosClientRequest<T>({ method: "POST", ...config });

export const PUT = <T = unknown>(config: AxiosRequestConfigType) =>
  AxiosClientRequest<T>({ method: "PUT", ...config });

export const PATCH = <T = unknown>(config: AxiosRequestConfigType) =>
  AxiosClientRequest<T>({ method: "PATCH", ...config });

export const DELETE = <T = unknown>(config: AxiosRequestConfigType) =>
  AxiosClientRequest<T>({ method: "DELETE", ...config });

export default axiosClient;
