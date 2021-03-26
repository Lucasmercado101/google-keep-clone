import { useRef, useEffect, useState } from "react";
import { InputBase, makeStyles, IconButton } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Icon from "@mdi/react";
import { mdiPinOutline } from "@mdi/js";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Note } from "../../api";
import ColorPicker from "../Note/ColorPicker";
import ArchiveButton from "../Note/ArchiveButton";
import PinIcon from "../Note/PinIcon";
// import { Undo as UndoIcon, Redo as RedoIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: (isNewNote) => ({
    borderRadius: 8,
    border: `thin solid ${theme.palette.text.disabled}`,
    padding: theme.spacing(1, 2),
    maxWidth: 600,
    minHeight: isNewNote ? 0 : 180,
    maxHeight: 650,
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
  noteActions: {
    flexGrow: 1,
    display: "flex",
    gap: 15
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
  color,
  ...otherProps
}) => {
  const classes = useStyles(newNote);
  const { register, getValues, setValue } = useForm();
  const [newNoteValues, setNewNoteValues] = useState<Partial<Note>>({
    color: undefined,
    archived: false,
    pinned: false
  });
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
        {JSON.stringify(newNoteValues)}
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
          <PinIcon
            size="small"
            pinned={!!newNoteValues.pinned}
            onClick={() =>
              setNewNoteValues((prev) => ({ ...prev, pinned: !prev.pinned }))
            }
          />
        </div>

        <InputBase
          multiline
          style={{ overflow: "auto" }}
          id="contentArea"
          name="content"
          placeholder="Take a note..."
          inputProps={{ ref: register }}
        />
        <label htmlFor="contentArea" className={classes.contentBottom}></label>
        <div className={classes.noteActions}>
          <ColorPicker
            edge="start"
            onSelectColor={(color) =>
              setNewNoteValues({ ...newNoteValues, color: color })
            }
          />
          <ArchiveButton
            archived={!!newNoteValues.archived}
            onClick={() =>
              setNewNoteValues((prev) => ({
                ...prev,
                archived: !prev.archived
              }))
            }
          />
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default EditNote;
