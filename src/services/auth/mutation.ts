import { useMutation } from "@tanstack/react-query";
import { requestAddBank, requestLogin, requestSignUp } from "./api";

export const useSignUp = () => {
  return useMutation({
    mutationFn: requestSignUp,
  });
};

export const useAddBank = () => {
  return useMutation({
    mutationFn: requestAddBank,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: requestLogin,
  });
};
