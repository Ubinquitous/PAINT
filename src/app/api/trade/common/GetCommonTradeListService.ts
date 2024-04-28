import { codefAuthorization } from "~/lib/codefAuthorization";
import { codef } from "../..";
import { NextRequest, NextResponse } from "next/server";
import { decodeToJson } from "~/lib/decodeToJson";
import { ConnectedVerifyRequestDto } from "~/lib/dto/ConnectedVerifyRequestDto";
import { ConnectedVerifyVerification } from "~/lib/dto/ConnectedVerifyVerfication";
import { jwtUtils } from "~/lib/jwtUtils";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";

class GetCommonTradeListService {
  public async execute(req: NextRequest) {
    const { connectedId } = jwtUtils().verify(getAuthorizationToken());
    const request = (await req.json()) as ConnectedVerifyRequestDto;

    const validation = ConnectedVerifyVerification.safeParse({
      ...request,
      connectedId,
    });

    if (!validation.success)
      return NextResponse.json(validation.error.issues, { status: 400 });

    const { data } = decodeToJson(
      await this.getCommonTradeList({ ...request, connectedId })
    );

    return NextResponse.json({ status: 200, data });
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

export default GetCommonTradeListService;
