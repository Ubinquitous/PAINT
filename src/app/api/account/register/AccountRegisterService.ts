import { prismaClient } from "~/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { publicEncRSA } from "~/lib/publicEncRSA";
import { getCodefToken } from "~/lib/getCodefToken";
import { codef } from "../..";
import { decodeToJson } from "~/lib/decodeToJson";
import { AccountRegisterVerification } from "./AccountRegisterVerification";
import { AccountRegisterRequestDto } from "./AccountRegisterRequestDto";
import { jwtUtils } from "~/lib/jwtUtils";
import { codefAuthorization } from "~/lib/codefAuthorization";

class AccountRegisterService {
  public async execute(req: NextRequest) {
    const request = (await req.json()) as AccountRegisterRequestDto;
    const validation = AccountRegisterVerification.safeParse(request);

    if (!validation.success)
      return NextResponse.json(validation.error.issues, { status: 400 });

    const result = await this.registerAccount(request);
    const { password, birthDate, identity, userName } = request;
    const { data } = decodeToJson(result);

    await prismaClient.user.create({
      data: {
        connectedId: data.connectedId,
        password: publicEncRSA(password),
        birthDate,
        identity,
        userName,
      },
    });
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
    const { password } = dto;
    const { data } = await codef.post(
      "/v1/account/create",
      {
        accountList: [
          {
            ...dto,
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
}

export default AccountRegisterService;
