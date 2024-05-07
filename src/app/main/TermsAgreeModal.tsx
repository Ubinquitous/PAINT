import { styled } from "@linaria/react";
import React, { FC, useState } from "react";
import { Column, Row } from "~/components/Flex";
import Check from "~/components/icons/Check";
import { flex, font, theme } from "~/styles";
import TermsContentModal from "./TermsContentModal";
import Button from "~/components/atoms/Button";
import { css } from "@linaria/core";

const TermsAgreeModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [openTargetTermsId, setOpenTargetTermsId] = useState(0);
  const [agreedTermIdList, setAgreedTermIdList] = useState<Array<number>>([]);
  const isAgreedAllOfTerms = agreedTermIdList.length === termsList.length;
  const isTermIdInAgreedList = (id: number) => agreedTermIdList.includes(id);

  const getTermsCheckColor = (id: number) => {
    if (isTermIdInAgreedList(id)) return theme.primary;
    return theme.lightgray;
  };

  const handleTermsAgreeClick = (id: number) => {
    if (isTermIdInAgreedList(id))
      return setAgreedTermIdList((prev) => prev.filter((tId) => tId !== id));
    return setAgreedTermIdList((prev) => [...new Set([...prev, id])]);
  };

  const handleAllOfTermsAgreeClick = () => {
    const isNotAgreedAllOfTerms = agreedTermIdList.length < termsList.length;
    if (isNotAgreedAllOfTerms)
      setAgreedTermIdList(termsList.map((term) => term.id));
    else setAgreedTermIdList([]);
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
            key={terms.id}
            as="hgroup"
            alignItems="center"
            justifyContent="space-between"
          >
            <Row
              as="figure"
              gap="12px"
              alignItems="center"
              onClick={() => handleTermsAgreeClick(terms.id)}
            >
              <Check
                width={26}
                height={26}
                fill={getTermsCheckColor(terms.id)}
              />
              <TermsText>{terms.contents}</TermsText>
            </Row>
            {terms.isDetail && (
              <TermsCheckButton onClick={() => setOpenTargetTermsId(terms.id)}>
                보기
              </TermsCheckButton>
            )}
            {!!openTargetTermsId && (
              <TermsContentModal
                id={openTargetTermsId}
                onClose={() => setOpenTargetTermsId(0)}
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
  { id: 1, contents: "(필수) 만 14세 이상입니다.", isDetail: false },
  { id: 2, contents: "(필수) 서비스 이용약관 동의", isDetail: true },
  { id: 3, contents: "(필수) 개인정보 처리방침 동의", isDetail: true },
  { id: 4, contents: "(필수) 민감한 정보 수집 및 이용 동의", isDetail: true },
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

const moveTopAnimation = css``;

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
