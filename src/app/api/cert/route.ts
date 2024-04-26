import { NextResponse } from "next/server";
import GetCertificationListService from "./GetCertificationListService";

export async function GET() {
  const getCertificationListService = GetCertificationListService();
  const data = await getCertificationListService.execute();
  return NextResponse.json({ status: 200, data });
}
