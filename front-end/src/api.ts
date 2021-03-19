import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export const Login = (data: { userName: string; password: string }) => {
  axios.post("/login", data);
};
