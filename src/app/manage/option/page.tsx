"use client";

import { useQuery } from "@tanstack/react-query";
import * as L from "./style";
import { Column, Row } from "~/components/Flex";
import { ArrowIcon } from "~/components/icons";
import { theme } from "~/styles";
import { accountQuery } from "~/services/account/query";
import { ChangeEvent, useEffect, useState } from "react";
import { useTargetSaveMutation } from "~/services/account/mutation";
import { useRouter } from "next/navigation";

const Option = () => {
  const { data, isSuccess } = useQuery(accountQuery.getSpendTarget());
  const router = useRouter();
  const [option, setOption] = useState(
    data || {
      spendingTargetAmount: "0",
      tag: {
        "1": 1000,
        "2": 2000,
        "3": 3000,
      },
    }
  );
  const [error, setError] = useState(false);
  const { mutate } = useTargetSaveMutation();

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) return;
    const num = Number(e.target.value);
    if (e.target.name === "spendingTargetAmount")
      return setOption((prev: any) => ({
        ...prev,
        spendingTargetAmount: num,
      }));
    if (e.target.name === "2" && option.tag["1"] > num) setError(true);
    else if (e.target.name === "3" && option.tag["2"] > num) setError(true);
    else setError(false);
    setOption((prev: any) => ({
      ...prev,
      tag: { ...prev.tag, [e.target.name]: num },
    }));
  };

  useEffect(() => {
    if (option.tag["1"] > option.tag["2"]) setError(true);
    else if (option.tag["2"] > option.tag["3"]) setError(true);
    else setError(false);
  }, [option]);

  useEffect(() => {
    if (isSuccess) setOption(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleSaveClick = () => {
    mutate({
      ...option,
      spendingTargetAmount: String(option.spendingTargetAmount),
    });
    router.push("/manage");
  };

  return (
    <L.Container>
      <L.Header>
        <Column gap="14px">
          <L.BackButton href="/manage">
            <ArrowIcon fill={theme.white} />
          </L.BackButton>
        </Column>
        <L.AccountInfoBox>
          <Row alignItems="center" gap="8px">
            <L.Title>목표 설정</L.Title>
          </Row>
        </L.AccountInfoBox>
      </L.Header>
      <L.Body>
        {isSuccess && (
          <>
            <L.InputWrap>
              <L.InputTitle>이번 달 목표 소비 한도</L.InputTitle>
              <Row alignItems="center" gap="12px">
                <L.Input
                  onChange={handleOptionChange}
                  name="spendingTargetAmount"
                  value={option.spendingTargetAmount}
                  placeholder="숫자로만 입력해주세요"
                />
                <L.Separator>원</L.Separator>
              </Row>
            </L.InputWrap>
            <L.Notice>태그 지정은 전 단계 금액보다 높아야 해요</L.Notice>
            <L.InputWrap>
              <L.InputTitle>현명해요</L.InputTitle>
              <Row alignItems="center" gap="12px">
                <L.Input
                  onChange={handleOptionChange}
                  name="1"
                  value={option.tag["1"]}
                  placeholder="숫자로만 입력해주세요"
                />
                <L.Separator>원까지</L.Separator>
              </Row>
            </L.InputWrap>
            <L.InputWrap>
              <L.InputTitle>괜찮아요</L.InputTitle>
              <Row alignItems="center" gap="12px">
                <L.Input
                  onChange={handleOptionChange}
                  name="2"
                  value={option.tag["2"]}
                  placeholder="숫자로만 입력해주세요"
                />
                <L.Separator>원까지</L.Separator>
              </Row>
            </L.InputWrap>
            <L.InputWrap>
              <L.InputTitle>위험해요</L.InputTitle>
              <Row alignItems="center" gap="12px">
                <L.Input
                  onChange={handleOptionChange}
                  name="3"
                  value={option.tag["3"]}
                  placeholder="숫자로만 입력해주세요"
                />
                <L.Separator>원까지</L.Separator>
              </Row>
            </L.InputWrap>
            <L.InputWrap>
              <L.InputTitle>갑작스러워요</L.InputTitle>
              <Row alignItems="center" gap="12px">
                <L.Input disabled value={option.tag["3"]} />
                <L.Separator>원부터</L.Separator>
              </Row>
            </L.InputWrap>
          </>
        )}
        {error && (
          <L.WarningText>
            태그 지정은 전 단계 금액보다 높아야 해요
          </L.WarningText>
        )}
        <L.Button onClick={handleSaveClick} disabled={error}>
          저장하기
        </L.Button>
      </L.Body>
    </L.Container>
  );
};

export default Option;
