import { atom } from "jotai";

export const signupContext = atom({
  userName: "",
  birthDate: "",
  certFile: "",
  password: "",
  bankCodeList: [] as Array<string>,
});
