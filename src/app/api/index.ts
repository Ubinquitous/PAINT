import axios from "axios";

export const codef = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CODEF_URL,
});
