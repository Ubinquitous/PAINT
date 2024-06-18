import { styled } from "@linaria/react";
import Image from "next/image";
import { HTMLAttributes } from "react";
import { Column } from "~/components/Flex";
import { bankRecord } from "~/data";
import { flex, font, theme } from "~/styles";
import { withComma } from "~/utils";

interface BankItemProps extends HTMLAttributes<HTMLLIElement> {
  organization: string;
  accountName: string;
  balance: number;
}

const ACCOUNT_NAME_LENGTH = 12;

const BankItem = ({
  organization,
  accountName,
  balance,
  ...props
}: BankItemProps) => {
  const accountSlicedName =
    accountName.length > ACCOUNT_NAME_LENGTH
      ? `${accountName.slice(0, ACCOUNT_NAME_LENGTH)}...`
      : accountName;
  return (
    <Container {...props}>
      <BankIcon
        src={`/assets/bank/${organization}.png`}
        alt={`${bankRecord[organization]}`}
        width={999}
        height={999}
      />
      <Column>
        <AccountName>{accountSlicedName}</AccountName>
        <AccountBalance>{withComma(balance)}원</AccountBalance>
      </Column>
      <CheckButton>조회</CheckButton>
    </Container>
  );
};

const Container = styled.li`
  width: 100%;
  padding: 0 10px;
  gap: 24px;
  ${flex.VERTICAL};
`;

const BankIcon = styled(Image)`
  width: 32px;
  height: auto;
  margin-bottom: auto;
`;

const AccountName = styled.h1`
  ${font.H3};
  color: ${theme.gray};
`;

const AccountBalance = styled.span`
  ${font.H1};
  color: ${theme.black};
`;

const CheckButton = styled.button`
  border-radius: 8px;
  background-color: ${theme.grey};
  ${font.H4};
  padding: 6px 14px;
  margin-left: auto;
`;

export default BankItem;
