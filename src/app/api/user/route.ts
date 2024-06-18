import GetUserService from "./GetUserService";

export async function GET() {
  const getUserService = new GetUserService();
  return getUserService.execute();
}
