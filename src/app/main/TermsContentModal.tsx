import { styled } from "@linaria/react";
import React, { FC } from "react";
import Button from "~/components/atoms/Button";
import PDFViewer from "~/components/atoms/PDFViewer";
import { flex, theme } from "~/styles";

const TermsContentModal: FC<{ name: string; onClose: () => void }> = ({
  name,
  onClose,
}) => {
  return (
    <>
      <Background onClick={onClose} />
      <Container>
        <PDFViewer path={`/terms/${name}.pdf`} scale={200} />
        <Button onClick={onClose}>동의</Button>
      </Container>
    </>
  );
};

const Background = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const Container = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 86vh;
  z-index: 3;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 40px 30px;
  background-color: ${theme.white};
  overflow-y: scroll;
  gap: 28px;
  animation: moveTop 0.8s forwards;
  ${flex.COLUMN_FLEX};
`;

export default TermsContentModal;
