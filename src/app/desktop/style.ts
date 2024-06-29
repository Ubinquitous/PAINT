import { styled } from "@linaria/react";
import { flex } from "~/styles";

export const Container = styled.main`
  width: 100%;
  height: 100dvh;
  gap: 10vw;
  ${flex.CENTER};
`;

export const IPhoneOuter = styled.img`
  height: 689px;
  width: 341px;
  overflow: scroll;
  position: absolute;
  z-index: 1;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const DisplayLayout = styled.main`
  margin: 0;
  padding: 0;
  position: relative;
  height: 689px;
  width: 341px;
`;

export const DisplayContainer = styled.div`
  height: 689px;
  width: 325px;
  left: 8px;
  position: absolute;
  border-radius: 56px;
  overflow-y: scroll;
`;
