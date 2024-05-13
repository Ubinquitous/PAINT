import { styled } from "@linaria/react";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { Column } from "~/components/Flex";
import { ArrowIcon } from "~/components/icons";
import { flex, font, theme } from "~/styles";

interface StepContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const StepContainer = ({
  title,
  description,
  children,
}: StepContainerProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const step = Number(pathname.replace("/signup/step/", ""));
  const isFirstStep = step === 1;
  const blank = <div />;

  const handlePrevStepClick = () => {
    router.push(`/signup/step/${step - 1}`);
  };

  return (
    <Container>
      <Header>
        {isFirstStep ? (
          blank
        ) : (
          <ArrowIcon onClick={handlePrevStepClick} fill={theme.gray} />
        )}
        {step}/4
      </Header>
      <Column gap="12px">
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </Column>
      <Body>{children}</Body>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 40px;
  gap: 28px;
  ${flex.COLUMN_FLEX};
`;

const Header = styled.header`
  width: 100%;
  color: ${theme.gray};
  ${flex.BETWEEN};
  ${font.H3};
`;

const Body = styled.main`
  width: 100%;
  height: 100%;
  gap: 8px;
  ${flex.COLUMN_FLEX};
`;

const Title = styled.h1`
  white-space: pre-wrap;
  ${font.H1};
`;

const Description = styled.h1`
  white-space: pre-wrap;
  color: ${theme.gray};
  ${font.H3};
`;

export default StepContainer;
