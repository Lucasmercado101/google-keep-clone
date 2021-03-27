import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getAllMyNotes,
  putNote,
  getNotesResp,
  deleteNote,
  getLabels,
  label,
  addNewLabel,
  removeLabelFromNote,
  getLabelById,
  deleteLabel,
  putLabelById
} from "../api";

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

export function usePutLabel() {
  const queryClient = useQueryClient();
  const mutation = useMutation((variables: { id: number; name: string }) =>
    putLabelById(variables.id, variables.name)
  );
  return (id: number, name: string) =>
    mutation.mutateAsync({ id, name }).then(() => {
      queryClient.invalidateQueries("labels");
      // TODO: this should update only the note whose label
      // was updated, not all notes
      queryClient.invalidateQueries("notes");
    });
}

export function useRemoveLabelFromNote() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ noteId, labelId }: { noteId: number; labelId: number }) =>
      removeLabelFromNote(noteId, labelId)
  );
  return (noteId: number, labelId: number) =>
    mutation.mutateAsync({ noteId, labelId }).then(() => {
      // TODO: this should update only the note whose label
      // was deleted, not all notes
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

export function useDeleteLabel() {
  const queryClient = useQueryClient();
  const mutation = useMutation((id: number) => deleteLabel(id));
  return (id: number) =>
    mutation.mutateAsync(id).then(() => {
      queryClient.invalidateQueries("labels");
    });
}

export function useGetLabels() {
  return useQuery<label[], Error>("labels", getLabels);
}

export function useGetLabelById(labelId: number) {
  return useQuery<label, Error>(
    ["label", labelId],
    () => getLabelById(labelId),
    {
      enabled: !!labelId
    }
  );
}

export function usePostNewLabel() {
  const queryClient = useQueryClient();
  const mutation = useMutation((name: string) => addNewLabel(name));
  return (name: string) =>
    mutation.mutateAsync(name).then(() => {
      queryClient.invalidateQueries("labels");
      // TODO: this is only so that when i add/remove
      // a label i can show it on the note, change this
      queryClient.invalidateQueries("notes");
    });
}
