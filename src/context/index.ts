import { atom } from "jotai";

export const signupContext = atom({
  name: "",
  birthday: "",
  phoneNumber: "",
  certFile: "",
  bankCodeList: [] as Array<string>,
});
