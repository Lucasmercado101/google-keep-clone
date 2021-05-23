import { Machine, assign } from "xstate";

interface context {
  title: string;
  content: string;
  history: { title: string; content: string }[];
}

export enum stateTypes {
  IDLE = "IDLE",
  CREATING_NEW_NOTE = "CREATING_NEW_NOTE",

  // title
  TITLE_IS_EMPTY = "TITLE_IS_EMPTY",
  TITLE_IS_NOT_EMPTY = "TITLE_IS_NOT_EMPTY",

  // content
  CONTENT_IS_EMPTY = "CONTENT_IS_EMPTY",
  CONTENT_IS_NOT_EMPTY = "CONTENT_IS_NOT_EMPTY",

  // pin
  PINNED = "PINNED",
  UNPINNED = "UNPINNED"
}

export enum sendTypes {
  FOCUSED_ON_INPUT_BAR = "FOCUSED_ON_INPUT_BAR",
  CLICKED_OUTSIDE_OF_NOTE = "CLICKED_OUTSIDE_OF_NOTE",

  // title
  TITLE_TEXT_WAS_SENT = "TITLE_TEXT_WAS_SENT",

  //content
  CONTENT_TEXT_WAS_SENT = "CONTENT_TEXT_WAS_SENT",

  // pin
  TOGGLE_PIN = "TOGGLE_PIN"
}

export const newNoteMachine = Machine<context>(
  {
    context: {
      title: "",
      content: "",
      history: [{ title: "", content: "" }]
    },
    initial: stateTypes.IDLE,
    states: {
      [stateTypes.IDLE]: {
        on: {
          [sendTypes.FOCUSED_ON_INPUT_BAR]: stateTypes.CREATING_NEW_NOTE
        }
      },
      [stateTypes.CREATING_NEW_NOTE]: {
        type: "parallel",
        states: {
          pinned: {
            initial: stateTypes.UNPINNED,
            states: {
              [stateTypes.UNPINNED]: {
                on: {
                  [sendTypes.TOGGLE_PIN]: stateTypes.PINNED
                }
              },
              [stateTypes.PINNED]: {
                on: {
                  [sendTypes.TOGGLE_PIN]: stateTypes.UNPINNED
                }
              }
            }
          },
          title: {
            initial: stateTypes.TITLE_IS_EMPTY,
            states: {
              [stateTypes.TITLE_IS_EMPTY]: {},
              [stateTypes.TITLE_IS_NOT_EMPTY]: {}
            },
            on: {
              [sendTypes.TITLE_TEXT_WAS_SENT]: [
                {
                  target: `.${stateTypes.TITLE_IS_NOT_EMPTY}`,
                  cond: "titleTextWasSentNotEmpty",
                  actions: "assignTitle"
                },
                {
                  target: `.${stateTypes.TITLE_IS_EMPTY}`,
                  actions: "assignTitle"
                }
              ]
            }
          },
          content: {
            initial: stateTypes.CONTENT_IS_EMPTY,
            states: {
              [stateTypes.CONTENT_IS_EMPTY]: {},
              [stateTypes.CONTENT_IS_NOT_EMPTY]: {}
            },
            on: {
              [sendTypes.CONTENT_TEXT_WAS_SENT]: [
                {
                  target: `.${stateTypes.CONTENT_IS_NOT_EMPTY}`,
                  cond: "contentTextWasSentNotEmpty",
                  actions: "assignContent"
                },
                {
                  target: `.${stateTypes.CONTENT_IS_EMPTY}`,
                  actions: "assignContent"
                }
              ]
            }
          }
        },
        on: {
          [sendTypes.CLICKED_OUTSIDE_OF_NOTE]: {
            target: stateTypes.IDLE
          }
        }
      }
    }
  },
  {
    guards: {
      titleTextWasSentNotEmpty: (_, e) => !!e.title.length,
      contentTextWasSentNotEmpty: (_, e) => !!e.content.length
    },
    actions: {
      assignTitle: assign({
        title: (ctx, e) => (ctx.title = e.title.substr(0, 150))
      }),
      assignContent: assign({
        content: (ctx, e) => (ctx.content = e.content.substr(0, 750))
      })
    }
  }
);
