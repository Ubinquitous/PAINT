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

    console.log(tradeList);

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
    const topOfSumIncomeByCorrespondent = Object.fromEntries(
      Object.entries(sumIncomeByCorrespondent)
        .sort((a, b) => (b[1] as any) - (a[1] as any))
        .slice(0, 5)
    );

    const sumExpenditureByCorrespondent = expenditureTradeList.reduce(
      (acc: any, transaction) => {
        const method = transaction.correspondent;
        if (!acc[method]) acc[method] = 0;
        acc[method] += transaction.amount;
        return acc;
      },
      {}
    );
    const topOfSumExpenditureByCorrespondent = Object.fromEntries(
      Object.entries(sumExpenditureByCorrespondent)
        .sort((a, b) => (b[1] as any) - (a[1] as any))
        .slice(0, 5)
    );

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
    const topOfSumIncomeByPaymentMethod = Object.fromEntries(
      Object.entries(sumIncomeByPaymentMethod)
        .sort((a, b) => (b[1] as any) - (a[1] as any))
        .slice(0, 5)
    );

    const sumExpenditureByPaymentMethod = expenditureTradeList.reduce(
      (acc: any, transaction) => {
        const method = transaction.paymentMethod;
        if (!acc[method]) acc[method] = 0;
        acc[method] += transaction.amount;
        return acc;
      },
      {}
    );
    const topOfSumExpenditureByPaymentMethod = Object.fromEntries(
      Object.entries(sumExpenditureByPaymentMethod)
        .sort((a, b) => (b[1] as any) - (a[1] as any))
        .slice(0, 5)
    );

    /** top of list */
    const topOfIncomeList = incomeTradeList
      .sort((a, b) => a.amount - b.amount)
      .reverse()
      .slice(0, 5);

    const topOfExpenditureList = expenditureTradeList
      .filter((a) => Number(`${a.category}${a.amount}`) < 0)
      .sort((a, b) => a.amount - b.amount)
      .reverse()
      .slice(0, 5);

    const tradeAmountList = tradeList.map((s) =>
      Number(`${s.category}${s.amount}`)
    );
    const amountInList = tradeAmountList.filter((amount) => amount > 0);
    const amountOutList = tradeAmountList.filter((amount) => amount < 0);

    return NextResponse.json({
      expenditure: Math.abs(sum(amountOutList)),
      income: sum(amountInList),
      total: sum(tradeAmountList),
      topOfIncomeList,
      topOfExpenditureList,
      topOfSumIncomeByPaymentMethod,
      topOfSumExpenditureByPaymentMethod,
      topOfSumIncomeByCorrespondent,
      topOfSumExpenditureByCorrespondent,
    });
  }
}

export default GetSpendAtMonthService;
