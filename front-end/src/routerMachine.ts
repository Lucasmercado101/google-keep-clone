import { Machine } from "xstate";

interface context {}

export enum statesTypes {
  LOGIN = "login",
  REGISTER = "register",
  NOTES_MAIN = "notesMain"
}

interface stateSchema {
  states: {
    [statesTypes.LOGIN]: {};
    [statesTypes.REGISTER]: {};
    [statesTypes.NOTES_MAIN]: {};
  };
}

export enum sendTypes {
  LOGGED_IN_SUCCESSFULLY = "LOGGED_IN_SUCCESSFULLY",
  LOG_OUT = "LOG_OUT",
  GO_TO_LOGIN = "GO_TO_LOGIN",
  GO_TO_REGISTER = "GO_TO_REGISTER"
}

type LOGGED_IN_SUCCESSFULLY = {
  type: sendTypes.LOGGED_IN_SUCCESSFULLY;
};

type LOG_OUT = {
  type: sendTypes.LOG_OUT;
};

type GO_TO_LOGIN = {
  type: sendTypes.GO_TO_LOGIN;
};

type GO_TO_REGISTER = {
  type: sendTypes.GO_TO_REGISTER;
};

type events = LOGGED_IN_SUCCESSFULLY | LOG_OUT | GO_TO_LOGIN | GO_TO_REGISTER;

export const routerMachine = Machine<context, stateSchema, events>({
  id: "router",
  initial: statesTypes.LOGIN,
  states: {
    [statesTypes.LOGIN]: {
      on: {
        [sendTypes.LOGGED_IN_SUCCESSFULLY]: statesTypes.NOTES_MAIN,
        [sendTypes.GO_TO_REGISTER]: statesTypes.REGISTER
      }
    },
    [statesTypes.REGISTER]: {
      on: {
        [sendTypes.GO_TO_LOGIN]: statesTypes.LOGIN
      }
    },
    [statesTypes.NOTES_MAIN]: {
      on: {
        [sendTypes.LOG_OUT]: statesTypes.LOGIN
      }
    }
  }
});
