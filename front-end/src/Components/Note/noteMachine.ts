import { Machine, assign } from "xstate";

export enum stateTypes {
  MOUSE_HOVERED_ON = "MOUSE_HOVERED_ON",
  IDLE = "IDLE"
}
export enum sendTypes {
  MOUSE_HOVERED_ON_NOTE = "MOUSE_HOVERED_ON_NOTE",
  MOUSE_LEFT_NOTE_AREA = "MOUSE_LEFT_NOTE_AREA"
}

export const noteMachine = Machine({
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
});
