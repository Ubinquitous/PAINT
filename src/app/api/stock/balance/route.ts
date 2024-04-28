import { NextRequest } from "next/server";
import GetStockBalanceService from "./GetStockBalanceService";

export async function POST(req: NextRequest) {
  const getStockBalanceService = new GetStockBalanceService();
  return getStockBalanceService.execute(req);
}
