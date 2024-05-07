import { styled } from "@linaria/react";
import React, { FC, useState } from "react";
import { Column, Row } from "~/components/Flex";
import Check from "~/components/icons/Check";
import { flex, font, theme } from "~/styles";
import TermsContentModal from "./TermsContentModal";
import Button from "~/components/atoms/Button";

const TermsAgreeModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [openTargetTermsName, setOpenTargetTermsName] = useState("");
  const [agreedTermIdList, setAgreedTermIdList] = useState<Array<string>>([]);
  const isAgreedAllOfTerms = agreedTermIdList.length === termsList.length;
  const isTermIdInAgreedList = (name: string) =>
    agreedTermIdList.includes(name);

  const getTermsCheckColor = (name: string) => {
    if (isTermIdInAgreedList(name)) return theme.primary;
    return theme.lightgray;
  };

  const handleTermsAgreeClick = (name: string) => {
    if (isTermIdInAgreedList(name))
      return setAgreedTermIdList((prev) => prev.filter((tId) => tId !== name));
    return setAgreedTermIdList((prev) => [...new Set([...prev, name])]);
  };

  const handleAllOfTermsAgreeClick = () => {
    const isNotAgreedAllOfTerms = agreedTermIdList.length < termsList.length;
    if (isNotAgreedAllOfTerms)
      setAgreedTermIdList(termsList.map((term) => term.name));
    else setAgreedTermIdList([]);
  };

  const handleCloseContentModal = (name: string) => {
    setOpenTargetTermsName("");
    setAgreedTermIdList((prev) => [...new Set([...prev, name])]);
  };

  return (
    <>
      <Background onClick={onClose} />
      <Container>
        <Column>
          <TermsTitle>약관에 동의해주세요</TermsTitle>
          <TermsDescription>
            고객님의 소중한 개인정보를 잘 지켜드릴게요
          </TermsDescription>
        </Column>
        <AllOfTermsAgreeContainer onClick={handleAllOfTermsAgreeClick}>
          <Check fill={isAgreedAllOfTerms ? theme.primary : theme.lightgray} />
          <Column>
            <AllOfTermsAgreeText>모두 동의</AllOfTermsAgreeText>
            <AllOfTermsAgreeDescription>
              서비스 이용을 위해 아래 약관에 모두 동의합니다.
            </AllOfTermsAgreeDescription>
          </Column>
        </AllOfTermsAgreeContainer>
        {termsList.map((terms) => (
          <Row
            key={terms.name}
            as="hgroup"
            alignItems="center"
            justifyContent="space-between"
          >
            <Row
              as="figure"
              gap="12px"
              alignItems="center"
              onClick={() => handleTermsAgreeClick(terms.name)}
            >
              <Check
                width={26}
                height={26}
                fill={getTermsCheckColor(terms.name)}
              />
              <TermsText>{terms.contents}</TermsText>
            </Row>
            {terms.name !== "14" && (
              <TermsCheckButton
                onClick={() => setOpenTargetTermsName(terms.name)}
              >
                보기
              </TermsCheckButton>
            )}
            {!!openTargetTermsName && (
              <TermsContentModal
                name={openTargetTermsName}
                onClose={() => handleCloseContentModal(openTargetTermsName)}
              />
            )}
          </Row>
        ))}
        <Button disabled={!isAgreedAllOfTerms}>시작하기</Button>
      </Container>
    </>
  );
};

const termsList = [
  { name: "14", contents: "(필수) 만 14세 이상입니다." },
  {
    name: "개인정보처리동의서",
    contents: "(필수) 개인정보 처리 동의",
  },
  {
    name: "고유식별정보처리동의서",
    contents: "(필수) 고유식별정보 처리 동의",
  },
  {
    name: "민감정보처리동의서",
    contents: "(필수) 민감정보 처리 동의",
  },
];

const Background = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${theme.gray};
  opacity: 0.5;
`;

const Container = styled.section`
  position: fixed;
  bottom: -800px;
  left: 0;
  width: 100%;
  height: 66vh;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 40px 30px;
  z-index: 2;
  gap: 34px;
  background-color: ${theme.white};
  animation: moveTop 0.8s forwards;
  overflow-y: scroll;
  ${flex.COLUMN_FLEX};
`;

const TermsTitle = styled.h1`
  ${font.H1};
`;

const TermsDescription = styled.p`
  color: ${theme.gray};
  ${font.H3};
`;

const AllOfTermsAgreeContainer = styled.div`
  width: 100%;
  gap: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${theme.lightgray};
  ${flex.FLEX};
`;

const AllOfTermsAgreeText = styled.h2`
  ${font.H2};
`;

const AllOfTermsAgreeDescription = styled(TermsDescription)`
  ${font.H4};
`;

const TermsText = styled.p`
  ${font.H3};
`;

const TermsCheckButton = styled.span`
  color: ${theme.gray};
  ${font.H3};
`;

export default TermsAgreeModal;
