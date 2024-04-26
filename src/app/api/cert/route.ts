import { NextRequest, NextResponse } from "next/server";
import GetCertificationListService from "./GetCertificationListService";
import GetFormattedCertificationService from "./GetFormattedCertificationService";

export async function GET() {
  const getCertificationListService = GetCertificationListService();
  const data = await getCertificationListService.execute();
  return NextResponse.json({ status: 200, data });
}

export async function POST(req: NextRequest) {
  const getFormattedCertificationService =
    GetFormattedCertificationService(req);
  const data = await getFormattedCertificationService.execute();
  return NextResponse.json(data);
}
