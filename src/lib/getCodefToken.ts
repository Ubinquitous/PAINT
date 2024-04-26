import { prismaClient } from "./prismaClient";

export const getCodefToken = async () => {
  const { access_token } = (await prismaClient.token.findUnique({
    where: { token_name: "connectedId" },
  })) || {
    access_token: "",
  };
  return access_token;
};
