import { styled } from "@linaria/react";
import Image from "next/image";
import Link from "next/link";
import { flex, font, theme } from "~/styles";

export const Container = styled.div<{ color: string }>`
  width: 100%;
  height: fit-content;
  background-color: ${(props) => `${props.color}CC` || theme.primary};
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
  padding: 26px 40px;
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
  ${font.D2};
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
  padding: 30px;
  gap: 32px;
  ${flex.COLUMN_FLEX};
`;

export const BodyScroller = styled.div`
  width: 100%;
  height: 10%;
`;

export const BannerImage = styled(Image)`
  width: 100%;
  height: auto;
`;

export const AccountText = styled.h1`
  ${font.H2};
`;

export const TradeList = styled.ul`
  width: 100%;
  height: fit-content;
  overflow-y: scroll;
  min-height: 60vh;
  gap: 24px;
  ${flex.COLUMN_FLEX};
`;

export const TradeNotFoundText = styled.p`
  color: ${theme.gray};
  ${font.H3};
`;
