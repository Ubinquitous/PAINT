import { NextResponse } from "next/server";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";
import { jwtUtils } from "~/lib/jwtUtils";
import { prismaClient } from "~/lib/prismaClient";

class AccountLoginService {
  public async execute() {
    const certFile = getAuthorizationToken();

    const [data] = await prismaClient.user.findMany({
      where: { certFile },
    });

    if (!data)
      return NextResponse.json({
        status: 404,
        message: "존재하지 않는 공동인증서에요.",
      });
    return NextResponse.json({
      status: 200,
      data: {
        access_token: jwtUtils().sign(data.connectedId),
        refresh_token: jwtUtils().refresh(data.connectedId),
      },
    });
  }
}

export default AccountLoginService;
