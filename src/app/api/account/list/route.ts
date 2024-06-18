import GetAccountListService from "./GetAccountListService";

export async function GET() {
  const getAccountListService = new GetAccountListService();
  return getAccountListService.execute();
}
