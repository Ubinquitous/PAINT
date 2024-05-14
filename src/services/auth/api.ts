import { AccountRegisterRequestDto } from "~/app/api/account/register/AccountRegisterRequestDto";
import { authorization, paint } from "..";
import { AccountAddRequestDto } from "~/app/api/account/add/AccountAddRequestDto";

export const requestSignUp = async (request: AccountRegisterRequestDto) => {
  const { data } = await paint.post("/account/register", request);
  return data;
};

export const requestAddBank = async (request: AccountAddRequestDto) => {
  const { data } = await paint.post("/account/add", request, authorization());
  return data;
};

export const requestLogin = async (certFile: string) => {
  const { data } = await paint.post("/account/login", null, {
    headers: { Authorization: certFile },
  });
  return data;
};
