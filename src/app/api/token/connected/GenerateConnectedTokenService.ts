import axios from "axios";
import { NextResponse } from "next/server";
import parse from "url-parse";
import environment from "~/lib/globalEnv";
import { prismaClient } from "~/lib/prismaClient";

class GenerateConnectedTokenService {
  public async execute() {
    const { href: uri } = parse(environment.CLIENT_OAUTH_URL);
    const basic = `${environment.CLIENT_ID}:${environment.CLIENT_SECRET}`;
    const header = btoa(basic);
    const data = await this.getConnectedToken(uri, header);

    await prismaClient.token.upsert({
      where: { token_name: "connectedId" },
      update: { ...data, token_name: "connectedId" },
      create: { ...data, token_name: "connectedId" },
    });
    return NextResponse.json({ status: 200, message: "토큰 발급 성공" });
  }

  private async getConnectedToken(uri: string, header: string) {
    const options = "grant_type=client_credentials&scope=read";
    const { data } = await axios.post(uri, options, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${header}`,
      },
    });
    return data;
  }
}

export default GenerateConnectedTokenService;
