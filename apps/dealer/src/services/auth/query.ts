import { createQueryKeys } from "@lukemorales/query-key-factory";
import { GET } from "@shared/lib/AxiosClient";
import type { IProfileResponse } from "./contract";

export const authQueries = createQueryKeys("auth", {
  profile: {
    queryKey: null,
    queryFn: () =>
      GET<IProfileResponse>({
        url: "/auth/profile",
      }),
  },
});
