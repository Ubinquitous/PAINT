import { atom } from "jotai";
import ModalType from "~/types/modal.type";

export const signupContext = atom({
  userName: "",
  birthDate: "",
  certFile: "",
  password: "",
  bankCodeList: [] as Array<string>,
});

export const userContext = atom({
  birthDate: "",
  userName: "",
  isLoggedIn: false,
});

export const modalContext = atom<ModalType>({
  component: null,
  visible: false,
});
