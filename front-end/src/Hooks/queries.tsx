import { useQuery } from "react-query";
import { getAllMyNotes, Note } from "../api";

export function useFetchAllMyNotes() {
  const data = useQuery<Note[], Error>("notes", getAllMyNotes);

  return data;
}
