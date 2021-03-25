import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export type Note = {
  id: number;
  title: string;
  content: string;
  pinned: boolean;
  archived: boolean;
  color:
    | null
    | [
        "red",
        "orange",
        "yellow",
        "green",
        "teal",
        "blue",
        "darkblue",
        "purple",
        "pink",
        "brown",
        "gray"
      ];
};

type pinnedNote = Note & {
  pinned: true;
};
type archivedNote = Note & {
  archived: true;
};

export type getNotesResp = {
  pinned: pinnedNote[];
  archived: archivedNote[];
  other: Note[];
};

export const logIn = (data: { userName: string; password: string }) => {
  return axios
    .post<{ userName: string }>("/auth/login", data)
    .then((resp) => resp.data);
};

export const isLoggedIn = () => {
  return axios.get<{ userName: string }>("/auth/me").then((resp) => resp.data);
};

export const getAllMyNotes = () => {
  return axios.get<getNotesResp>("/note/").then((resp) => resp.data);
};

export const putNote = (id: string | number, data: any) => {
  return axios.put<Note>(`/note/${id}`, data).then((resp) => resp.data);
};

export const createNewNote = (data: any) => {
  return axios.post<Note>("/note/", data).then((resp) => resp.data);
};

export const deleteNote = (id: number) => {
  return axios.delete(`/note/${id}`).then((resp) => resp.data);
};
