import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import { codefAuthorization } from "~/lib/codefAuthorization";
import { decodeToJson } from "~/lib/decodeToJson";
import { ConnectedCommonVerifyRequestDto } from "~/lib/dto/ConnectedCommonVerifyRequestDto";
import { ConnectedVerifyRequestDto } from "~/lib/dto/ConnectedVerifyRequestDto";
import { jwtUtils } from "~/lib/jwtUtils";
import { prismaClient } from "~/lib/prismaClient";
import { publicEncRSA } from "~/lib/publicEncRSA";
import { codef } from "../..";
import { AccountRegisterRequestDto } from "./AccountRegisterRequestDto";
import { AccountRegisterVerification } from "./AccountRegisterVerification";

class AccountRegisterService {
  public async execute(req: NextRequest) {
    const request = (await req.json()) as AccountRegisterRequestDto;
    const validation = AccountRegisterVerification.safeParse(request);

    if (!validation.success)
      return NextResponse.json(validation.error.issues, { status: 400 });

    const result = await this.registerAccount(request);
    const {
      password,
      birthDate,
      certFile,
      userName,
      organization: organizationList,
    } = request;

    const { data } = decodeToJson(result);
    const { connectedId } = data;
    const organization = JSON.parse(organizationList)[0];

    await prismaClient.user.create({
      data: {
        password: publicEncRSA(password),
        connectedId,
        birthDate,
        certFile,
        userName,
        organization,
        spendingTargetAmount: "0",
        tagInfo: `{ "1": 5000, "2": 10000, "3": 15000 }`,
      },
    });

    const accountResult = await this.getAccountList({
      connectedId,
      organization,
    });

    const { data: account } = decodeToJson(accountResult);

    const threeMonthsAgo = dayjs().subtract(3, "month");
    const endDate = dayjs().format("YYYYMMDD");
    const startDate = threeMonthsAgo.format("YYYYMMDD");

    if (Array.isArray(account.resDepositTrust)) {
      for (const deposit of account.resDepositTrust) {
        const { id: accountId } = await prismaClient.account.create({
          data: {
            connectedId,
            organization,
            accountName: deposit.resAccountName,
            accountNumber: deposit.resAccount,
            accountDisplay: deposit.resAccountDisplay,
            accountBalance: Number(deposit.resAccountBalance),
            accountCreatedAt: deposit.resAccountStartDate,
            accountRefreshedAt: deposit.resLastTranDate,
          },
        });

        const tradeResult = await this.getCommonTradeList({
          organization,
          connectedId,
          account: deposit.resAccount,
          startDate,
          endDate,
        });
        const { data: tradeList } = decodeToJson(tradeResult);

        if (Array.isArray(tradeList.resTrHistoryList)) {
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
      }
    }

    return NextResponse.json({
      status: 200,
      message: "생성 성공",
      data: {
        access_token: jwtUtils().sign(data.connectedId),
        refresh_token: jwtUtils().refresh(data.connectedId),
      },
    });
  }

  private async registerAccount(dto: AccountRegisterRequestDto) {
    const { password, organization } = dto;
    const { data } = await codef.post(
      "/v1/account/create",
      {
        accountList: [
          {
            ...dto,
            organization: JSON.parse(organization)[0],
            password: publicEncRSA(password),
            businessType: "BK",
            clientType: "P", // clientType: 개인
            loginType: "0", // loginType: 공동인증서
            loginTypeLevel: "",
            clientTypeLevel: "",
            cardNo: "",
            cardPassword: "",
          },
        ],
      },
      await codefAuthorization()
    );
    return data;
  }

  private async getAccountList(request: ConnectedCommonVerifyRequestDto) {
    const { data } = await codef.get("/v1/kr/bank/p/account/account-list", {
      data: request,
      ...(await codefAuthorization()),
    });
    return data;
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
}

export default AccountRegisterService;
