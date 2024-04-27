import { codefAuthorization } from "~/lib/codefAuthorization";
import { codef } from "../..";
import { NextRequest, NextResponse } from "next/server";
import { decodeToJson } from "~/lib/decodeToJson";
import { ConnectedCommonVerifyRequestDto } from "~/lib/dto/ConnectedCommonVerifyRequestDto";
import { ConnectedCommonVerifyVerficiation } from "~/lib/dto/ConnectedCommonVerifyVerification";

class GetAccountListService {
  public async execute(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const request = {
      organization: searchParams.get("organization"),
      connectedId: searchParams.get("connectedId"),
    } as ConnectedCommonVerifyRequestDto;
    const validation = ConnectedCommonVerifyVerficiation.safeParse(request);

    if (!validation.success)
      return NextResponse.json(validation.error.issues, { status: 400 });

    const { data } = decodeToJson(await this.getAccountList(request));

    return NextResponse.json({ status: 200, data });
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
