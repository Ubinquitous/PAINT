"use client";

import { styled } from "@linaria/react";
import { useAtomValue } from "jotai";
import { modalContext } from "~/context";
import { useModal } from "~/hooks/useModal";
import { theme } from "~/styles";

const Modal = () => {
  const { closeModal } = useModal();
  const { component, visible } = useAtomValue(modalContext);

  if (visible)
    return (
      <>
        {component}
        <Background onClick={closeModal} />
      </>
    );
};

const Background = styled.section`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${theme.white};
  opacity: 0.8;
`;

export default Modal;
