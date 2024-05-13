import { useMutation } from "@tanstack/react-query";
import { requestCertificatePasswordMatch } from "./api";

export const useCertPasswordMatchMutation = () => {
  return useMutation({
    mutationFn: requestCertificatePasswordMatch,
  });
};
