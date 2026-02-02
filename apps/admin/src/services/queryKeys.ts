import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { authQueries } from "./auth/query";
import { dealerQueries } from "./dealer/query";

export const queries = mergeQueryKeys(authQueries, dealerQueries);
