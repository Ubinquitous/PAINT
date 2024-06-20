import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import { codefAuthorization } from "~/lib/codefAuthorization";
import { decodeToJson } from "~/lib/decodeToJson";
import { ConnectedCommonVerifyRequestDto } from "~/lib/dto/ConnectedCommonVerifyRequestDto";
import { ConnectedVerifyRequestDto } from "~/lib/dto/ConnectedVerifyRequestDto";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";
import { jwtUtils } from "~/lib/jwtUtils";
import { prismaClient } from "~/lib/prismaClient";
import { codef } from "../..";

class AccountTradeRefreshService {
  public async execute(req: NextRequest) {
    const { connectedId } = jwtUtils().verify(getAuthorizationToken());
    const accountNumber = req.nextUrl.pathname.replace("/api/refresh/", "");

    const { organization } = (await prismaClient.account.findUnique({
      where: { connectedId, accountNumber },
    })) || { organization: "" };
    const threeMonthsAgo = dayjs().subtract(3, "month");
    const endDate = dayjs().format("YYYYMMDD");
    const startDate = threeMonthsAgo.format("YYYYMMDD");

    const tradeResult = await this.getCommonTradeList({
      organization,
      connectedId,
      account: accountNumber,
      startDate,
      endDate,
    });
    const { data: tradeList } = decodeToJson(tradeResult);

    const { id: accountId } = (await prismaClient.account.findUnique({
      where: { accountNumber },
    })) || { id: -1 };

    const accountResult = await this.getAccountList({
      connectedId,
      organization,
    });
    const { data: account } = decodeToJson(accountResult);
    if (account.resDepositTrust) {
      for (const deposit of account.resDepositTrust) {
        await prismaClient.account.upsert({
          where: { accountNumber },
          create: {
            connectedId,
            organization,
            accountName: deposit.resAccountName,
            accountNumber: deposit.resAccount,
            accountDisplay: deposit.resAccountDisplay,
            accountBalance: Number(deposit.resAccountBalance),
            accountCreatedAt: deposit.resAccountStartDate,
            accountRefreshedAt: deposit.resLastTranDate,
          },
          update: {
            accountBalance: Number(deposit.resAccountBalance),
            accountRefreshedAt: deposit.resLastTranDate,
          },
        });
      }
    }

    if (Array.isArray(tradeList.resTrHistoryList)) {
      await prismaClient.trade.deleteMany({ where: {} });
      for (const trade of tradeList.resTrHistoryList) {
        const isExpenditure = !!Number(trade.resAccountIn);
        const amount = isExpenditure
          ? Number(trade.resAccountIn)
          : Number(trade.resAccountOut);
        const category = isExpenditure ? "+" : "-";
        const date = `${trade.resAccountTrDate}${trade.resAccountTrTime}`;
        const tradedAt = dayjs(date, "YYYYMMDDHHmmss").format();
        await prismaClient.trade.create({
          data: {
            tradedAt,
            amount,
            category,
            paymentMethod: trade.resAccountDesc2,
            correspondent: trade.resAccountDesc3,
            afterBalance: Number(trade.resAfterTranBalance),
            accountId,
          },
        });
      }
    }

    return NextResponse.json({ status: 200, accountNumber });
  }

  private async getCommonTradeList(request: ConnectedVerifyRequestDto) {
    const { data } = await codef.get("/v1/kr/bank/p/account/transaction-list", {
      data: {
        ...request,
        orderBy: "0",
        inquiryType: "1",
      },
      ...(await codefAuthorization()),
    });
    return data;
  }

  private async getAccountList(request: ConnectedCommonVerifyRequestDto) {
    const { data } = await codef.get("/v1/kr/bank/p/account/account-list", {
      data: request,
      ...(await codefAuthorization()),
    });
    return data;
  }
}

export default AccountTradeRefreshService;
