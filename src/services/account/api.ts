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

export const getAverageScore = async () => {
  const { data } = await paint.get("/analysis", authorization());
  return data;
};

export const getSpendTarget = async () => {
  const { data } = await paint.get("/spend/target", authorization());
  return data;
};

export const getNews = async () => {
  const { data } = await paint.get("/news", authorization());
  return data;
};

export const getPension = async () => {
  const { data } = await paint.get("/pension", authorization());
  return data;
};

export const requestTradeRefresh = async (accountNumber: string) => {
  const { data } = await paint.post(
    `/refresh/${accountNumber}`,
    authorization()
  );
  return data;
};

export const requestTargetSave = async (body: any) => {
  const { data } = await paint.post(`/spend/target`, body, authorization());
  return data;
};
