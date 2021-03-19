import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export const logIn = (data: { userName: string; password: string }) => {
  return axios
    .post<{ userName: string }>("/auth/login", data)
    .then((resp) => resp.data);
};
