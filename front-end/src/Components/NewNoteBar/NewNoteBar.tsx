import { useState } from "react";
import { InputBase, IconButton, makeStyles } from "@material-ui/core";
import { CheckBoxOutlined as NewListIcon } from "@material-ui/icons";
import EditNote from "../EditNote/EditNote";
import { createNewNote } from "../../api";
import { useQueryClient } from "react-query";

const useStyles = makeStyles((theme) => ({
  container: {
    border: `thin solid ${theme.palette.text.disabled}`,
    boxShadow: theme.shadows[3],
    borderRadius: 8,
    width: "100%",
    display: "flex",
    padding: theme.spacing(0, 2)
  },
  input: {
    flexGrow: 1
  },
  icon: {
    color: theme.palette.text.disabled,
    "&:hover": {
      color: theme.palette.text.primary
    }
  }
}));

function NewNoteBar() {
  const queryClient = useQueryClient();
  const [isWritingNewNote, setIsWritingNewNote] = useState(false);
  const classes = useStyles();
  const handleClick = () => {
    setIsWritingNewNote(true);
  };

  const handleNewNote = (data: object) => {
    setIsWritingNewNote(false);
    if (!Object.keys(data).length) return;
    createNewNote(data).then(() => {
      queryClient.invalidateQueries("notes");
    });
  };

  if (isWritingNewNote)
    return <EditNote newNote onClickOutside={handleNewNote} />;

  return (
    <div className={classes.container}>
      <InputBase
        onClick={handleClick}
        className={classes.input}
        placeholder="Take a note..."
      />
      <IconButton className={classes.icon}>
        <NewListIcon />
      </IconButton>
    </div>
  );
}

export default NewNoteBar;
