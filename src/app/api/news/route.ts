import GetNewsService from "./GetNewsService";

export async function GET() {
  const getNewsService = new GetNewsService();
  return getNewsService.execute();
}
