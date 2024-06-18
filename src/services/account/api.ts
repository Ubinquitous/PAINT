import { authorization, paint } from "..";

export const getAccountList = async () => {
  const { data } = await paint.get("/account/list", authorization());
  return data;
};
