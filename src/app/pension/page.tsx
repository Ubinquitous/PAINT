"use client";

import React, { useState } from "react";
import * as L from "./style";
import { Column, Row } from "~/components/Flex";
import { useUser } from "~/hooks/useUser";
import Footer from "~/components/common/Footer";
import { withComma } from "~/utils";
import Tag from "~/components/atoms/Tag";
import NationPensionItem from "./NationPensionItem";
import { useQuery } from "@tanstack/react-query";
import { accountQuery } from "~/services/account/query";

const Pension = () => {
  const { user } = useUser();
  const { data, isSuccess } = useQuery(accountQuery.getPension());
  const [viewMode, setViewMode] = useState("연도별");

  console.log(data);
  const amount =
    viewMode === "연도별"
      ? Number(data?.pension?.resExpectPensionYearAmt)
      : Number(data?.pension?.resExpectPensionMonthAmt);
  return (
    <L.Container>
      <L.Header>
        <Column gap="4px">
          <L.SubTitle>{user.userName}님의 은퇴 후</L.SubTitle>
          <L.Title>연금 분석 리포트</L.Title>
        </Column>
      </L.Header>
      <L.Body>
        {isSuccess && (
          <>
            <Column gap="4px">
              <L.PensionSubTitle>
                {user.userName}님이 은퇴 후 받을 금액은...
              </L.PensionSubTitle>
              <Row alignItems="center" justifyContent="space-between">
                <L.PensionTitle>{withComma(amount)}원</L.PensionTitle>
                <L.PensionButton
                  onClick={() =>
                    setViewMode((prev) =>
                      prev === "연도별" ? "월별" : "연도별"
                    )
                  }
                >
                  {viewMode}로 보기
                </L.PensionButton>
              </Row>
            </Column>
            <Column gap="14px">
              <Row width="100%" gap="14px">
                <L.TagItem>
                  <Tag type="국민연금" />
                  <L.TagText>가입중</L.TagText>
                </L.TagItem>
                <L.TagItem>
                  <Tag type="퇴직연금" />
                  <L.TagText>{data.pension.resProductNumber2 || 0}개</L.TagText>
                </L.TagItem>
              </Row>
              <Row width="100%" gap="14px">
                <L.TagItem>
                  <Tag type="주택연금" />
                  <L.TagText>{data.pension.resProductNumber3 || 0}개</L.TagText>
                </L.TagItem>
                <L.TagItem>
                  <Tag type="개인연금" />
                  <L.TagText>{data.pension.resProductNumber1 || 0}개</L.TagText>
                </L.TagItem>
              </Row>
            </Column>
            <L.SquareBox>
              <L.PensionName>국민연금</L.PensionName>
              {data?.pension?.resNationalPensionList?.map(
                (pension: any, i: number) => (
                  <NationPensionItem key={i} {...pension} />
                )
              )}
            </L.SquareBox>
            <L.SquareBox>
              <L.PensionName>퇴직연금</L.PensionName>
              {data?.pension?.resRetirementPensionList?.map(
                (pension: any, i: number) => (
                  <NationPensionItem key={i} {...pension} />
                )
              )}
            </L.SquareBox>
            <L.SquareBox>
              <L.PensionName>주택연금</L.PensionName>
              {data?.pension?.resReverseMortgageList?.map(
                (pension: any, i: number) => (
                  <NationPensionItem key={i} {...pension} />
                )
              )}
            </L.SquareBox>
            <L.SquareBox>
              <L.PensionName>개인연금</L.PensionName>
              {data?.pension?.resPrivatePensionList?.map(
                (pension: any, i: number) => (
                  <NationPensionItem key={i} {...pension} />
                )
              )}
            </L.SquareBox>
          </>
        )}
      </L.Body>
      <Footer />
    </L.Container>
  );
};

export default Pension;
