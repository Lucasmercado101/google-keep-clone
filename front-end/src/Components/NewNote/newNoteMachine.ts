import { Machine } from "xstate";

export enum stateTypes {
  IDLE = "IDLE",
  CREATING_NEW_NOTE = "CREATING_NEW_NOTE"
}

export enum sendTypes {
  FOCUSED_ON_INPUT_BAR = "FOCUSED_ON_INPUT_BAR"
}

export const newNoteMachine = Machine({
  initial: stateTypes.IDLE,
  states: {
    [stateTypes.IDLE]: {
      on: {
        [sendTypes.FOCUSED_ON_INPUT_BAR]: stateTypes.CREATING_NEW_NOTE
      }
    },
    [stateTypes.CREATING_NEW_NOTE]: {}
  }
});
