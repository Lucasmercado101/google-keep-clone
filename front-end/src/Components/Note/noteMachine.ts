import { Machine, assign } from "xstate";

export enum stateTypes {
  MOUSE_HOVERED_ON = "MOUSE_HOVERED_ON"
}
export enum sendTypes {
  MOUSE_HOVERED_ON_NOTE = "MOUSE_HOVERED_ON_NOTE"
}

export const noteMachine = Machine({
  initial: "idle",
  states: {
    idle: {
      on: {
        [stateTypes.MOUSE_HOVERED_ON]: sendTypes.MOUSE_HOVERED_ON_NOTE
      }
    },
    [stateTypes.MOUSE_HOVERED_ON]: {}
  }
});
