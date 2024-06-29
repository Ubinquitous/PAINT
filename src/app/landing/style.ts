import { styled } from "@linaria/react";
import Image from "next/image";
import { flex, font, theme } from "~/styles";

export const Container = styled.main`
  width: 100%;
  height: 100dvh;
  padding: 70px 60px;
  gap: 10dvh;
  ${flex.COLUMN_END};
`;

export const TutorialSliderContainer = styled.fieldset`
  width: 70vw;
  height: 66vw;
  border-radius: 10px;
  box-shadow: 0 0 20px 0 ${theme.black}11;
  padding: 0 14px;
  gap: 14px;
  ${flex.COLUMN_FLEX};
`;

export const TutorialSliderLegend = styled.legend``;

export const TutorialTitle = styled.h1`
  color: ${theme.black};
  ${font.H3};

  b {
    color: ${theme.primary};
  }
`;

export const ServiceSloganText = styled.h1`
  text-align: center;
  color: ${theme.black};
  ${font.H3};

  div {
    ${font.H2};

    span {
      color: ${theme.primary};
    }
  }
`;

export const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
`;
