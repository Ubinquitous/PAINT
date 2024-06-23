"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import StepContainer from "../StepContainer";
import Input from "~/components/atoms/Input";
import Button from "~/components/atoms/Button";
import { useAtom } from "jotai";
import { signupContext } from "~/context";
import { Column, Row } from "~/components/Flex";
import { useRouter } from "next/navigation";
import * as L from "./style";

const SignupStep2 = () => {
  const [isDateFormatError, setIsDateFormatError] = useState(false);
  const [signup, setSignup] = useAtom(signupContext);
  const router = useRouter();

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 6) return;
    if (isNaN(Number(value))) return;
    const yearSeparator = String(new Date().getFullYear()).substring(2, 4);
    const lastYear = value.substring(0, 2);
    const firstYear = yearSeparator < lastYear ? 19 : 20;
    const month = value.substring(2, 4);
    const day = value.substring(4, 6);
    const date = `${firstYear}${lastYear}-${month}-${day}`;

    const isInvalidDate = value.length === 6 && isNaN(Date.parse(date));

    if (isInvalidDate) setIsDateFormatError(true);
    else setIsDateFormatError(false);
    setSignup((prev) => ({ ...prev, birthDate: value }));
  };

  return (
    <StepContainer
      title={`${signup.userName}님의\n주민등록번호를 알려주세요.`}
      description="서비스를 위해 필요해요, 안전하게 보관해드릴게요"
    >
      <L.Container>
        <Column gap="12px">
          <Row alignItems="center">
            <Input
              name="birth"
              textAlign="center"
              value={signup.birthDate}
              onChange={handleDateChange}
              placeholder="000000"
            />
            <L.Separator />
            <Input
              name="identity"
              type="password"
              textAlign="center"
              value={signup.identity}
              onChange={({ target: { value } }) =>
                setSignup((prev) => ({ ...prev, identity: value }))
              }
              placeholder="0000000"
            />
            {/* <L.RegisterLastText /> */}
          </Row>
          {isDateFormatError && (
            <L.WarningText>올바른 날짜를 입력해주세요.</L.WarningText>
          )}
        </Column>
        <Button
          disabled={isDateFormatError || signup.birthDate.length !== 6}
          onClick={() => router.push("/signup/step/3")}
        >
          다음
        </Button>
      </L.Container>
    </StepContainer>
  );
};

export default SignupStep2;
