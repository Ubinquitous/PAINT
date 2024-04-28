import { NextRequest } from "next/server";
import GetStockTradeListService from "./GetStockTradeListService";

export async function POST(req: NextRequest) {
  const getStockTradeListService = new GetStockTradeListService();
  return getStockTradeListService.execute(req);
}
