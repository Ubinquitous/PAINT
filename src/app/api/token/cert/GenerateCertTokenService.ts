import parse from "url-parse";
import axios from "axios";
import { prismaClient } from "~/lib/prismaClient";
import { NextResponse } from "next/server";
import environment from "~/lib/globalEnv";

class GenerateCertTokenService {
  public async execute() {
    const { data } = await this.getCertToken();

    const entity = {
      access_token: data.token,
      scope: "read",
      token_type: "bearer",
      expires_in: -1,
      token_name: "cert",
    };

    await prismaClient.token.upsert({
      where: { token_name: "cert" },
      update: entity,
      create: entity,
    });
    return NextResponse.json({ status: 200, message: "토큰 발급 성공" });
  }

  private async getCertToken() {
    const { data } = await axios.post(
      `${environment.CODEF_ADMIN_URL}/oauth/token`
    );
    return data;
  }
}

export default GenerateCertTokenService;
