import { Machine, assign } from "xstate";
interface context {
  initialNoteEditData?: {
    id: number;
    archived: boolean;
    content: string;
    pinned: boolean;
    title: string;
    color: string;
    labels: string[];
  };
}

export enum sendTypes {
  HOVER_ON_DRAWER = "HOVER_ON_DRAWER",
  TOGGLE_DRAWER_TO_DEFAULT = "TOGGLE_DRAWER_TO_DEFAULT",
  TOGGLE_DRAWER_CLOSE = "TOGGLE_DRAWER_CLOSE",
  MOUSE_LEFT_AREA = "MOUSE_LEFT_AREA",

  //routes
  NAVIGATE_TO_MAIN_NOTES = "NAVIGATE_TO_MAIN_NOTES",
  NAVIGATE_TO_ARCHIVED_NOTES = "NAVIGATE_TO_ARCHIVED_NOTES",

  // is editing note
  EDIT_NOTE = "EDIT_NOTE",
  STOP_EDITING_NOTE = "STOP_EDITING_NOTE"
}

export enum stateTypes {
  DRAWER_DEFAULT = "DRAWER_DEFAULT",
  DRAWER_TOGGLED_OPEN = "DRAWER_TOGGLED_OPEN",

  DRAWER_IS_CLOSED = "DRAWER_IS_CLOSED",
  DRAWER_IS_HOVERED_OPEN = "DRAWER_IS_HOVERED_OPEN",

  // routes
  MAIN_NOTES = "MAIN_NOTES",
  ARCHIVED_NOTES = "ARCHIVED_NOTES",

  // is editing note
  NOT_EDITING_NOTE = "NOT_EDITING_NOTE",
  EDITING_NOTE = "EDITING_NOTE"
}

interface stateSchema {
  states: {
    drawer: {
      states: {
        [stateTypes.DRAWER_TOGGLED_OPEN]: {};
        [stateTypes.DRAWER_DEFAULT]: {
          states: {
            [stateTypes.DRAWER_IS_CLOSED]: {};
            [stateTypes.DRAWER_IS_HOVERED_OPEN]: {};
          };
        };
      };
    };
    routes: {
      states: {
        [stateTypes.MAIN_NOTES]: {};
        [stateTypes.ARCHIVED_NOTES]: {};
      };
    };
    isEditingNote: {
      states: {
        [stateTypes.NOT_EDITING_NOTE]: {};
        [stateTypes.EDITING_NOTE]: {};
      };
    };
  };
}

type EDIT_NOTE = {
  type: sendTypes.EDIT_NOTE;

  id: number;
  archived: boolean;
  content: string;
  pinned: boolean;
  title: string;
  color: string;
  labels: string[];
};
type HOVER_ON_DRAWER = { type: sendTypes.HOVER_ON_DRAWER };
type TOGGLE_DRAWER_TO_DEFAULT = { type: sendTypes.TOGGLE_DRAWER_TO_DEFAULT };
type TOGGLE_DRAWER_CLOSE = { type: sendTypes.TOGGLE_DRAWER_CLOSE };
type MOUSE_LEFT_AREA = { type: sendTypes.MOUSE_LEFT_AREA };
type NAVIGATE_TO_MAIN_NOTES = { type: sendTypes.NAVIGATE_TO_MAIN_NOTES };
type NAVIGATE_TO_ARCHIVED_NOTES = {
  type: sendTypes.NAVIGATE_TO_ARCHIVED_NOTES;
};
type STOP_EDITING_NOTE = { type: sendTypes.STOP_EDITING_NOTE };

type events =
  | EDIT_NOTE
  | HOVER_ON_DRAWER
  | TOGGLE_DRAWER_TO_DEFAULT
  | TOGGLE_DRAWER_CLOSE
  | MOUSE_LEFT_AREA
  | NAVIGATE_TO_MAIN_NOTES
  | NAVIGATE_TO_ARCHIVED_NOTES
  | STOP_EDITING_NOTE;

const drawerDefaultStates = {
  initial: stateTypes.DRAWER_IS_CLOSED as stateTypes.DRAWER_IS_CLOSED,
  states: {
    [stateTypes.DRAWER_IS_CLOSED]: {
      on: {
        [sendTypes.HOVER_ON_DRAWER]: stateTypes.DRAWER_IS_HOVERED_OPEN
      }
    },
    [stateTypes.DRAWER_IS_HOVERED_OPEN]: {}
  }
};

export const routerMachine = Machine<context, stateSchema, events>({
  id: "main_notes",
  type: "parallel",
  context: {},
  states: {
    drawer: {
      initial: stateTypes.DRAWER_DEFAULT,
      states: {
        [stateTypes.DRAWER_TOGGLED_OPEN]: {
          on: {
            [sendTypes.TOGGLE_DRAWER_TO_DEFAULT]: stateTypes.DRAWER_DEFAULT
          }
        },
        [stateTypes.DRAWER_DEFAULT]: {
          on: {
            [sendTypes.TOGGLE_DRAWER_CLOSE]: stateTypes.DRAWER_TOGGLED_OPEN,
            [sendTypes.MOUSE_LEFT_AREA]: `.${stateTypes.DRAWER_IS_CLOSED}`
          },
          ...drawerDefaultStates
        }
      }
    },
    routes: {
      initial: stateTypes.MAIN_NOTES,
      states: {
        [stateTypes.MAIN_NOTES]: {},
        [stateTypes.ARCHIVED_NOTES]: {}
      },
      on: {
        [sendTypes.NAVIGATE_TO_MAIN_NOTES]: `.${stateTypes.MAIN_NOTES}`,
        [sendTypes.NAVIGATE_TO_ARCHIVED_NOTES]: `.${stateTypes.ARCHIVED_NOTES}`
      }
    },
    isEditingNote: {
      initial: stateTypes.NOT_EDITING_NOTE,
      states: {
        [stateTypes.NOT_EDITING_NOTE]: {
          on: {
            [sendTypes.EDIT_NOTE]: {
              target: stateTypes.EDITING_NOTE,
              actions: assign((_, event) => {
                const { type, ...noteDataToEdit } = event as EDIT_NOTE;
                return { initialNoteEditData: noteDataToEdit };
              })
            }
          }
        },
        [stateTypes.EDITING_NOTE]: {
          on: {
            [sendTypes.STOP_EDITING_NOTE]: {
              target: stateTypes.NOT_EDITING_NOTE,
              actions: assign({
                initialNoteEditData: (ctx, event) => undefined
              })
            }
          }
        }
      }
    }
  }
});
