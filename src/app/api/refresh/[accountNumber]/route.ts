import { NextRequest } from "next/server";
import AccountTradeRefreshService from "./AccountTradeRefreshService";

export async function POST(req: NextRequest) {
  const accountTradeRefreshService = new AccountTradeRefreshService();
  return accountTradeRefreshService.execute(req);
}
