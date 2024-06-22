import { NextRequest, NextResponse } from "next/server";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";
import { jwtUtils } from "~/lib/jwtUtils";
import { prismaClient } from "~/lib/prismaClient";

class TargetSaveService {
  public async execute(req: NextRequest) {
    const data = await req.json();
    const { connectedId } = jwtUtils().verify(getAuthorizationToken());
    const { spendingTargetAmount, tag } = data;

    await prismaClient.user.update({
      where: { connectedId },
      data: {
        spendingTargetAmount,
        tagInfo: JSON.stringify(tag),
      },
    });
    return NextResponse.json({ status: 200 });
  }
}

export default TargetSaveService;
