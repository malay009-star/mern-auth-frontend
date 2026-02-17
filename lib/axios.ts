import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
//   withCredentials: true,
// });
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

API.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const isRefreshRequest =
      err.config?.url?.includes("/auth/refresh-token") ?? false;
    if (
      err.response?.status === 401 &&
      !err.config._retry &&
      !isRefreshRequest
    ) {
      err.config._retry = true;
      try {
        const { data } = await API.post("/auth/refresh-token");
        accessToken = data.accessToken;
        err.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return API(err.config);
      } catch (refreshErr) {
        accessToken = null;
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  },
);

export default API;
