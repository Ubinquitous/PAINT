import { headers } from "next/headers";

export const getAuthorizationToken = () => {
  const header = headers();
  return header.get("Authorization") || "";
};
