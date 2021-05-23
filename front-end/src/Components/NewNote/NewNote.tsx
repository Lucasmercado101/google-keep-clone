import { makeStyles, InputBase, ClickAwayListener } from "@material-ui/core";
import { newNoteMachine, stateTypes, sendTypes } from "./newNoteMachine";
import { useMachine } from "@xstate/react";
import clsx from "clsx";
import Note from "./Note";

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    minHeight: 46,
    maxHeight: 46,
    padding: theme.spacing(0, 2)
  },
  outerContainer: {
    display: "grid",
    placeItems: "center",
    padding: theme.spacing(4, 0)
  },
  container: {
    border: `thin solid ${theme.palette.text.disabled}`,
    boxShadow: theme.shadows[3],
    borderRadius: 8,
    width: "100%",
    display: "flex"
  },
  outerWrapper: {
    width: "100%",
    maxWidth: 600
  }
}));

function NewNote() {
  const machine = useMachine(newNoteMachine);
  const [state, send] = machine;
  const classes = useStyles();

  return (
    <div>
      <div className={classes.outerContainer}>
        <div className={classes.outerWrapper}>
          {state.matches(stateTypes.IDLE) ? (
            <div className={clsx(classes.container, classes.inputContainer)}>
              <InputBase
                onFocus={() => send(sendTypes.FOCUSED_ON_INPUT_BAR)}
                style={{ flexGrow: 1 }}
                placeholder="Take a note..."
              />
            </div>
          ) : (
            <ClickAwayListener
              onClickAway={() => send(sendTypes.CLICKED_OUTSIDE_OF_NOTE)}
            >
              <div>
                <Note machine={machine} />
              </div>
            </ClickAwayListener>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewNote;
