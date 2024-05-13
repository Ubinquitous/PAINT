import { styled } from "@linaria/react";
import { flex, font, theme } from "~/styles";

export const Container = styled.figure`
  width: 100%;
  height: 100%;
  padding-top: 50%;
  ${flex.COLUMN_BETWEEN};
`;

export const Separator = styled.div`
  color: ${theme.gray};
  ${font.H2};

  &:after {
    content: "/";
  }
`;

export const WarningText = styled.span`
  color: ${theme.red};
  ${font.H3};
`;
