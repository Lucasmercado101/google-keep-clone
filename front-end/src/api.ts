import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export const logIn = (data: { userName: string; password: string }) => {
  return axios
    .post<{ userName: string }>("/auth/login", data, { withCredentials: true })
    .then((resp) => resp.data);
};

export const isLoggedIn = () => {
  return axios
    .get<{ userName: string }>("/auth/me", { withCredentials: true })
    .then((resp) => resp.data);
};
