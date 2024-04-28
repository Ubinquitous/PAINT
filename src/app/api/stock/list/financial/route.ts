import { NextRequest } from "next/server";
import GetFinancialListService from "./GetFinancialListService";

export async function POST(req: NextRequest) {
  const getFinancialListService = new GetFinancialListService();
  return getFinancialListService.execute(req);
}
