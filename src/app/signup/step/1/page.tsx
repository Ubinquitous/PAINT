"use client";

import React, { ChangeEvent } from "react";
import StepContainer from "../StepContainer";
import Input from "~/components/atoms/Input";
import Button from "~/components/atoms/Button";
import { useAtom } from "jotai";
import { signupContext } from "~/context";
import { useRouter } from "next/navigation";
import * as L from "./style";

const NAME_MAX_LENGTH = 6;

const SignupStep1 = () => {
  const router = useRouter();
  const [signup, setSignup] = useAtom(signupContext);

  const handleProfileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= NAME_MAX_LENGTH)
      setSignup((prev) => ({ ...prev, userName: value }));
  };

  return (
    <StepContainer
      title={`가입을 축하드려요!\n어떻게 불러드리면 될까요?`}
      description="꼭 실명을 입력해주세요!"
    >
      <L.Container>
        <Input
          value={signup.userName}
          onChange={handleProfileNameChange}
          placeholder="이름을 입력해주세요"
          maxLetterLength={6}
          activeLetterCount
        />
        <Button
          disabled={!signup.userName}
          onClick={() => router.push("/signup/step/2")}
        >
          다음
        </Button>
      </L.Container>
    </StepContainer>
  );
};

export default SignupStep1;
