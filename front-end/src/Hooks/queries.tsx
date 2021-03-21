import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllMyNotes, putNote, getNotesResp, deleteNote } from "../api";

export function useFetchAllMyNotes() {
  const data = useQuery<getNotesResp, Error>("notes", getAllMyNotes);

  return data;
}

export function usePutNote() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (variables: { id: string | number; data: any }) =>
      putNote(variables.id, variables.data)
  );
  return (id: string | number, data: any) =>
    mutation.mutateAsync({ id, data }).then(() => {
      queryClient.invalidateQueries("notes");
    });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();
  const mutation = useMutation((id: number) => deleteNote(id));
  return (id: number) =>
    mutation.mutateAsync(id).then(() => {
      queryClient.invalidateQueries("notes");
    });
}
