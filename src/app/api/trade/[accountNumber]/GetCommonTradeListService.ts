import { NextRequest, NextResponse } from "next/server";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";
import { jwtUtils } from "~/lib/jwtUtils";
import { prismaClient } from "~/lib/prismaClient";

class GetCommonTradeListService {
  public async execute(req: NextRequest) {
    const { connectedId } = jwtUtils().verify(getAuthorizationToken());
    const accountNumber = req.nextUrl.pathname.replace("/api/trade/", "");

    const { id: accountId } =
      (await prismaClient.account.findFirst({
        where: { accountNumber, connectedId },
      })) || {};

    const account = await prismaClient.account.findUnique({
      where: { accountNumber },
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

    const tradeList = await prismaClient.trade.findMany({
      where: { accountId },
    });

    return NextResponse.json({ status: 200, account, tradeList });
  }
}

export default GetCommonTradeListService;
