import { getCodefToken } from "./getCodefToken";

export const codefAuthorization = async () => ({
  headers: {
    Authorization: `Bearer ${await getCodefToken()}`,
  },
});
