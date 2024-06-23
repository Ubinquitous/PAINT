import { jwtUtils } from "~/lib/jwtUtils";
import { codef } from "..";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";
import { prismaClient } from "~/lib/prismaClient";
import { decodeToJson } from "~/lib/decodeToJson";
import { codefAuthorization } from "~/lib/codefAuthorization";
import { NextResponse } from "next/server";

interface GetPensionProps {
  certFile: string;
  password: string;
  identity: string;
}

class RefreshPensionService {
  public async execute() {
    const { connectedId } = jwtUtils().verify(getAuthorizationToken());
    const data = await prismaClient.user.findUnique({ where: { connectedId } });

    if (data) {
      const { certFile, password, identity, birthDate } = data;
      const result = await this.getMyPension({
        certFile,
        password,
        identity: `${birthDate}${identity}`,
      });
      const { data: pension } = decodeToJson(result);
      await prismaClient.pension.upsert({
        where: {
          connectedId,
        },
        create: {
          connectedId,
          pension: JSON.stringify(pension),
        },
        update: {
          pension: JSON.stringify(pension),
        },
      });
      return NextResponse.json({ status: 200, pension });
    }
    return NextResponse.json({ status: 400 });
  }

  private async getMyPension(request: GetPensionProps) {
    const { certFile, password, identity } = request;
    const { data } = await codef.post(
      "v1/kr/public/pp/nps-minwon/my-pension",
      {
        organization: "0001",
        certType: "pfx",
        certFile,
        keyFile: "",
        certPassword: password,
        identity,
        identityEncYn: "",
        birthDate: "",
        id: "",
        loginType: "0",
        loginTypeLevel: "",
        userName: "",
        telecom: "",
        phoneNo: "",
      },
      await codefAuthorization()
    );

    return data;
  }
}

export default RefreshPensionService;
