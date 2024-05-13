import axios from "axios";

export const paint = axios.create({
  baseURL: "/api/",
});

export const authorization = () => ({
  headers: {
    Authorization: localStorage.getItem("access_token"),
  },
});
