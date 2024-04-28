import { prismaClient } from "~/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { publicEncRSA } from "~/lib/publicEncRSA";
import { codef } from "../..";
import { decodeToJson } from "~/lib/decodeToJson";
import { jwtUtils } from "~/lib/jwtUtils";
import { codefAuthorization } from "~/lib/codefAuthorization";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";

class AccountTokenRefreshService {
  public async execute(req: NextRequest) {
    const jwt = jwtUtils();
    const token = getAuthorizationToken();
    const { connectedId } = jwt.verify(token);
    const isCorrectRefresh = jwt.refreshVerify(token);

    if (!isCorrectRefresh) {
      return NextResponse.json({
        status: 400,
        message: "유효한 리프래시 토큰이 아닙니다.",
      });
    }
    return NextResponse.json({
      status: 200,
      message: "생성 성공",
      data: {
        access_token: jwtUtils().sign(connectedId),
        refresh_token: jwtUtils().refresh(connectedId),
      },
    });
  }
}

export default AccountTokenRefreshService;
