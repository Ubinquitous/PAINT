import { useMutation } from "@tanstack/react-query";
import { requestAddBank, requestSignUp } from "./api";

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
