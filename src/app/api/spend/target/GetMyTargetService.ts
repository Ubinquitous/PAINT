import { NextResponse } from "next/server";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";
import { jwtUtils } from "~/lib/jwtUtils";
import { prismaClient } from "~/lib/prismaClient";

class GetMyTargetService {
  public async execute() {
    const { connectedId } = jwtUtils().verify(getAuthorizationToken());
    const { spendingTargetAmount, tagInfo } =
      (await prismaClient.user.findUnique({ where: { connectedId } })) || {};
    const tag = JSON.parse(tagInfo || "{}");
    return NextResponse.json({ status: 200, spendingTargetAmount, tag });
  }
}

export default GetMyTargetService;
