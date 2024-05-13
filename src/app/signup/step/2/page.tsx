"use client";

import React, { ChangeEvent, useState } from "react";
import StepContainer from "../StepContainer";
import Input from "~/components/atoms/Input";
import Button from "~/components/atoms/Button";
import { useAtom } from "jotai";
import { signupContext } from "~/context";
import { Column, Row } from "~/components/Flex";
import { parseYYYYMMDD } from "@toss/date";
import { useRouter } from "next/navigation";
import * as L from "./style";

const SignupStep2 = () => {
  const [isDateFormatError, setIsDateFormatError] = useState(false);
  const [birth, setBirth] = useState({
    year: undefined,
    month: undefined,
    day: undefined,
  });
  const YYYYMMDD = `${birth.year}-${birth.month}-${birth.day}`;
  const [signup, setSignup] = useAtom(signupContext);
  const router = useRouter();

  const handleNextStepButtonClick = () => {
    setSignup((prev) => ({
      ...prev,
      birthday: YYYYMMDD,
    }));
    router.push("/signup/step/3");
  };

  const handleBirthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const isAllOfBirthHasNaN =
      isNaN(Number(birth.year)) ||
      isNaN(Number(birth.month)) ||
      isNaN(Number(birth.day));
    if (isAllOfBirthHasNaN) setIsDateFormatError(true);
    try {
      parseYYYYMMDD(YYYYMMDD);
      setIsDateFormatError(false);
    } catch (err) {
      setIsDateFormatError(true);
    }

    setBirth((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <StepContainer
      title={`${signup.name}님의 생일을\n알려주세요.`}
      description="나이를 기준으로 지출을 분석해드릴게요"
    >
      <L.Container>
        <Column gap="8px">
          <Row alignItems="center">
            <Input
              name="year"
              textAlign="center"
              value={birth.year}
              onChange={handleBirthChange}
              placeholder="2000"
            />
            <L.Separator />
            <Input
              name="month"
              textAlign="center"
              value={birth.month}
              onChange={handleBirthChange}
              placeholder="06"
            />
            <L.Separator />
            <Input
              name="day"
              textAlign="center"
              value={birth.day}
              onChange={handleBirthChange}
              placeholder="27"
            />
          </Row>
          {isDateFormatError && (
            <L.WarningText>올바른 날짜를 입력해주세요.</L.WarningText>
          )}
        </Column>
        <Button
          disabled={
            isDateFormatError && !(birth.year && birth.month && birth.day)
          }
          onClick={handleNextStepButtonClick}
        >
          다음
        </Button>
      </L.Container>
    </StepContainer>
  );
};

export default SignupStep2;
