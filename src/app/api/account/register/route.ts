import { NextRequest } from "next/server";
import AccountRegisterService from "./AccountRegisterService";

export async function POST(req: NextRequest) {
  const accountRegisterService = new AccountRegisterService();
  return accountRegisterService.execute(req);
}
