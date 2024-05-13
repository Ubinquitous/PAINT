import { styled } from "@linaria/react";
import Image from "next/image";
import { flex, font, theme } from "~/styles";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  ${flex.CENTER};
  flex-wrap: wrap;
  gap: 20px;
`;

export const BankBox = styled.div<{ isSelected: boolean }>`
  width: 70px;
  height: 80px;
  gap: 6px;
  border-radius: 8px;
  padding: 6px;
  position: relative;
  ${flex.COLUMN_BETWEEN};
  background-color: ${(props) =>
    props.isSelected ? `${theme.primary}11` : "transparent"};
`;

export const BankCheckBox = styled.div`
  border-radius: 999px;
  position: absolute;
  top: -10px;
  right: -10px;
`;

export const BankText = styled.span`
  ${font.p2};
`;

export const BankImage = styled(Image)`
  width: 80%;
  height: auto;
`;
