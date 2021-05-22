import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";
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

interface pinnedNote extends Note {
  pinned: true;
}
type archivedNote = Note & {
  archived: true;
};

export interface label extends baseModelData {
  id: number;
  name: string;
}

export interface noteWithLabels extends Note {
  labels: label[];
}

export interface pinnedNoteWithLabels extends noteWithLabels {
  pinned: true;
}

export interface normalNoteWithLabels extends noteWithLabels {
  pinned: false;
  archived: false;
}

export const logIn = (data: { userName: string; password: string }) => {
  return axios
    .post<{ userName: string }>("/auth/login", data)
    .then((resp) => resp.data);
};

export const logOut = () => {
  return axios.get("/auth/logout");
};

export const getPinnedNotes = () => {
  return axios
    .get<pinnedNoteWithLabels[]>("/notes?pinned=true")
    .then((resp) => resp.data);
};

export const getNormalNotes = () => {
  return axios
    .get<normalNoteWithLabels[]>("/notes?pinned=false&archived=false")
    .then((resp) => resp.data);
};

export const createAccount = (data: { userName: string; password: string }) => {
  return axios
    .post<{ userName: string }>("/auth/register", data)
    .then((resp) => resp.data);
};

export const isLoggedIn = () => {
  return axios
    .get<{ userName: string }>("/auth/is-logged-in")
    .then((resp) => resp.data);
};

export const getAllMyNotes = () => {
  return axios.get<Note[]>("/notes/").then((resp) => resp.data);
};

export const putNote = (id: string | number, data: any) => {
  return axios.put<Note>(`/notes/${id}`, data).then((resp) => resp.data);
};

export const createNewNote = (data: any) => {
  return axios.post<Note>("/notes/", data).then((resp) => resp.data);
};

export const deleteNote = (id: number) => {
  return axios.delete(`/notes/${id}`).then((resp) => resp.data);
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
    .delete("/notes/label/", { data: { noteId, labelId } })
    .then((resp) => resp.data);
};

export const getLabelById = (labelId: number) => {
  return axios.get("/label/" + labelId).then((resp) => resp.data);
};

export const putLabelById = (labelId: number, name: string) => {
  return axios.put("/label/" + labelId, { name }).then((resp) => resp.data);
};

export const putPinNote = (noteId: number) => {
  return axios
    .put(`/notes/${noteId}`, { pinned: true })
    .then((resp) => resp.data);
};

export const putUnpinNote = (noteId: number) => {
  return axios
    .put(`/notes/${noteId}`, { pinned: false })
    .then((resp) => resp.data);
};
