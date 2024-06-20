import GetAverageScoreService from "./GetAverageScoreService";

export async function GET() {
  const getAverageScoreService = new GetAverageScoreService();
  return getAverageScoreService.execute();
}
