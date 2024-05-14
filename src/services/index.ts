import axios from "axios";

export const paint = axios.create({
  baseURL: "/api/",
});

paint.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    if (response.status === 500 && !config.sent) {
      config.sent = true;
      await paint.post("/token/connected");
      paint(config);
    }

    return Promise.reject(error);
  }
);

export const authorization = () => ({
  headers: {
    Authorization: localStorage.getItem("access_token"),
  },
});
