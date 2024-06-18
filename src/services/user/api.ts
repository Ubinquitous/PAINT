import { authorization, paint } from "..";

export const getUser = async () => {
  const { data } = await paint.get("/user", authorization());
  return data;
};
