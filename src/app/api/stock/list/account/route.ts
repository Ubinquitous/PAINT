import { NextRequest } from "next/server";
import GetStockAccountListService from "./GetStockAccountListService";

export async function GET(req: NextRequest) {
  const getStockAccountListService = new GetStockAccountListService();
  return getStockAccountListService.execute(req);
}
