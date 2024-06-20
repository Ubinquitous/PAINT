import { queryOptions } from "@tanstack/react-query";
import { getAccountList, getSpendOfMonth, getTradeList } from "./api";

export const accountQuery = {
  getAccountList: () =>
    queryOptions({
      queryKey: ["query.account.list"],
      queryFn: getAccountList,
    }),
  getSpendOfMonth: (month: number) =>
    queryOptions({
      queryKey: ["query.spend.month", month],
      queryFn: () => getSpendOfMonth(month),
    }),
  getTradeList: (accountNumber: string) =>
    queryOptions({
      queryKey: ["query.trade.list", accountNumber],
      queryFn: () => getTradeList(accountNumber),
    }),
};
