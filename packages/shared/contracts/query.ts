import type {
  UseQueryOptions,
  UseQueryResult,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "./index";

export type UseQueryType<R> = (
  // eslint-disable-next-line no-unused-vars
  options?: UseQueryOptions<any, any, R, any>
) => UseQueryResult<R>;

// UseMutation type helper
export type UseMutationType<TResponse, TRequest> = (
  options?: UseMutationOptions<
    TResponse,
    AxiosError<IErrorResponse>,
    TRequest,
    unknown
  >
) => UseMutationResult<
  TResponse,
  AxiosError<IErrorResponse>,
  TRequest,
  unknown
>;


export type UseQueryDataType<R, D> = (
  // eslint-disable-next-line no-unused-vars
  data: D,
  // eslint-disable-next-line no-unused-vars
  options?: UseQueryOptions<any, any, R, any>
) => UseQueryResult<R>;