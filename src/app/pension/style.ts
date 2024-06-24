import { styled } from "@linaria/react";
import Image from "next/image";
import Link from "next/link";
import { flex, font, theme } from "~/styles";

export const Container = styled.div`
  width: 100%;
  height: fit-content;
  background-color: ${theme.primary};
  gap: 16px;
  overflow-y: scroll;
  overflow-x: hidden;
  ${flex.COLUMN_FLEX}
`;

export const BankImage = styled(Image)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
  width: 80%;
  overflow: hidden;
  height: auto;
`;

export const Header = styled.header`
  color: ${theme.white};
  ${flex.COLUMN_FLEX};
  gap: 24px;
  padding: 40px;
`;

export const AccountNumberText = styled.p`
  color: ${theme.white};
  ${font.H2};
  font-weight: 600;
`;

export const BackButton = styled(Link)`
  align-self: flex-start;
  gap: 12px;
  ${flex.VERTICAL};
  ${font.H1};
  font-weight: 500;
`;

export const AccountInfoBox = styled.div`
  margin-top: 40px;
  ${flex.COLUMN_FLEX};
`;

export const Title = styled.h1`
  color: ${theme.white};
  ${font.D3};
`;

export const SubTitle = styled.p`
  color: ${theme.white};
  ${font.H2};
  font-weight: 500;
`;

export const Body = styled.main`
  width: 100%;
  height: 100%;
  background-color: ${theme.white};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  padding: 50px 30px;
  gap: 32px;
  ${flex.COLUMN_FLEX};
`;

export const BodyScroller = styled.div`
  width: 100%;
  height: 10%;
`;

export const PensionSubTitle = styled.span`
  ${font.H2};
  font-weight: 500;
`;

export const PensionTitle = styled.span`
  ${font.D3};
  font-weight: 500;
`;

export const PensionButton = styled.button`
  padding: 6px 12px;
  ${font.H3};
  font-weight: 500;
  border-radius: 999px;
  border: 1.5px solid ${theme.grey};
  color: ${theme.gray};
`;

export const PensionBox = styled.div`
  width: 100%;
  height: fit-content;
  padding: 20px;
  border-radius: 16px;
  background-color: #f2f3f7;
`;

export const TagItem = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.05);
  background-color: ${theme.white};
  ${flex.BETWEEN};
`;

export const TagText = styled.span`
  ${font.H4};
`;

export const SquareBox = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: ${theme.white};
  gap: 12px;
  ${flex.COLUMN_FLEX};
`;

export const PensionName = styled.span`
  ${font.H2};
  font-weight: 600;
`;
