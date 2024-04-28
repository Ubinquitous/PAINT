import { NextRequest } from "next/server";
import AccountTokenRefreshService from "./AccountTokenRefreshService";

export async function PATCH(req: NextRequest) {
  const accountTokenRefreshService = new AccountTokenRefreshService();
  return accountTokenRefreshService.execute(req);
}
