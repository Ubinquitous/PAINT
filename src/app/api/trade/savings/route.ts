import { NextRequest } from "next/server";
import GetSavingsTradeListService from "./GetSavingsTradeListService";

export async function POST(req: NextRequest) {
  const getSavingsTradeListService = new GetSavingsTradeListService();
  return getSavingsTradeListService.execute(req);
}
