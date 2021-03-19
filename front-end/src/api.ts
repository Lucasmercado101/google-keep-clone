import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export type Note = {
  id: number;
  title: string;
  content: string;
  pinned: boolean;
  archived: boolean;
};

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

export const getAllMyNotes = () => {
  return axios
    .get<Note[]>("/note/", { withCredentials: true })
    .then((resp) => resp.data);
};

export const createNewNote = (data: any) => {
  return axios
    .post<Note>("/note/", data, { withCredentials: true })
    .then((resp) => resp.data);
};
