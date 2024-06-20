import { styled } from "@linaria/react";
import dayjs from "dayjs";
import Image from "next/image";
import { Row } from "~/components/Flex";
import Tag from "~/components/atoms/Tag";
import { flex, font, theme } from "~/styles";
import { withComma } from "~/utils";

interface TradeItemProps {
  amount: number;
  correspondent: string;
  timestamp: string;
}

const TradeItem = ({ amount, correspondent, timestamp }: TradeItemProps) => {
  return (
    <Container>
      <Row gap="16px">
        <PaymentMethodBorder
          src="/assets/common/default_paymentmethod.png"
          alt="default"
          width={9999}
          height={9999}
        />
        <AmountBox>
          <Amount>
            {withComma(amount)}원 <Tag type="현명해요" />
          </Amount>
          <Correspondent>{correspondent.replaceAll("%2B", " ")}</Correspondent>
        </AmountBox>
      </Row>
      <TimeStamp>{dayjs(timestamp).format("M월 D일 A h시 M분")}</TimeStamp>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 10px 0;
  ${flex.BETWEEN};
`;

const PaymentMethodBorder = styled(Image)`
  width: 48px;
  height: 48px;
  border-radius: 999px;
`;

const AmountBox = styled.div`
  ${flex.COLUMN_FLEX};
`;

const Amount = styled.h1`
  color: ${theme.gray};
  gap: 8px;
  ${font.H2};
  ${flex.VERTICAL};
  font-weight: 500;
`;

const Correspondent = styled.h1`
  color: ${theme.black};
  ${font.H2};
  font-weight: 600;
`;

const TimeStamp = styled.p`
  color: ${theme.gray};
  ${font.p1};
`;

export default TradeItem;
