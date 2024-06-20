import { authorization, paint } from "..";

export const getAccountList = async () => {
  const { data } = await paint.get("/account/list", authorization());
  return data;
};

export const getSpendOfMonth = async (month: number) => {
  const { data } = await paint.get(`/spend/${month}`, authorization());
  return data;
};

export const getTradeList = async (accountNumber: string) => {
  const { data } = await paint.get(`/trade/${accountNumber}`, authorization());
  return data;
};
