import { codefAuthorization } from "~/lib/codefAuthorization";
import { NextRequest, NextResponse } from "next/server";
import { decodeToJson } from "~/lib/decodeToJson";
import { GetStockTradeListRequestDto } from "../trade/GetStockTradeListRequestDto";
import { GetStockTradeListVerification } from "../trade/GetStockTradeListVerification";
import { codef } from "../..";
import { jwtUtils } from "~/lib/jwtUtils";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";

class GetStockBalanceService {
  public async execute(req: NextRequest) {
    const { connectedId } = jwtUtils().verify(getAuthorizationToken());
    const request = (await req.json()) as GetStockTradeListRequestDto;
    const validation = GetStockTradeListVerification.safeParse(request);

    if (!validation.success)
      return NextResponse.json(validation.error.issues, { status: 400 });

    const { data } = decodeToJson(
      await this.getStockBalance({ ...request, connectedId })
    );

    return NextResponse.json({ status: 200, data });
  }

  private async getStockBalance(request: GetStockTradeListRequestDto) {
    const { data } = await codef.get("/v1/kr/stock/a/account/balance-inquiry", {
      data: request,
      ...(await codefAuthorization()),
    });
    return data;
  }
}

export default GetStockBalanceService;