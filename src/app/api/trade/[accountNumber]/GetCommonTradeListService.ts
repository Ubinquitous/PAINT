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

    const { tagInfo } =
      (await prismaClient.user.findUnique({
        where: { connectedId },
      })) || {};
    const tag = JSON.parse(tagInfo || "{}");
    console.log(tag);
    const tradeListOne = await prismaClient.trade.findMany({
      where: { accountId },
    });

    const tradeList = tradeListOne.map((trade) => {
      if (trade.category === "-") {
        if (trade.amount < tag["1"]) return { ...trade, tag: "현명해요" };
        else if (trade.amount < tag["2"]) return { ...trade, tag: "괜찮아요" };
        else if (trade.amount < tag["3"]) return { ...trade, tag: "위험해요" };
        else return { ...trade, tag: "갑작스러워요" };
      }
      return trade;
    });

    return NextResponse.json({ status: 200, account, tradeList });
  }
}

export default GetCommonTradeListService;
