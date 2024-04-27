import { NextRequest } from "next/server";
import GetLoanTradeListService from "./GetLoanTradeListService";

export async function POST(req: NextRequest) {
  const getLoanTradeListService = new GetLoanTradeListService();
  return getLoanTradeListService.execute(req);
}
