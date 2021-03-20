import { useRef, useEffect } from "react";
import { InputBase, makeStyles, IconButton } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Icon from "@mdi/react";
import { mdiPinOutline } from "@mdi/js";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Note } from "../../api";
import BottomButtons from "../Note/BottomButtons";
import { Undo as UndoIcon, Redo as RedoIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: (isNewNote) => ({
    borderRadius: 8,
    border: `thin solid ${theme.palette.text.disabled}`,
    padding: theme.spacing(1, 2),
    maxWidth: 600,
    minHeight: isNewNote ? 0 : 180,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    background: theme.palette.background.default
  }),
  titleArea: {
    display: "flex",
    alignItems: "flex-start"
  },
  title: (newNote) => ({
    flexGrow: 1,
    fontSize: newNote ? "initial" : "1.6rem",
    marginBottom: newNote ? theme.spacing(2) : theme.spacing(1)
  }),
  contentBottom: {
    flexGrow: 1
  },
  bottomArea: {
    display: "flex"
  },
  actions: {
    width: "70%"
  }
}));

type props = {
  onClickOutside?: (data?: any) => void;
  style?: any;
  className?: any;
  newNote?: boolean;
} & Partial<Note>;

const EditNote: React.FC<props> = ({
  onClickOutside = () => {},
  archived,
  pinned,
  id,
  title,
  content,
  className,
  newNote = false,
  ...otherProps
}) => {
  const classes = useStyles(newNote);
  const { register, getValues, setValue } = useForm();
  const focusInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    focusInputRef?.current?.focus();
    setValue("title", title);
    setValue("content", content);
  }, []);
  // TODO: Undo redo by pushing to an array every
  // x seconds and then just using pop and stuff for undo redo
  //TODO: Convert first input base to a div with content editable
  // and placeholder with
  /*
    [placeholder]:empty::before {
        content: attr(placeholder);
        color: #555; 
    }

    [placeholder]:empty:focus::before {
        content: "";
    }
    */
  return (
    <ClickAwayListener onClickAway={() => onClickOutside(getValues())}>
      <div {...otherProps} className={`${className} ${classes.container}`}>
        <div className={classes.titleArea}>
          <InputBase
            className={classes.title}
            multiline
            name="title"
            placeholder="Title"
            inputProps={{
              ref: (e: HTMLInputElement | null) => {
                register(e);
                focusInputRef.current = e;
              }
            }}
          />
          <IconButton
            style={{ float: "right", display: "inline-block" }}
            size="small"
          >
            <Icon path={mdiPinOutline} size={1} />
          </IconButton>
        </div>
        <InputBase
          multiline
          id="contentArea"
          name="content"
          placeholder="Take a note..."
          inputProps={{ ref: register }}
        />
        <label htmlFor="contentArea" className={classes.contentBottom}></label>
        <div className={classes.bottomArea}>
          <div className={classes.actions}>
            <BottomButtons
              extraButtons={[UndoIcon, RedoIcon]}
              style={{ justifyContent: "space-between" }}
            />
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default EditNote;
