import type { AxiosError } from "axios";
import type { IErrorResponse } from "../contracts";

/**
 * Extract error message from API error response
 */
export function getErrorMessage(error: unknown): string {
  if (!error) return "An unexpected error occurred";

  // Check if it's an AxiosError with our API error response
  if (typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosError<IErrorResponse>;
    const data = axiosError.response?.data;

    if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      // Return first error message
      return data.errors[0];
    }

    // Fallback to axios error message
    if (axiosError.message) {
      return axiosError.message;
    }
  }

  // Fallback for generic errors
  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
}

/**
 * Extract all error messages from API error response
 */
export function getAllErrorMessages(error: unknown): string[] {
  if (!error) return ["An unexpected error occurred"];

  if (typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosError<IErrorResponse>;
    const data = axiosError.response?.data;

    if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors;
    }
  }

  return [getErrorMessage(error)];
}

/**
 * Get validation field errors
 */
export function getFieldErrors(
  error: unknown
): Record<string, string[]> | undefined {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosError<IErrorResponse>;
    const data = axiosError.response?.data;

    if (data?.fields) {
      return data.fields;
    }
  }

  return undefined;
}

/**
 * Get error code
 */
export function getErrorCode(error: unknown): string | undefined {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosError<IErrorResponse>;
    return axiosError.response?.data?.code;
  }

  return undefined;
}
