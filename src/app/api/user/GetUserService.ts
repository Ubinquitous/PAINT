import { NextResponse } from "next/server";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";
import { jwtUtils } from "~/lib/jwtUtils";
import { prismaClient } from "~/lib/prismaClient";

class GetUserService {
  public async execute() {
    const { connectedId } = jwtUtils().verify(getAuthorizationToken());
    const data = await prismaClient.user.findUnique({
      where: { connectedId },
      select: {
        birthDate: true,
        userName: true,
      },
    });
    return NextResponse.json({ ...data });
  }
}

export default GetUserService;
