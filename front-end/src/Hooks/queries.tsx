import { AxiosError } from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllMyNotes, Note, putNote, getNotesResp } from "../api";

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
