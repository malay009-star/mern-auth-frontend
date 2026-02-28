import API from "./axios";

export const loginUser = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

export const registerUser = (data: { email: string; password: string }) =>
  API.post("/auth/register", data);

export const logoutUser = () => API.post("/auth/logout");

export const getProfile = () => API.get("/users/profile");

export const getDashboard = () => API.get("/users/dashboard");
