import { NextRequest, NextResponse } from "next/server";
import { publicEncRSA } from "~/lib/publicEncRSA";
import { codef } from "../..";
import { AccountAddRequestDto } from "./AccountAddRequestDto";
import { AccountAddVerification } from "./AccountAddVerification";
import { codefAuthorization } from "~/lib/codefAuthorization";
import { jwtUtils } from "~/lib/jwtUtils";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";

class AccountAddService {
  public async execute(req: NextRequest) {
    const { connectedId } = jwtUtils().verify(getAuthorizationToken());
    const request = (await req.json()) as AccountAddRequestDto;
    const validation = AccountAddVerification.safeParse(request);

    if (!validation.success)
      return NextResponse.json(validation.error.issues, { status: 400 });

    await this.addAccount(request, connectedId);
    return NextResponse.json({ status: 200, message: "생성 성공" });
  }

  private async addAccount(dto: AccountAddRequestDto, connectedId: string) {
    const { password } = dto;
    const { data } = await codef.post(
      "/v1/account/add",
      {
        connectedId,
        accountList: [
          {
            ...dto,
            password: publicEncRSA(password),
            businessType: "BK", // businessType: 은행, 저축은행
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
}

export default AccountAddService;
