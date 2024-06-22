import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestTargetSave, requestTradeRefresh } from "./api";

export const useTradeRefreshMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestTradeRefresh,
    onSuccess: ({ accountNumber }) => {
      queryClient.invalidateQueries({ queryKey: ["query.account.list"] });
      queryClient.invalidateQueries({
        queryKey: ["query.trade.list", accountNumber],
      });
    },
  });
};

export const useTargetSaveMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestTargetSave,
    onSuccess: () => {
      window.location.reload();
      queryClient.invalidateQueries({ queryKey: ["query.spend.target"] });
    },
  });
};
