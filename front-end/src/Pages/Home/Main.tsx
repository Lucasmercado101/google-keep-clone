import { useLayoutEffect } from "react";
import { useRoute } from "react-router5";
import { useHomeMachineFSM } from "./homeMachine/homeMachineContext";
import { sendTypes, stateTypes } from "../../Pages/Home/homeMachine";
import AllNotes from "./AllNotes";

function Main() {
  const [state, send] = useHomeMachineFSM();
  const { route } = useRoute();
  // /notes/<<routeName>>
  const routeName = route.name.split(".")[1];

  useLayoutEffect(() => {
    switch (routeName) {
      // in notes main
      case "home":
        send(sendTypes.NAVIGATE_TO_MAIN_NOTES);
        break;
      case "archived":
        send(sendTypes.NAVIGATE_TO_ARCHIVED_NOTES);
        break;
      //   default:
      //     send(sendTypes.GO_TO_LOGIN);
      //     break;
    }
  }, [routeName, send]);

  switch (true) {
    case state.matches({ routes: stateTypes.MAIN_NOTES }):
      return <AllNotes />;
    case state.matches({ routes: stateTypes.ARCHIVED_NOTES }):
      return <div>on archived</div>;
    // case state.matches(statesTypes.NOTES_MAIN):
    //   return <NotesHome />;
    default:
      return null;
  }
}

export default Main;
