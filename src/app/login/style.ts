import { styled } from "@linaria/react";
import { flex, font, theme } from "~/styles";

export const Container = styled.figure`
  width: 100%;
  height: 100%;
  ${flex.COLUMN_BETWEEN};
`;

export const CertTitle = styled.h1`
  color: ${theme.gray};
  ${font.H4};
`;

export const CertificateList = styled.ul`
  width: 100%;
  height: 22dvh;
  overflow-y: scroll;
  ${flex.COLUMN_FLEX};
`;

export const CertificateItem = styled.li<{ isSelected: boolean }>`
  padding: 20px 14px;
  border-bottom: 1px solid ${theme.lightgray};
  gap: 4px;
  background-color: ${(props) =>
    props.isSelected ? theme.lightgray : "transparent"};
  ${flex.COLUMN_FLEX};
`;

export const CertificateUser = styled.h1`
  white-space: pre-wrap;
  ${font.H2};
`;

export const CertificateInformation = styled.p`
  color: ${theme.gray};
  ${font.H4};
`;

export const ImageContainer = styled.div`
  padding-top: 50%;
`;
