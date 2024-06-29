import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { flex, theme } from "~/styles";

export const SplashContainer = styled.div`
  width: 100%;
  height: 100dvh;
  background-color: ${theme.primary};
  ${flex.CENTER};
`;

export const Container = styled.div`
  width: 100%;
  height: 100dvh;
  background-color: ${theme.white};
  position: fixed;
  top: 0;
  right: 800px; /* 초기 위치 */
  z-index: 2;
  transition: right 3s ease;

  :active {
    right: 0;
  }
`;
