import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

type baseModelData = {
  createdAt: Date;
  updatedAt: Date;
};

export type noteColors =
  | null
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "blue"
  | "darkblue"
  | "purple"
  | "pink"
  | "brown"
  | "gray";

export type Note = {
  id: number;
  title: string;
  content: string;
  pinned: boolean;
  archived: boolean;
  color: noteColors;
} & baseModelData;

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

export type label = {
  id: number;
  name: string;
} & baseModelData;

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

export const deleteLabel = (id: number) => {
  return axios.delete(`/label/${id}`).then((resp) => resp.data);
};

export const getLabels = () => {
  return axios.get<label[]>(`/label/`).then((resp) => resp.data);
};

export const addNewLabel = (name: string) => {
  return axios.post("/label/", { name }).then((resp) => resp.data);
};

export const removeLabelFromNote = (noteId: number, labelId: number) => {
  return axios
    .delete("/note/label/", { data: { noteId, labelId } })
    .then((resp) => resp.data);
};

export const getLabelById = (labelId: number) => {
  return axios.get("/label/" + labelId).then((resp) => resp.data);
};

export const putLabelById = (labelId: number, name: string) => {
  return axios.put("/label/" + labelId, { name }).then((resp) => resp.data);
};
