import { styled } from "@linaria/react";
import React from "react";
import { Row } from "~/components/Flex";
import { flex, font, theme } from "~/styles";
import { withComma } from "~/utils";

interface NationPensionItemProps {
  resExpectPension: string;
}

const NationPensionItem = ({ resExpectPension }: NationPensionItemProps) => {
  return (
    <Container>
      <Row alignItems="center" gap="8px">
        <PensionAmount>
          {withComma(Number(resExpectPension) || 0)}원
        </PensionAmount>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: fit-content;
  padding: 12px;
  border-top: 1px solid ${theme.grey};
  ${flex.COLUMN_FLEX};
`;

const PensionType = styled.span`
  color: ${theme.gray};
  ${font.p1};
`;

const PensionAmount = styled.span`
  ${font.H1};
  font-weight: 500;
`;

const PensionStartedAt = styled.span`
  color: ${theme.gray};
  ${font.p1};
`;

export default NationPensionItem;
