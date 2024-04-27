import { NextRequest } from "next/server";
import GetAccountListService from "./GetAccountListService";

export async function GET(req: NextRequest) {
  const getAccountListService = new GetAccountListService();
  return getAccountListService.execute(req);
}
