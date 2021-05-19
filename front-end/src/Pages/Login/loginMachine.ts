import { assign, createMachine } from "xstate";
import { logIn } from "../../api";

interface context {
  error: string;
}

export const loginMachine = createMachine<context>({
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
        src: (ctx, event) => {
          console.log(event);

          //@ts-ignore
          return logIn(event);
        },
        onDone: {
          target: "success"
          //   actions: assign({ user: (context, event) => event.data })
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
