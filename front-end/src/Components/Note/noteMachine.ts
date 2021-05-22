import { Machine } from "xstate";
import { putPinNote, putUnpinNote } from "../../api";

export enum stateTypes {
  MOUSE_HOVERED_ON = "MOUSE_HOVERED_ON",
  IDLE = "IDLE",

  // pin
  PINNED = "PINNED",
  PINNING = "PINNING",
  UNPINNED = "UNPINNED",
  UNPINNING = "UNPINNING"
}

export enum sendTypes {
  MOUSE_HOVERED_ON_NOTE = "MOUSE_HOVERED_ON_NOTE",
  MOUSE_LEFT_NOTE_AREA = "MOUSE_LEFT_NOTE_AREA",

  // pin
  PIN = "PIN",
  UNPIN = "UNPIN"
}

export const noteMachine = Machine({
  initial: stateTypes.IDLE,
  type: "parallel",
  states: {
    noteDefault: {
      initial: stateTypes.IDLE,
      states: {
        [stateTypes.IDLE]: {
          on: {
            [sendTypes.MOUSE_HOVERED_ON_NOTE]: stateTypes.MOUSE_HOVERED_ON
          }
        },
        [stateTypes.MOUSE_HOVERED_ON]: {
          on: {
            [sendTypes.MOUSE_LEFT_NOTE_AREA]: stateTypes.IDLE
          }
        }
      }
    },
    pin: {
      initial: stateTypes.UNPINNED,
      states: {
        [stateTypes.UNPINNED]: {},
        [stateTypes.PINNING]: {
          invoke: {
            src: (_, event) => putPinNote(event.id),
            onDone: {
              target: stateTypes.PINNED
            },
            onError: {
              target: stateTypes.UNPINNED
            }
          }
        },
        [stateTypes.PINNED]: {},
        [stateTypes.UNPINNING]: {
          invoke: {
            src: (_, event) => putUnpinNote(event.id),
            onDone: {
              target: stateTypes.UNPINNED
            },
            onError: {
              target: stateTypes.PINNED
            }
          }
        }
      },
      on: {
        [sendTypes.PIN]: `.${stateTypes.PINNING}`,
        [sendTypes.UNPIN]: `.${stateTypes.UNPINNING}`
      }
    }
  }
});
