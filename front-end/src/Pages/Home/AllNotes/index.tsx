import { useGetOtherNotes, useGetPinnedNotes } from "../../../Hooks/queries";
import NotesGrid from "../../../Components/NotesGrid/NotesGrid";

function AllNotesIndex() {
  const { data: notesData = [] } = useGetOtherNotes();
  const { data: pinnedNotesData = [] } = useGetPinnedNotes();

  return (
    <div>
      {pinnedNotesData.length > 0 ? (
        <>
          <NotesGrid title="pinned" notes={pinnedNotesData} />
          <NotesGrid title="others" notes={notesData} />
        </>
      ) : (
        <NotesGrid notes={notesData} />
      )}
    </div>
  );
}

export default AllNotesIndex;
