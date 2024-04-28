import { codefAuthorization } from "~/lib/codefAuthorization";
import { codef } from "../..";
import { NextRequest, NextResponse } from "next/server";
import { decodeToJson } from "~/lib/decodeToJson";
import { ConnectedCommonVerifyRequestDto } from "~/lib/dto/ConnectedCommonVerifyRequestDto";
import { ConnectedCommonVerifyVerficiation } from "~/lib/dto/ConnectedCommonVerifyVerification";
import { jwtUtils } from "~/lib/jwtUtils";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";

class GetStockTradeListService {
  public async execute(req: NextRequest) {
    const { connectedId } = jwtUtils().verify(getAuthorizationToken());
    const request = (await req.json()) as ConnectedCommonVerifyRequestDto;
    const validation = ConnectedCommonVerifyVerficiation.safeParse({
      ...request,
      connectedId,
    });

    if (!validation.success)
      return NextResponse.json(validation.error.issues, { status: 400 });

    const { data } = decodeToJson(
      await this.getStockTradeList({ ...request, connectedId })
    );

    return NextResponse.json({ status: 200, data });
  }

  private async getStockTradeList(request: ConnectedCommonVerifyRequestDto) {
    const { data } = await codef.get(
      "/v1/kr/stock/a/account/transaction-list",
      {
        data: request,
        ...(await codefAuthorization()),
      }
    );
    return data;
  }
}

export default GetStockTradeListService;
