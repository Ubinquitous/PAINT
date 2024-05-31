import { NextRequest, NextResponse } from "next/server";
import { codefAuthorization } from "~/lib/codefAuthorization";
import { decodeToJson } from "~/lib/decodeToJson";
import { ConnectedCommonVerifyRequestDto } from "~/lib/dto/ConnectedCommonVerifyRequestDto";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";
import { jwtUtils } from "~/lib/jwtUtils";
import { prismaClient } from "~/lib/prismaClient";
import { codef } from "../..";

class GetAccountListService {
  public async execute(req: NextRequest) {
    const { connectedId } = jwtUtils().verify(getAuthorizationToken());

    const data = await prismaClient.user.findUnique({ where: { connectedId } });
    const organizationList = JSON.parse(data?.organization || "[]");

    const accountList = {
      resDepositTrust: [] as any,
      resForeignCurrency: [] as any,
      resFund: [] as any,
      resLoan: [] as any,
      resInsurance: [] as any,
    };

    for (const organization of organizationList) {
      const { data } = decodeToJson(
        await this.getAccountList({ connectedId, organization })
      );

      if (data.resDepositTrust.length)
        accountList.resDepositTrust.push(data.resDepositTrust);
      if (data.resForeignCurrency.length)
        accountList.resForeignCurrency.push(data.resForeignCurrency);
      if (data.resFund.length) accountList.resFund.push(data.resFund);
      if (data.resLoan.length) accountList.resLoan.push(data.resLoan);
      if (data.resInsurance.length)
        accountList.resInsurance.push(data.resInsurance);
    }

    return NextResponse.json({ status: 200, accountList });
  }

  private async getAccountList(request: ConnectedCommonVerifyRequestDto) {
    const { data } = await codef.get("/v1/kr/bank/p/account/account-list", {
      data: request,
      ...(await codefAuthorization()),
    });
    return data;
  }
}

export default GetAccountListService;
