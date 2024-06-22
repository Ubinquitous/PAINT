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
  padding: 50px 30px;
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

export const InputWrap = styled.div`
  gap: 10px;
  ${flex.COLUMN_FLEX};
`;

export const InputTitle = styled.h1`
  ${font.H2};
`;

export const Input = styled.input`
  width: 60%;
  padding: 12px 18px;
  border-radius: 8px;
  border: 1px solid ${theme.gray};
  text-align: right;
  ${font.p1};
  font-size: 18px;
`;

export const Separator = styled.p`
  ${font.H2};
`;

export const Button = styled.button`
  width: 100%;
  padding: 16px 0;
  background-color: ${theme.primary};
  border-radius: 12px;
  color: ${theme.white};
  ${flex.CENTER};
  ${font.H2};
  font-weight: 500;

  &:disabled {
    opacity: 0.4;
  }
`;

export const Notice = styled.span`
  color: ${theme.gray};
  ${font.H3};
  font-weight: 500;
`;

export const WarningText = styled.span`
  color: ${theme.red};
  ${font.H2};
`;
