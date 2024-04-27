import { NextRequest } from "next/server";
import GetCommonTradeListService from "./GetCommonTradeListService";

export async function POST(req: NextRequest) {
  const getCommonTradeListService = new GetCommonTradeListService();
  return getCommonTradeListService.execute(req);
}
