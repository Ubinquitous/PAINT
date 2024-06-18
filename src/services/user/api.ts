import { paint } from "..";

export const getUser = async () => {
  const { data } = await paint.get("/user");
  return data;
};
