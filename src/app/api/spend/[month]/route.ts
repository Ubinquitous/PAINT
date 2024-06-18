import { NextRequest } from "next/server";
import GetSpendAtMonthService from "./GetSpendAtMonthService";

export async function GET(req: NextRequest) {
  const getSpendAtMonthService = new GetSpendAtMonthService();
  return getSpendAtMonthService.execute(req);
}
