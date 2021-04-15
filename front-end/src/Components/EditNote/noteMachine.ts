import { Machine, assign } from "xstate";

interface TextContext {
  title: string;
  content: string;
  history: { title: string; content: string }[];
  historyPointer: number;
}

interface TextStateSchema {
  states: {
    title: {
      states: {
        transient: {};
        empty: {};
        not_empty: {};
      };
    };
    content: {
      states: {
        transient: {};
        empty: {};
        not_empty: {};
      };
    };
    history: {
      states: {
        idle: {};
        typing: {};
      };
    };
  };
}

type TYPING_TITLE = { type: "TYPING_TITLE"; title: string };
type TYPING_CONTENT = { type: "TYPING_CONTENT"; content: string };
type UNDO = { type: "UNDO" };
type REDO = { type: "REDO" };

type TextEvent = TYPING_TITLE | TYPING_CONTENT | UNDO | REDO;

const historyStates = {
  initial: "idle" as "idle",
  states: {
    idle: {
      on: {
        TYPING_CONTENT: "typing",
        TYPING_TITLE: "typing"
      }
    },
    typing: {
      entry: "clearFutureHistory",
      after: {
        750: {
          target: "idle",
          actions: "addToHistory"
        }
      }
    }
  },
  on: {
    UNDO: {
      target: ".idle",
      actions: "undo",
      cond: "canUndo"
    },
    REDO: {
      target: ".idle",
      actions: "redo",
      cond: "canRedo"
    }
  }
};

const titleStates = {
  initial: "transient" as "transient",
  states: {
    transient: {
      on: {
        "": [
          {
            target: "not_empty",
            cond: "titleIsNotEmpty"
          },
          {
            target: "empty"
          }
        ]
      }
    },
    empty: {},
    not_empty: {}
  },
  on: {
    UNDO: ".transient",
    REDO: ".transient",
    TYPING_TITLE: {
      target: ".transient",
      actions: "changeTitle"
    }
  }
};

const contentStates = {
  initial: "transient" as "transient",
  states: {
    transient: {
      on: {
        "": [
          {
            target: "not_empty",
            cond: "contentIsNotEmpty"
          },
          {
            target: "empty"
          }
        ]
      }
    },
    empty: {},
    not_empty: {}
  },
  on: {
    REDO: ".transient",
    UNDO: ".transient",
    TYPING_CONTENT: {
      target: ".transient",
      actions: "changeContent"
    }
  }
};

export default Machine<TextContext, TextStateSchema, TextEvent>(
  {
    id: "note",
    type: "parallel",
    context: {
      title: "",
      content: "",
      history: [{ title: "", content: "" }],
      historyPointer: 0
    },
    states: {
      history: historyStates,
      title: titleStates,
      content: contentStates
    }
  },
  {
    actions: {
      clearFutureHistory: assign({
        history: (ctx) => ctx.history.slice(0, ctx.historyPointer + 1)
      }),
      undo: assign((ctx) => {
        const newHistoryPointer = ctx.historyPointer - 1;
        const { title, content } = ctx.history[newHistoryPointer];
        return {
          historyPointer: newHistoryPointer,
          title,
          content
        };
      }),
      redo: assign((ctx) => {
        const newHistoryPointer = ctx.historyPointer + 1;
        const { title, content } = ctx.history[newHistoryPointer];
        return {
          historyPointer: newHistoryPointer,
          title,
          content
        };
      }),
      changeTitle: assign({
        title: (_, event) => (event as TYPING_TITLE).title || ""
      }),
      changeContent: assign({
        content: (_, event) => (event as TYPING_CONTENT).content || ""
      }),

      addToHistory: assign((context) => {
        const { history, title = "", content = "", historyPointer } = context;
        const { title: previousTitle, content: previousContent } = history[
          history.length - 1
        ];

        const titleHasChanged = title !== previousTitle;
        const contentHasChanged = previousContent !== content;

        let newHistoryPointer = historyPointer;
        if (titleHasChanged || contentHasChanged) {
          history.push({ title, content });
          newHistoryPointer++;
        }

        return {
          history,
          historyPointer: newHistoryPointer
        };
      })
    },
    guards: {
      titleIsNotEmpty: (context, _) =>
        !!context.title && !!context.title.length,
      contentIsNotEmpty: (context, _) =>
        !!context.content && !!context.content.length,
      canUndo: (ctx) => ctx.historyPointer >= 1,
      canRedo: (ctx) => ctx.history.length - 1 > ctx.historyPointer
    }
  }
);
