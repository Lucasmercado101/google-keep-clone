import { useFetchAllMyNotes } from "../../../Hooks/queries";
import Note from "../../../Components/Note/Note";
import NotesGrid from "../../../Components/NotesGrid/NotesGrid";

const testData = [
  {
    title: `
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque sunt aliquid facilis consequuntur modi porro fugit. Esse sint doloremque quis, laborum molestias ipsum eligendi tempore ullam? Est asperiores sunt vero?
  Veritatis in corporis cum tenetur autem nulla aliquam, odio culpa deleniti cumque suscipit sint rem at esse expedita atque deserunt consequatur sit iste delectus. Non et ullam at sunt aliquid.
  Debitis aut adipisci commodi ratione incidunt vero ex quas dicta obcaecati consequatur magni beatae quod, rerum doloribus odio necessitatibus at exercitationem animi quam perferendis! Incidunt laboriosam inventore ex hic vel!
  Mollitia nihil, aliquam molestiae facere voluptatem fugiat dignissimos eligendi, similique porro odit quis a? Expedita magni illo natus? Iste voluptates praesentium commodi quia, soluta cum quae aliquid deleniti exercitationem dolor.
  Ducimus doloremque unde vitae illo corporis deleniti delectus molestias animi. Dolor repellendus corrupti dolore adipisci reiciendis laborum laudantium ut autem enim iure! Reprehenderit expedita nam quae quidem. Quia, porro minima.`
  }
];

function AllNotesIndex() {
  const { data: notesData } = useFetchAllMyNotes();
  return (
    <div>
      <NotesGrid notes={testData} />
    </div>
  );
}

export default AllNotesIndex;
