import { queryOptions } from "@tanstack/react-query";
import { getAccountList } from "./api";

export const accountQuery = {
  getAccountList: () =>
    queryOptions({
      queryKey: ["query.account.list"],
      queryFn: getAccountList,
    }),
};
