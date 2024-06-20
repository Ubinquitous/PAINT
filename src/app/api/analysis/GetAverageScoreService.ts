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

    console.log(myExpenditure.amount.d[0]);
    console.log(list);
    // Step 1: Extract amounts and convert to numbers
    const data = [
      { amount: "1245789" },
      { amount: "1834567" },
      { amount: "1578934" },
      { amount: "1987654" },
      { amount: "1765432" },
      { amount: "1123456" },
      { amount: "1324567" },
      { amount: "1456789" },
      { amount: "1623456" },
      { amount: "1543210" },
      { amount: "1897654" },
      { amount: "1267766" },
      { amount: "1234567" },
      { amount: "1767890" },
      { amount: "1127890" },
      { amount: "1000000" },
      { amount: "1654321" },
      { amount: "1981234" },
      { amount: "1712345" },
      { amount: "1865432" },
      { amount: "1498765" },
      { amount: "1789123" },
    ];

    const amounts = data.map((item) => Number(item.amount));

    amounts.sort((a, b) => a - b);
    console.log(amounts);

    const myAmount = Number(myExpenditure.amount.d[0]);
    const rank = amounts.findIndex((amount) => amount === myAmount) + 1;

    console.log(rank);
    const percentage = ((amounts.length - rank) / amounts.length) * 100;

    const score = Math.round(percentage);
    console.log(`Your expenditure is in the top ${percentage}% of the list.`);
    console.log(`Your score is: ${100 - score}`);

    return NextResponse.json({
      status: 200,
      score: Math.round(percentage),
      percentage: 100 - score,
      average: sum(amounts) / amounts.length,
    });
  }
}

export default GetAverageScoreService;
