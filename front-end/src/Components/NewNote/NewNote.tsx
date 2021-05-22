import {
  makeStyles,
  InputBase,
  IconButton,
  Typography
} from "@material-ui/core";
import { mdiPinOutline as PinIcon, mdiPin as UnpinIcon } from "@mdi/js";
import { Icon } from "@mdi/react";
import { newNoteMachine, stateTypes, sendTypes } from "./newNoteMachine";
import { useMachine } from "@xstate/react";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  container: {
    border: `thin solid ${theme.palette.text.disabled}`,
    boxShadow: theme.shadows[3],
    borderRadius: 8,
    minHeight: 100,
    width: "100%",
    display: "flex"
  },
  pinIcon: {
    color: theme.palette.text.secondary,
    alignSelf: "flex-start"
  },
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
  outerWrapper: {
    width: "100%",
    maxWidth: 600
  },
  noteContentContainer: {
    padding: theme.spacing(1.45, 1.45)
  },
  titleBase: {
    padding: 0,
    marginBottom: "auto"
  },
  noteTitle: {
    width: "100%",
    minHeight: 44
  },
  noteWrapper: {
    display: "flex",
    flexDirection: "column"
  },
  noteTitleArea: {
    display: "flex"
  }
}));

function NewNote() {
  const machine = useMachine(newNoteMachine);
  const [state, send] = machine;
  const classes = useStyles();

  // title max 150 chars
  // content max 750 chars
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
            <div className={clsx(classes.container, classes.noteWrapper)}>
              <div className={classes.noteContentContainer}>
                <div className={classes.noteTitleArea}>
                  <InputBase
                    multiline
                    className={classes.noteTitle}
                    classes={{ input: classes.titleBase }}
                    placeholder="Title"
                  />
                  <IconButton className={classes.pinIcon} size="small">
                    <Icon
                      path={
                        PinIcon
                        // [
                        //   { pin: stateTypes.PINNED },
                        //   { pin: stateTypes.PINNING }
                        // ].some(state.matches)
                        //   ? UnpinIcon
                        //   : PinIcon
                      }
                      size={1}
                    />
                  </IconButton>
                </div>
                <InputBase placeholder="Take a note..." />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewNote;
