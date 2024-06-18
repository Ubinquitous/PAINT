import { NextRequest, NextResponse } from "next/server";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";
import { jwtUtils } from "~/lib/jwtUtils";
import { prismaClient } from "~/lib/prismaClient";

class GetCommonTradeListService {
  public async execute(req: NextRequest) {
    const { connectedId } = jwtUtils().verify(getAuthorizationToken());
    const { accountNumber } = await req.json();

    const { id: accountId } =
      (await prismaClient.account.findFirst({
        where: { accountNumber },
      })) || {};

    const data = await prismaClient.trade.findMany({
      where: { accountId },
    });

    return NextResponse.json({ status: 200, data });
  }
}

export default GetCommonTradeListService;
