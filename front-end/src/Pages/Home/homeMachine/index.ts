import { Machine } from "xstate";
interface context {}

export enum sendTypes {
  HOVER_ON_DRAWER = "HOVER_ON_DRAWER",
  TOGGLE_DRAWER_TO_DEFAULT = "TOGGLE_DRAWER_TO_DEFAULT",
  TOGGLE_DRAWER_CLOSE = "TOGGLE_DRAWER_CLOSE",
  MOUSE_LEFT_AREA = "MOUSE_LEFT_AREA"
}

export enum stateTypes {
  DRAWER_DEFAULT = "DRAWER_DEFAULT",
  DRAWER_TOGGLED_OPEN = "DRAWER_TOGGLED_OPEN",

  DRAWER_IS_CLOSED = "DRAWER_IS_CLOSED",
  DRAWER_IS_HOVERED_OPEN = "DRAWER_IS_HOVERED_OPEN"
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
  };
}

// type LOGGED_IN_SUCCESSFULLY = {
//   type: sendTypes.LOGGED_IN_SUCCESSFULLY;
// };

// type LOG_OUT = {
//   type: sendTypes.LOG_OUT;
// };

// type GO_TO_LOGIN = {
//   type: sendTypes.GO_TO_LOGIN;
// };

// type GO_TO_REGISTER = {
//   type: sendTypes.GO_TO_REGISTER;
// };

// type events = LOGGED_IN_SUCCESSFULLY | LOG_OUT | GO_TO_LOGIN | GO_TO_REGISTER;

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

export const routerMachine = Machine<context, stateSchema>({
  id: "router",
  type: "parallel",
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
    }
  }
});
