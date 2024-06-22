"use client";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Column, Row } from "~/components/Flex";
import Tag from "~/components/atoms/Tag";
import Footer from "~/components/common/Footer";
import RightArrowIcon from "~/components/icons/RightArrowIcon";
import { useUser } from "~/hooks/useUser";
import { accountQuery } from "~/services/account/query";
import { theme } from "~/styles";
import { round, withComma } from "~/utils";
import TradeItem from "../trade/[accountNumber]/TradeItem";
import Percent10 from "./progress/Percent10";
import Percent100 from "./progress/Percent100";
import Percent20 from "./progress/Percent20";
import Percent30 from "./progress/Percent30";
import Percent40 from "./progress/Percent40";
import Percent50 from "./progress/Percent50";
import Percent60 from "./progress/Percent60";
import Percent70 from "./progress/Percent70";
import Percent80 from "./progress/Percent80";
import Percent90 from "./progress/Percent90";
import * as L from "./style";

const getPercentComponent = (score: number) => {
  const percentScore = round(score);
  switch (percentScore) {
    case 10:
      return <Percent10 />;
    case 20:
      return <Percent20 />;
    case 30:
      return <Percent30 />;
    case 40:
      return <Percent40 />;
    case 50:
      return <Percent50 />;
    case 60:
      return <Percent60 />;
    case 70:
      return <Percent70 />;
    case 80:
      return <Percent80 />;
    case 90:
      return <Percent90 />;
    case 100:
      return <Percent100 />;
  }
};

const Manage = () => {
  const month = dayjs().month() + 1;
  const { user } = useUser();
  const { data: spend, isSuccess: isSpendSuccess } = useQuery(
    accountQuery.getSpendOfMonth(month)
  );
  const { data: score, isSuccess: isScoreSuccess } = useQuery(
    accountQuery.getAverageScore()
  );

  const isWarning =
    spend?.expenditure > spend?.spendingTargetAmount ? true : false;

  return (
    <L.Container>
      <L.Header>
        <Column gap="10px">
          <L.Name>{user.userName}님의</L.Name>
          <L.Title>소비 습관 분석 리포트</L.Title>
        </Column>
        <L.OptionButton href="/manage/option">
          목표 변경하기{" "}
          <RightArrowIcon width={12} height={12} fill={theme.white} />
        </L.OptionButton>
      </L.Header>
      <L.Body>
        {isScoreSuccess && (
          <>
            <L.ScoreGraphWrap>
              <L.ScoreGraphOuter>
                <L.PercentWrap>
                  {getPercentComponent(score.score)}
                </L.PercentWrap>
                <L.ScoreGraphInner>
                  <L.ScoreGraphScore>
                    <h2>{score.score}</h2>점
                  </L.ScoreGraphScore>
                </L.ScoreGraphInner>
              </L.ScoreGraphOuter>
            </L.ScoreGraphWrap>
            <L.TopTextBox>
              <L.TopTextTag>상위 {score.percentage}%의 점수에요</L.TopTextTag>
            </L.TopTextBox>
            <L.AverageBox>
              <Row alignItems="center" gap="12px">
                <L.AverageScope>20대 평균</L.AverageScope>
                <L.AverageScore>
                  <h1>81</h1>점
                </L.AverageScore>
              </Row>
              <L.Separator />
              <Row alignItems="center" gap="12px">
                <L.AverageScope>전체 평균</L.AverageScope>
                <L.AverageScore>
                  <h1>67</h1>점
                </L.AverageScore>
              </Row>
            </L.AverageBox>
          </>
        )}
        {isSpendSuccess && (
          <>
            <Column gap="14px">
              <Row width="100%" gap="14px">
                {["현명해요", "괜찮아요"].map((tag) => (
                  <L.TagItem key={tag}>
                    <Tag type={tag} />
                    <L.TagText>{spend.tagCount[tag]}개</L.TagText>
                  </L.TagItem>
                ))}
              </Row>
              <Row width="100%" gap="14px">
                {["갑작스러워요", "위험해요"].map((tag) => (
                  <L.TagItem key={tag}>
                    <Tag type={tag} />
                    <L.TagText>{spend.tagCount[tag]}개</L.TagText>
                  </L.TagItem>
                ))}
              </Row>
            </Column>
            <L.ExpenditureBox>
              <L.ExpenditureText>목표 소비 기준 현재</L.ExpenditureText>
              <L.ExpenditureAmount>
                <L.AmountWarning isWarning={isWarning}>
                  {withComma(spend.expenditure)}
                </L.AmountWarning>
                /{withComma(Number(spend.spendingTargetAmount))}원
              </L.ExpenditureAmount>
              <L.ExpenditureText>도달했어요</L.ExpenditureText>
            </L.ExpenditureBox>
            <L.SectionBox>
              <L.SectionTitle>가장 높은 지출</L.SectionTitle>
              <L.TradeList>
                {spend.topOfExpenditureList.map((expenditure: any) => {
                  const amount = Number(
                    `${expenditure.category}${expenditure.amount}`
                  );
                  return (
                    <TradeItem
                      key={expenditure.id}
                      amount={amount}
                      correspondent={expenditure.correspondent}
                      timestamp={expenditure.tradedAt}
                      invisible
                    />
                  );
                })}
              </L.TradeList>
            </L.SectionBox>
            <L.SectionBox>
              <L.SectionTitle>많이 사용한 결제방식</L.SectionTitle>
              {spend.topOfSumExpenditureByPaymentMethod.map(
                (expenditure: any) => (
                  <L.ItemBox key={expenditure.name}>
                    <L.ItemTitle>{expenditure.name}</L.ItemTitle>
                    <L.ItemAmount>
                      {withComma(expenditure.amount)}원
                    </L.ItemAmount>
                  </L.ItemBox>
                )
              )}
            </L.SectionBox>
          </>
        )}
      </L.Body>
      <L.BodyScroller />
      <Footer />
    </L.Container>
  );
};

export default Manage;
