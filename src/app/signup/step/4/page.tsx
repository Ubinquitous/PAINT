"use client";

import React, { useState } from "react";
import StepContainer from "../StepContainer";
import Button from "~/components/atoms/Button";
import { useAtom } from "jotai";
import { signupContext } from "~/context";
import { useRouter } from "next/navigation";
import { bankRecord } from "~/data";
import * as L from "./style";
import { CheckIcon } from "~/components/icons";
import { theme } from "~/styles";
import { useAddBank, useSignUp } from "~/services/auth/mutation";
import { AccountRegisterRequestDto } from "~/app/api/account/register/AccountRegisterRequestDto";

const SignupStep4 = () => {
  const bankList = Object.keys(bankRecord);
  const { mutateAsync: signUpMutate } = useSignUp();
  const { mutateAsync: addBankMutate } = useAddBank();
  const router = useRouter();
  const [signup, setSignup] = useAtom(signupContext);

  const isSelectedBankCode = (code: string) =>
    signup.bankCodeList.includes(code);

  const handleSelectBankList = (code: string) => {
    // delete (double tap)
    if (isSelectedBankCode(code))
      return setSignup((prev) => ({
        ...prev,
        bankCodeList: prev.bankCodeList.filter((bc) => bc !== code),
      }));
    // add
    setSignup((prev) => ({
      ...prev,
      bankCodeList: [...prev.bankCodeList, code],
    }));
  };

  const handleConnectBankClick = async () => {
    const { userName, password, birthDate, bankCodeList, certFile } = signup;
    const request: AccountRegisterRequestDto = {
      userName,
      password,
      birthDate,
      identity: "",
      countryCode: "KR",
      organization: JSON.stringify(bankCodeList),
      certFile,
      certType: "pfx",
    };
    const { data } = await signUpMutate(request);
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    if (bankCodeList.length >= 2) {
      bankCodeList
        .slice(1, bankCodeList.length)
        .forEach(async (organization) => {
          await addBankMutate({
            password,
            countryCode: "KR",
            certFile,
            certType: "pfx",
            organization,
          });
        });
    }
    router.push("/home");
  };

  return (
    <StepContainer
      title={`페인트에 연결할\n은행 기관을 선택해주세요!`}
      description="여러 개도 선택할 수 있어요"
    >
      <L.Container>
        {bankList.map((bankCode: string) => (
          <L.BankBox
            key={bankCode}
            isSelected={isSelectedBankCode(bankCode)}
            onClick={() => handleSelectBankList(bankCode)}
          >
            <L.BankImage
              src={`/assets/bank/${bankCode}.png`}
              width={999}
              height={999}
              alt="bank"
            />
            {isSelectedBankCode(bankCode) && (
              <L.BankCheckBox>
                <CheckIcon width={20} height={20} fill={theme.primary} />
              </L.BankCheckBox>
            )}
            <L.BankText>{bankRecord[bankCode]}</L.BankText>
          </L.BankBox>
        ))}
      </L.Container>
      <Button
        disabled={!signup.bankCodeList.length}
        onClick={handleConnectBankClick}
      >
        연결하기
      </Button>
    </StepContainer>
  );
};

export default SignupStep4;
