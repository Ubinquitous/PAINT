import { NextRequest } from "next/server";
import GetMyTargetService from "./GetMyTargetService";
import TargetSaveService from "./TargetSaveService";

export async function GET() {
  const getMyTargetService = new GetMyTargetService();
  return getMyTargetService.execute();
}

export async function POST(req: NextRequest) {
  const targetSaveService = new TargetSaveService();
  return targetSaveService.execute(req);
}
