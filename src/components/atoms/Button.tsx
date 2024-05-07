import { styled } from "@linaria/react";
import React, { ButtonHTMLAttributes } from "react";
import { flex, font, theme } from "~/styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  varient?: string;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return <Container {...props}>{children}</Container>;
};

const Container = styled.button<{ varient?: string }>`
  background-color: ${({ varient }) => varient || theme.primary};
  width: 100%;
  padding: 14px;
  border-radius: 6px;
  cursor: pointer;
  color: ${theme.white};
  ${font.H3};
  ${flex.CENTER};

  &:disabled {
    opacity: 0.3;
  }
`;

export default Button;
