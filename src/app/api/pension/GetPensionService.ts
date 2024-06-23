import { NextResponse } from "next/server";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";
import { jwtUtils } from "~/lib/jwtUtils";
import { prismaClient } from "~/lib/prismaClient";

class GetPensionService {
  public async execute() {
    const { connectedId } = jwtUtils().verify(getAuthorizationToken());
    const { pension: pensionData } =
      (await prismaClient.pension.findUnique({
        where: { connectedId },
      })) || {};
    const pension = JSON.parse(pensionData || "{}");
    return NextResponse.json({ status: 200, pension });
  }
}

export default GetPensionService;
