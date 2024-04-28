import { z } from "zod";

export const GetStockTradeListVerification = z.object({
  organization: z.string(),
  connectedId: z.string(),
  account: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  accountPassword: z.string(),
});
