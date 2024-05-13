"use client";

import React, { createElement, useState } from "react";
import StepContainer from "../StepContainer";
import { theme } from "~/styles";
import Button from "~/components/atoms/Button";
import { useAtom } from "jotai";
import { signupContext } from "~/context";
import { useRouter } from "next/navigation";
import { CoinEmoji } from "~/components/images";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { certQuery } from "~/services/cert/query";
import { BounceLoader } from "react-spinners";
import * as L from "./style";
import { Column } from "~/components/Flex";
import Input from "~/components/atoms/Input";
import { useCertPasswordMatchMutation } from "~/services/cert/mutation";

const SignupStep3 = () => {
  const [isConnect, setIsConnect] = useState(false);
  const [selectedCert, setSelectedCert] = useState<any>({});
  const [certPassword, setCertPassword] = useState("");
  const { data, isSuccess } = useQuery({
    enabled: isConnect,
    ...certQuery.getCertList(),
  });
  const { mutateAsync } = useCertPasswordMatchMutation();
  const router = useRouter();
  const [, setSignup] = useAtom(signupContext);

  const handleVerfiyCertificate = async () => {
    const data = await mutateAsync({
      certPassword,
      certPath: selectedCert["cert.der.path"],
      keyPath: selectedCert["cert.key.path"],
    });
    if (data.status === 400) return alert("비밀번호가 일치하지 않아요.");
    setSignup((prev) => ({
      ...prev,
      certFile: data.data,
      password: certPassword,
    }));
    router.push("/signup/step/4");
  };

  const generateCertListComponent = () => {
    if (!isSuccess)
      return (
        <L.ImageContainer>
          <BounceLoader color={theme.primary} size={30} />
        </L.ImageContainer>
      );
    return (
      <Column width="100%" gap="42px">
        <Column width="100%" gap="12px">
          <L.CertTitle>인증서 목록</L.CertTitle>
          <L.CertificateList>
            {data.data.map((cert: any) => {
              const certName = cert["cert.subjectname.CN"].replace(")", ")\n");
              return (
                <L.CertificateItem
                  isSelected={
                    cert["cert.der.path"] === selectedCert["cert.der.path"]
                  }
                  key={cert["cert.der.path"]}
                  onClick={() => setSelectedCert(cert)}
                >
                  <L.CertificateUser>{certName}</L.CertificateUser>
                  <L.CertificateInformation>
                    시리얼번호 · {cert["cert.serialNumber"]}
                  </L.CertificateInformation>
                </L.CertificateItem>
              );
            })}
          </L.CertificateList>
        </Column>
        <Column gap="12px">
          <L.CertTitle>인증서 비밀번호</L.CertTitle>
          <Input
            onChange={({ target: { value } }) => setCertPassword(value)}
            value={certPassword}
            placeholder="비밀번호를 입력해주세요"
            type="password"
          />
        </Column>
      </Column>
    );
  };

  return (
    <StepContainer
      title={`마지막으로,\n공동인증서를 연결해주세요!`}
      description={`연결하기 버튼을 누르면\n로컬에 저장된 공동인증서를 불러올게요`}
    >
      <L.Container>
        {isConnect ? (
          generateCertListComponent()
        ) : (
          <L.ImageContainer>
            <Image src={CoinEmoji} alt="coin" width={200} />
          </L.ImageContainer>
        )}
      </L.Container>
      {createElement(
        Button,
        {
          disabled: isConnect ? !(isSuccess && certPassword) : false,
          onClick: isConnect
            ? handleVerfiyCertificate
            : () => setIsConnect((_) => true),
        },
        isConnect ? "인증하기" : "연결하기"
      )}
    </StepContainer>
  );
};

export default SignupStep3;
