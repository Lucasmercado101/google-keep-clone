import { useRef, useEffect } from "react";
import { makeStyles, InputBase, IconButton } from "@material-ui/core";
import { mdiPinOutline as PinIcon, mdiPin as UnpinIcon } from "@mdi/js";
import { Icon } from "@mdi/react";
import { stateTypes, sendTypes } from "./newNoteMachine";
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
  noteContentContainer: {
    padding: theme.spacing(1.45, 1.45)
  },
  titleBase: {
    padding: 0,
    marginBottom: "auto"
  },
  titleRoot: {
    padding: 0,
    position: "relative",
    paddingBottom: 15,
    "&::after": {
      opacity: 0,
      content: "attr(data-limit)",
      position: "absolute",
      bottom: 0,
      right: 0,
      transition: "opacity 300ms, color 300ms"
    }
  },
  afterRootCurrentLength: {
    "&::after": {
      opacity: 0.6
    }
  },
  afterTextDangerColor: {
    "&::after": {
      opacity: 0.85,
      color: theme.palette.error.main
    }
  },
  afterTextWarningColor: {
    "&::after": {
      opacity: 0.65,
      color: theme.palette.warning.main
    }
  },
  noteTitle: {
    width: "100%",
    minHeight: 44,
    marginBottom: 3
  },
  noteWrapper: {
    display: "flex",
    flexDirection: "column"
  },
  noteTitleArea: {
    display: "flex"
  }
}));

const Note: React.FC<any> = ({ machine }) => {
  const classes = useStyles();
  const contentRef = useRef<null | HTMLLabelElement>(null);
  const [state, send] = machine;
  const { title, content } = state.context;

  useEffect(() => {
    contentRef.current?.focus();
  }, []);

  return (
    <div className={clsx(classes.container, classes.noteWrapper)}>
      <div className={classes.noteContentContainer}>
        <div className={classes.noteTitleArea}>
          <InputBase
            value={title}
            data-limit={`${title.length}/150`}
            multiline
            onChange={(e) =>
              send(sendTypes.TITLE_TEXT_WAS_SENT, {
                title: e.target.value
              })
            }
            className={classes.noteTitle}
            classes={{
              input: classes.titleBase,
              root: clsx(
                classes.titleRoot,
                title.length > 75 && classes.afterRootCurrentLength,
                title.length > 110 &&
                  title.length < 135 &&
                  classes.afterTextWarningColor,
                title.length >= 135 && classes.afterTextDangerColor
              )
            }}
            placeholder="Title"
          />
          <IconButton
            onClick={() => send(sendTypes.TOGGLE_PIN)}
            className={classes.pinIcon}
            size="small"
          >
            <Icon
              path={
                state.matches({
                  [stateTypes.CREATING_NEW_NOTE]: {
                    pinned: stateTypes.PINNED
                  }
                })
                  ? UnpinIcon
                  : PinIcon
              }
              size={1}
            />
          </IconButton>
        </div>
        <InputBase
          onChange={(e) =>
            send(sendTypes.CONTENT_TEXT_WAS_SENT, {
              content: e.target.value
            })
          }
          inputProps={{
            ref: contentRef
          }}
          data-limit={`${content.length}/750`}
          value={content}
          multiline
          style={{ width: "100%" }}
          classes={{
            root: clsx(
              classes.titleRoot,
              content.length > 400 && classes.afterRootCurrentLength,
              content.length > 500 &&
                content.length < 600 &&
                classes.afterTextWarningColor,
              content.length >= 600 && classes.afterTextDangerColor
            )
          }}
          placeholder="Take a note..."
        />
      </div>
    </div>
  );
};

export default Note;
