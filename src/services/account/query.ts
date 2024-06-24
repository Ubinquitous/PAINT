import { queryOptions } from "@tanstack/react-query";
import {
  getAccountList,
  getAverageScore,
  getNews,
  getPension,
  getSpendOfMonth,
  getSpendTarget,
  getTradeList,
} from "./api";

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
  getAverageScore: () =>
    queryOptions({
      queryKey: ["query.average.score"],
      queryFn: getAverageScore,
    }),
  getSpendTarget: () =>
    queryOptions({
      queryKey: ["query.spend.target"],
      queryFn: getSpendTarget,
    }),
  getNews: () =>
    queryOptions({
      queryKey: ["query.news"],
      queryFn: getNews,
    }),
  getPension: () =>
    queryOptions({
      queryKey: ["query.pension"],
      queryFn: getPension,
    }),
};
