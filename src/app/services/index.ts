import axios from "axios";

export const paint = axios.create({
  baseURL: "/api/",
});
