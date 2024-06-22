import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import { getAuthorizationToken } from "~/lib/getAuthorizationToken";
import { jwtUtils } from "~/lib/jwtUtils";
import { prismaClient } from "~/lib/prismaClient";
import { sum } from "~/lib/sum";

class GetSpendAtMonthService {
  public async execute(req: NextRequest) {
    const { connectedId } = jwtUtils().verify(getAuthorizationToken());
    const year = dayjs().year();
    const month = req.nextUrl.pathname.replace("/api/spend/", "");

    const startOfMonth = dayjs(`${year}-${month}-01`).startOf("month").toDate();
    const endOfMonth = dayjs(`${year}-${month}-01`).endOf("month").toDate();

    const accountList = await prismaClient.account.findMany({
      where: { connectedId },
    });
    const accountIdList = accountList.map((account) => account.id);
    const tradeList = await prismaClient.trade.findMany({
      where: {
        tradedAt: { gte: startOfMonth, lt: endOfMonth },
        accountId: { in: accountIdList },
      },
    });

    const { tagInfo } =
      (await prismaClient.user.findUnique({
        where: { connectedId },
      })) || {};

    const tag = JSON.parse(tagInfo || "{}");

    const tagList = tradeList
      .map((trade) => {
        if (trade.category === "-") {
          if (trade.amount < tag["1"]) return "현명해요";
          else if (trade.amount < tag["2"]) return "괜찮아요";
          else if (trade.amount < tag["3"]) return "위험해요";
          else return "갑작스러워요";
        }
        return null;
      })
      .filter((s) => !!s);

    const countOccurrences = (arr: any) => {
      return arr.reduce((acc: any, curr: any) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {});
    };

    const tagCount = countOccurrences(tagList);

    const incomeTradeList = tradeList.filter((trade) => trade.category === "+");
    const expenditureTradeList = tradeList.filter(
      (trade) => trade.category === "-"
    );

    /** top of correspondent */
    const sumIncomeByCorrespondent = incomeTradeList.reduce(
      (acc: any, transaction) => {
        const method = transaction.correspondent;
        if (!acc[method]) acc[method] = 0;
        acc[method] += transaction.amount;
        return acc;
      },
      {}
    );
    const topOfSumIncomeByCorrespondent = Object.entries(
      sumIncomeByCorrespondent
    )
      .sort((a, b) => (b[1] as any) - (a[1] as any))
      .slice(0, 3)
      .map((s) => ({ name: s[0], amount: s[1] }));

    const sumExpenditureByCorrespondent = expenditureTradeList.reduce(
      (acc: any, transaction) => {
        const method = transaction.correspondent;
        if (!acc[method]) acc[method] = 0;
        acc[method] += transaction.amount;
        return acc;
      },
      {}
    );
    const topOfSumExpenditureByCorrespondent = Object.entries(
      sumExpenditureByCorrespondent
    )
      .sort((a, b) => (b[1] as any) - (a[1] as any))
      .slice(0, 3)
      .map((s) => ({ name: s[0], amount: s[1] }));

    /** top of payment method */
    const sumIncomeByPaymentMethod = incomeTradeList.reduce(
      (acc: any, transaction) => {
        const method = transaction.paymentMethod;
        if (!acc[method]) acc[method] = 0;
        acc[method] += transaction.amount;
        return acc;
      },
      {}
    );
    const topOfSumIncomeByPaymentMethod = Object.entries(
      sumIncomeByPaymentMethod
    )
      .sort((a, b) => (b[1] as any) - (a[1] as any))
      .slice(0, 3)
      .map((s) => ({ name: s[0], amount: s[1] }));

    const sumExpenditureByPaymentMethod = expenditureTradeList.reduce(
      (acc: any, transaction) => {
        const method = transaction.paymentMethod;
        if (!acc[method]) acc[method] = 0;
        acc[method] += transaction.amount;
        return acc;
      },
      {}
    );

    const topOfSumExpenditureByPaymentMethod = Object.entries(
      sumExpenditureByPaymentMethod
    )
      .sort((a, b) => (b[1] as any) - (a[1] as any))
      .slice(0, 3)
      .map((s) => ({ name: s[0], amount: s[1] }));

    /** top of list */
    const topOfIncomeList = incomeTradeList
      .sort((a, b) => a.amount - b.amount)
      .reverse()
      .slice(0, 3);

    const topOfExpenditureList = expenditureTradeList
      .filter((a) => Number(`${a.category}${a.amount}`) < 0)
      .sort((a, b) => a.amount - b.amount)
      .reverse()
      .slice(0, 3);

    const tradeAmountList = tradeList.map((s) =>
      Number(`${s.category}${s.amount}`)
    );
    const amountInList = tradeAmountList.filter((amount) => amount > 0);
    const amountOutList = tradeAmountList.filter((amount) => amount < 0);

    const { spendingTargetAmount } =
      (await prismaClient.user.findUnique({ where: { connectedId } })) || {};

    return NextResponse.json({
      expenditure: Math.abs(sum(amountOutList)),
      income: sum(amountInList),
      total: sum(tradeAmountList),
      spendingTargetAmount,
      topOfIncomeList,
      tagCount,
      topOfExpenditureList,
      topOfSumIncomeByPaymentMethod,
      topOfSumExpenditureByPaymentMethod,
      topOfSumIncomeByCorrespondent,
      topOfSumExpenditureByCorrespondent,
    });
  }
}

export default GetSpendAtMonthService;
