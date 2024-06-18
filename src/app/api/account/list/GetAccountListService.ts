import { NextResponse } from "next/server";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";
import { jwtUtils } from "~/lib/jwtUtils";
import { prismaClient } from "~/lib/prismaClient";

class GetAccountListService {
  public async execute() {
    const { connectedId } = jwtUtils().verify(getAuthorizationToken());

    const data = await prismaClient.account.findMany({
      where: { connectedId },
      select: {
        id: true,
        organization: true,
        accountName: true,
        accountNumber: true,
        accountDisplay: true,
        accountBalance: true,
        accountCreatedAt: true,
        accountRefreshedAt: true,
      },
    });

    return NextResponse.json({ status: 200, data });
  }
}

export default GetAccountListService;
