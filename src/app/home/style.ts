import { styled } from "@linaria/react";
import Image from "next/image";
import { flex, font, theme } from "~/styles";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${theme.primary};
  gap: 16px;
  ${flex.COLUMN_FLEX};
`;

export const Header = styled.header`
  color: ${theme.white};
  ${flex.COLUMN_FLEX};
  gap: 24px;
  padding: 26px 40px;
`;

export const LogoWrap = styled.figure`
  align-self: flex-end;
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
  padding: 30px;
  gap: 32px;
  ${flex.COLUMN_FLEX};
`;

export const BannerImage = styled(Image)`
  width: 100%;
  height: auto;
`;

export const AccountText = styled.h1`
  ${font.H2};
`;

export const BankList = styled.ul`
  gap: 46px;
  ${flex.COLUMN_FLEX};
`;
