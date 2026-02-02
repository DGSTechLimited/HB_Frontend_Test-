import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { authQueries } from "./auth/query";
import { productQueries } from "./products/query";
import { cartQueries } from "./cart/query";
import { orderQueries } from "./order/query";
import { masterQueries } from "./master/query";

export const queries = mergeQueryKeys(authQueries, productQueries, cartQueries, orderQueries, masterQueries);
