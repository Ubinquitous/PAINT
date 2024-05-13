import { styled } from "@linaria/react";
import React, { InputHTMLAttributes } from "react";
import { flex, font, theme } from "~/styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  textAlign?: "center" | "right" | "left";
  activeLetterCount?: boolean;
  maxLetterLength?: number;
}

const Input = ({
  textAlign,
  value,
  activeLetterCount,
  maxLetterLength,
  ...props
}: InputProps) => {
  const currentLetterLength = (value as string)?.length;
  return (
    <Container>
      <StyledInput
        textAlign={textAlign}
        value={value}
        {...props}
        max={maxLetterLength}
      />
      {activeLetterCount && (
        <LetterCountText>
          {currentLetterLength}/{maxLetterLength}
        </LetterCountText>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  ${flex.VERTICAL};
`;

const StyledInput = styled.input<{ textAlign?: string }>`
  width: 100%;
  ${font.H1};
  font-weight: 500;
  text-align: ${(props) => props.textAlign || "left"};
`;

const LetterCountText = styled.span`
  color: ${theme.gray};
  ${font.H3};
  font-weight: 500;
`;

export default Input;
