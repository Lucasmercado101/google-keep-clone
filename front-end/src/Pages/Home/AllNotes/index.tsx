import { useFetchAllMyNotes } from "../../../Hooks/queries";
import Note from "../../../Components/Note/Note";
import NotesGrid from "../../../Components/NotesGrid/NotesGrid";

const testData = [
  {
    title: `
  Lorem ipsum dolor s i ta amet cons ecte tur ad ipi sic ing elit. Doloremque sunt aliquid facilis consequuntur modi porro fugit. Esse sint doloremque quis, laborum molestias ipsum eligendi tempore ullam? Est asperiores sunt vero?
  Veritatis in corporis cum tenetur autem nulla aliquam, odio culpa deleniti cumque suscipit sint rem at esse expedita atque deserunt consequatur sit iste delectus. Non et ullam at sunt aliquid.
  Debitis aut adipisci commodi ratione incidunt vero ex quas dicta obcaecati consequatur magni beatae quod, rerum doloribus odio necessitatibus at exercitationem animi quam perferendis! Incidunt laboriosam inventore ex hic vel!
  Mollitia nihil, aliquam molestiae facere voluptatem fugiat dignissimos eligendi, similique porro odit quis a? Expedita magni illo natus? Iste voluptates praesentium commodi quia, soluta cum quae aliquid deleniti exercitationem dolor.
  Ducimus doloremque unde vitae illo corporis deleniti delectus molestias animi. Dolor repellendus corrupti dolore adipisci reiciendis laborum laudantium ut autem enim iure! Reprehenderit expedita nam quae quidem. Quia, porro minima.`,
    content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum sit similique numquam natus, dolorum amet magni laudantium corporis, ipsam molestias repudiandae eos, non perspiciatis illo vero! Ipsum dignissimos iure laborum?
  Sint veniam quod placeat obcaecati eligendi quae, nobis amet sapiente ut, omnis sed nulla quos minima necessitatibus nihil aliquam id unde natus assumenda iure molestiae incidunt temporibus! Animi, fugit necessitatibus!
  Asperiores libero expedita doloremque? Voluptate dolore numquam asperiores cupiditate! Sit blanditiis maiores soluta, et incidunt culpa, facere, vitae facilis tempora sunt dignissimos nobis ad odio animi iusto molestiae numquam a!
  Cupiditate amet corrupti laudantium nihil, fugit quod doloremque totam, corporis cum debitis quos. Asperiores, sapiente voluptas perferendis, cumque recusandae sunt vero ipsam sint explicabo pariatur, temporibus qui magni quod deserunt.
  Architecto non quam magnam libero vero deserunt debitis fuga voluptate numquam necessitatibus cumque ipsam quaerat tempore repudiandae beatae iste, eum doloremque dolorem. Laboriosam, adipisci? Officiis rem nam repellendus. Aliquid, sapiente.
  Sunt, reprehenderit? Tempora labore veritatis distinctio odio unde provident quisquam officia assumenda voluptas dignissimos, ratione, consequatur earum magnam libero, excepturi exercitationem quia animi quidem saepe qui dicta quasi autem nemo!
  Officia quaerat corrupti earum ipsa nisi consectetur magnam minus accusamus numquam minima eaque exercitationem consequatur, debitis veniam iste saepe sint eveniet nulla neque dolores, illo excepturi dolor. Ipsum, in eaque.
  Error corrupti maiores, autem inventore doloribus harum sint necessitatibus placeat eius, nobis dolores quod iure delectus sapiente quis laborum, molestiae numquam beatae. Rem numquam autem quas, debitis ullam possimus quibusdam.
  Odit non reiciendis nemo! Tempora, libero non! Unde ab architecto ut non sed tenetur error ad laborum quos fugiat officia quasi, hic quas possimus natus veniam maxime optio fuga magni!
  In, asperiores doloremque. Similique non deleniti ratione, voluptatibus ea eaque dignissimos, dolorem ipsam excepturi reiciendis provident maxime culpa nihil et consectetur? Sapiente ut expedita tempora ipsum officia quo eaque nostrum!
  Itaque aliquid impedit fuga saepe similique debitis consectetur officiis voluptate voluptatem dicta ut labore amet, atque nisi quasi! Impedit, ex voluptates? Vel nisi sint id, accusantium eligendi ex amet hic?
  Aliquid, consequuntur iure eaque dolores odio ut pariatur corrupti placeat nisi totam amet facere, velit aspernatur eum quae vero expedita voluptatem quibusdam nostrum non obcaecati? Veritatis facilis commodi quo reprehenderit.
  Sed non excepturi commodi numquam veniam maxime vitae quod temporibus molestias eaque perferendis sequi doloremque consequatur enim veritatis, culpa officiis. Numquam distinctio provident laudantium. Itaque ducimus assumenda repudiandae modi consectetur?
  Quos exercitationem pariatur adipisci nisi odio delectus officiis laborum molestias omnis ipsam quasi perferendis totam autem eum temporibus animi ullam asperiores, distinctio accusamus molestiae? Numquam in suscipit incidunt necessitatibus optio.
  Saepe natus veniam facilis quis! Fuga corporis nulla eius minima quisquam delectus corrupti minus officia porro explicabo est facilis in obcaecati hic, molestiae magnam aut. Deserunt odio placeat assumenda similique.`
  },
  { title: "short title", content: "also short content" }
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
