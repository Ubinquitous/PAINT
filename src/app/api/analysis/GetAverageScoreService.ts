import { NextResponse } from "next/server";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";
import { jwtUtils } from "~/lib/jwtUtils";
import { prismaClient } from "~/lib/prismaClient";
import { sum } from "~/lib/sum";

class GetAverageScoreService {
  public async execute() {
    const { connectedId } = jwtUtils().verify(getAuthorizationToken());
    const [myExpenditure]: any =
      await prismaClient.$queryRaw`SELECT SUM(amount) AS amount FROM Trade t, Account a WHERE a.id = t.accountId and t.category = '-' and a.connectedId = ${connectedId};`;
    const list: Array<any> =
      await prismaClient.$queryRaw`SELECT SUM(amount) AS amount FROM Trade t, Account a WHERE a.id = t.accountId and t.category = '-' GROUP BY a.connectedId;`;

    const amounts = list
      .map((item) => item.amount.d[0])
      .map((item) => Number(item.amount))
      .sort((a, b) => a - b);

    const myAmount = Number(myExpenditure.amount.d[0]);
    const rank = amounts.findIndex((amount) => amount === myAmount) + 1;
    const percentage = ((amounts.length - rank) / amounts.length) * 100;
    let score = Math.round(percentage);

    if (score < 100) score += 1;

    return NextResponse.json({
      status: 200,
      score: Math.round(percentage),
      percentage: 100 - score,
      average: sum(amounts) / amounts.length,
    });
  }
}

export default GetAverageScoreService;
