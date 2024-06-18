import { useSetAtom } from "jotai";
import { ReactNode, useCallback } from "react";
import { modalContext } from "~/context";

export const useModal = () => {
  const setModal = useSetAtom(modalContext);

  const openModal = useCallback(
    ({ component }: { component: ReactNode }) =>
      setModal({ component, visible: true }),
    [setModal]
  );

  const closeModal = useCallback(() => {
    setModal({ component: null, visible: false });
  }, [setModal]);

  return { openModal, closeModal };
};
