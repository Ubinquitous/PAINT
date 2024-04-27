import { codefAuthorization } from "~/lib/codefAuthorization";
import { codef } from "../..";
import { NextRequest, NextResponse } from "next/server";
import { decodeToJson } from "~/lib/decodeToJson";
import { ConnectedVerifyRequestDto } from "~/lib/dto/ConnectedVerifyRequestDto";
import { ConnectedVerifyVerification } from "~/lib/dto/ConnectedVerifyVerfication";

class GetLoanTradeListService {
  public async execute(req: NextRequest) {
    const request = (await req.json()) as ConnectedVerifyRequestDto;

    const validation = ConnectedVerifyVerification.safeParse(request);

    if (!validation.success)
      return NextResponse.json(validation.error.issues, { status: 400 });

    const { data } = decodeToJson(await this.getLoanTradeList(request));

    return NextResponse.json({ status: 200, data });
  }

  private async getLoanTradeList(request: ConnectedVerifyRequestDto) {
    const { data } = await codef.get("/v1/kr/bank/p/loan/transaction-list", {
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

export default GetLoanTradeListService;