import { NextRequest } from "next/server";
import AccountAddService from "./AccountAddService";

export async function POST(req: NextRequest) {
  const accountAddService = new AccountAddService();
  return accountAddService.execute(req);
}
