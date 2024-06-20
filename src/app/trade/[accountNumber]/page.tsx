"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Column, Row } from "~/components/Flex";
import Loader from "~/components/atoms/Loader";
import { ArrowIcon, RefreshIcon } from "~/components/icons";
import { bankColor, bankRecord } from "~/data";
import { useTradeRefreshMutation } from "~/services/account/mutation";
import { accountQuery } from "~/services/account/query";
import { theme } from "~/styles";
import { withComma } from "~/utils";
import TradeItem from "./TradeItem";
import * as L from "./style";

const Trade = () => {
  const accountNumber = usePathname().replace("/trade/", "");
  const { data, isSuccess } = useQuery(
    accountQuery.getTradeList(accountNumber)
  );
  const { mutate } = useTradeRefreshMutation();
  if (!isSuccess) return <Loader />;

  const { accountName } = data.account;

  const slicedAcName =
    accountName.length > 10 ? `${accountName.slice(0, 10)}...` : accountName;

  const handleTradeRefreshClick = () => {
    mutate(accountNumber);
  };

  return (
    <L.Container color={bankColor[data.account.organization]}>
      <L.BankImage
        src={`/assets/bank/${data.account.organization}.png`}
        alt="bank image"
        width={9999}
        height={9999}
      />
      <L.Header>
        <Column gap="14px">
          <L.BackButton href="/home">
            <ArrowIcon fill={theme.white} />
            {bankRecord[data.account.organization]} {slicedAcName}
          </L.BackButton>
          <L.AccountNumberText>
            {data.account.accountDisplay}
          </L.AccountNumberText>
        </Column>
        <L.AccountInfoBox>
          <L.AccountNumberText>계좌 잔액</L.AccountNumberText>
          <Row alignItems="center" gap="8px">
            <L.Title>{withComma(data.account.accountBalance)}원</L.Title>
            <RefreshIcon onClick={handleTradeRefreshClick} fill={theme.white} />
          </Row>
        </L.AccountInfoBox>
      </L.Header>
      <L.Body>
        <L.AccountText>거래 내역</L.AccountText>
        <L.TradeList>
          {data.tradeList.map((trade: any) => {
            const amount = Number(`${trade.category}${trade.amount}`);
            return (
              <TradeItem
                key={trade.id}
                amount={amount}
                correspondent={trade.correspondent}
                timestamp={trade.tradedAt}
              />
            );
          })}
          {!data.tradeList.length && (
            <L.TradeNotFoundText>
              아직 거래내역이 존재하지 않아요
            </L.TradeNotFoundText>
          )}
        </L.TradeList>
      </L.Body>
    </L.Container>
  );
};

export default Trade;
