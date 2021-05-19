import { Machine, assign } from "xstate";
import { createAccount } from "../../api";

interface context {
  error: string;
}

interface stateSchema {
  states: {
    idle: {};
    submitting: {};
    success: {};
    failure: {};
  };
}

export enum sendTypes {
  SUBMITTED = "SUBMITTED",
  SUBMIT = "SUBMIT"
}

type SUBMIT = {
  type: sendTypes.SUBMIT;
  userName: string;
  password: string;
};

type events = SUBMIT;

export const registerMachine = Machine<context, stateSchema, events>({
  id: "router",
  initial: "idle",
  context: { error: "" },
  states: {
    idle: {
      on: {
        SUBMIT: "submitting"
      }
    },
    submitting: {
      invoke: {
        id: "login",
        src: (ctx, event) => createAccount(event as SUBMIT),
        onDone: {
          target: "success"
        },
        onError: {
          target: "failure",
          actions: assign({
            error: (context, event) => {
              const err = event.data;
              if (err.response) {
                // client received an error response (5xx, 4xx)
                if (err.response.status === 404)
                  return `Incorrect username or password (${err?.response?.status})`;
                else return `Server error: ${err.response.status}`;
              } else if (err.request) {
                // client never received a response, or request never left
                return "Network error";
              } else {
                return `An unknown error ocurred`;
              }
            }
          })
        }
      }
    },
    success: {
      type: "final"
    },
    failure: {
      on: {
        SUBMIT: "submitting"
      }
    }
  }
});
