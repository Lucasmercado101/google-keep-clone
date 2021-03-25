import NotesGrid from "../../Components/NotesGrid/NotesGrid";
import { useFetchAllMyNotes } from "../../Hooks/queries";

function Archived() {
  const { data: notesData } = useFetchAllMyNotes();
  return <div>{notesData && <NotesGrid notes={notesData.archived} />}</div>;
}

export default Archived;
