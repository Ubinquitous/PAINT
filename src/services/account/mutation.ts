import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestTradeRefresh } from "./api";

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
