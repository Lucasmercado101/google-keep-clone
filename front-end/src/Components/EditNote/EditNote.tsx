import { useRef, useEffect } from "react";
import { InputBase, makeStyles, IconButton } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Icon from "@mdi/react";
import { mdiPinOutline } from "@mdi/js";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Note } from "../../api";

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: 8,
    border: `thin solid ${theme.palette.text.disabled}`,
    padding: theme.spacing(1, 2),
    maxWidth: 600,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    background: theme.palette.background.default
  },
  titleArea: {
    display: "flex",
    alignItems: "flex-start"
  },
  title: {
    flexGrow: 1
  }
}));

type props = {
  onClickOutside?: (data?: any) => void;
  style?: any;
  className?: any;
} & Partial<Note>;

const EditNote: React.FC<props> = ({
  onClickOutside = () => {},
  archived,
  pinned,
  id,
  title,
  content,
  className,
  ...otherProps
}) => {
  const classes = useStyles();
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
          name="content"
          placeholder="Take a note..."
          inputProps={{ ref: register }}
        />
      </div>
    </ClickAwayListener>
  );
};

export default EditNote;
