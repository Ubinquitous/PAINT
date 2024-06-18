import { queryOptions } from "@tanstack/react-query";
import { getAccountList, getSpendOfMonth } from "./api";

export const accountQuery = {
  getAccountList: () =>
    queryOptions({
      queryKey: ["query.account.list"],
      queryFn: getAccountList,
    }),
  getSpendOfMonth: (month: number) =>
    queryOptions({
      queryKey: ["query.spend.month"],
      queryFn: () => getSpendOfMonth(month),
    }),
};
