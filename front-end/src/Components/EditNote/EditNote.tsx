import { useRef, useEffect, useState } from "react";
import { InputBase, makeStyles, IconButton } from "@material-ui/core";
import { Undo as UndoIcon, Redo as RedoIcon } from "@material-ui/icons";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Note } from "../../api";
import ColorPicker from "../Note/ColorPicker";
import ArchiveButton from "../Note/ArchiveButton";
import PinIcon from "../Note/PinIcon";
import MoreMenu from "./MoreMenu";
import { label } from "../../api";
import Tags from "../Note/Tags";
import { useMachine } from "@xstate/react";
import noteMachine from "./noteMachine";

const useStyles = makeStyles((theme) => ({
  container: ({ newNote, color }: any) => ({
    borderRadius: 8,
    position: "relative",
    border: `thin solid ${color ? "transparent" : theme.palette.text.disabled}`,
    padding: theme.spacing(1, 2),
    maxWidth: 600,
    minHeight: { newNote } ? 0 : 180,
    maxHeight: 650,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    background: theme.palette.background.default,
    "&::before": {
      zIndex: 0,
      content: "''",
      position: "absolute",
      height: "100%",
      top: 0,
      left: 0,
      width: "100%",
      filter: "saturate(350%) opacity(0.25)",
      backgroundImage: color
        ? `linear-gradient(${color}, ${color})`
        : "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0))"
    }
  }),
  titleArea: {
    display: "flex",
    alignItems: "flex-start"
  },
  title: ({ newNote }: any) => ({
    flexGrow: 1,
    fontSize: newNote ? "initial" : "1.6rem",
    marginBottom: newNote ? theme.spacing(2) : theme.spacing(1)
  }),
  content: {
    minHeight: 40
  },
  contentBottom: {
    flexGrow: 1
  },
  noteActions: {
    flexGrow: 1,
    display: "flex",
    marginLeft: 5,
    gap: 15
  },
  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  iconContainer: {
    height: 34,
    width: 34
  },
  icon: {
    width: 18,
    height: 18
  }
}));

type props = {
  onClickOutside?: (data?: Partial<Note> & { labels: label[] }) => void;
  style?: any;
  className?: any;
  newNote?: boolean;
  labels?: label[];
} & Partial<Note>;

const EditNote: React.FC<props> = ({
  onClickOutside = () => {},
  archived = false,
  pinned = false,
  title = "",
  content = "",
  id,
  className,
  newNote = false,
  color,
  labels = [],
  ...otherProps
}) => {
  const [current, send] = useMachine(
    noteMachine.withContext({
      content,
      title,
      history: [{ content, title }],
      historyPointer: 0
    })
  );
  const [newNoteValues, setNewNoteValues] = useState<
    Partial<Note> & { labels: label[] }
  >({
    color: color,
    archived: archived,
    pinned: pinned,
    labels
  });
  const classes = useStyles({ newNote, color: newNoteValues.color });
  const focusInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    focusInputRef?.current?.focus();
  }, []);

  return (
    <ClickAwayListener
      onClickAway={() =>
        onClickOutside({
          title: current.context.title,
          content: current.context.content,
          ...newNoteValues
        })
      }
    >
      <div {...otherProps} className={`${className} ${classes.container}`}>
        <div className={classes.titleArea}>
          <InputBase
            className={classes.title}
            multiline
            name="title"
            placeholder="Title"
            value={current.context.title}
            inputProps={{
              ref: focusInputRef
            }}
            onChange={(e) =>
              send({ type: "TYPING_TITLE", title: e.target.value })
            }
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
          value={current.context.content}
          onChange={(e) =>
            send({ type: "TYPING_CONTENT", content: e.target.value })
          }
          inputProps={{ className: classes.content }}
        />
        <label htmlFor="contentArea" className={classes.contentBottom} />
        <Tags
          className={classes.tagContainer}
          onDelete={(labelId) =>
            setNewNoteValues({
              ...newNoteValues,
              labels: newNoteValues.labels.filter((lbl) => lbl.id !== labelId)
            })
          }
          labels={newNoteValues.labels}
        />
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
          <MoreMenu
            selectedLabels={newNoteValues.labels}
            onSelectLabel={(labels) => {
              setNewNoteValues({ ...newNoteValues, labels });
            }}
          />
          <IconButton
            disabled={current.context.historyPointer < 1}
            className={classes.iconContainer}
            onClick={() => send({ type: "UNDO" })}
            color="inherit"
          >
            <UndoIcon className={classes.icon} />
          </IconButton>
          <IconButton
            disabled={
              current.context.historyPointer + 1 ===
              current.context.history.length
            }
            onClick={() => send({ type: "REDO" })}
            className={classes.iconContainer}
            color="inherit"
          >
            <RedoIcon className={classes.icon} />
          </IconButton>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default EditNote;
