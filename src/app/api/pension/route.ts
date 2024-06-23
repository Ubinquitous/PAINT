import GetPensionService from "./GetPensionService";
import RefreshPensionService from "./RefreshPensionService";

export async function GET() {
  const getPensionService = new GetPensionService();
  return getPensionService.execute();
}

export async function POST() {
  const refreshPensionService = new RefreshPensionService();
  return refreshPensionService.execute();
}
