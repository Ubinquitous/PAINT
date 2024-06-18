import { NextResponse } from "next/server";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";
import { jwtUtils } from "~/lib/jwtUtils";
import { prismaClient } from "~/lib/prismaClient";

export async function GET() {
  const { connectedId } = jwtUtils().verify(getAuthorizationToken());

  const data = await prismaClient.trade;

  return NextResponse.json({ status: 200 });
}
