import { useRef, useEffect } from "react";
import { InputBase, makeStyles, IconButton } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Icon from "@mdi/react";
import { mdiPinOutline } from "@mdi/js";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: 8,
    border: `thin solid ${theme.palette.text.disabled}`,
    padding: theme.spacing(1, 2),
    maxWidth: 600,
    display: "flex",
    flexDirection: "column"
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
};

const EditNote: React.FC<props> = ({ onClickOutside = () => {} }) => {
  const classes = useStyles();
  const { register, getValues } = useForm();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const focusInputRef = useRef<HTMLInputElement | null>(null);

  useOutsideAlerter(wrapperRef, () => onClickOutside(getValues()));

  useEffect(() => {
    focusInputRef?.current?.focus();
  }, []);
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
    <div ref={wrapperRef} className={classes.container}>
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
  );
};

export default EditNote;
