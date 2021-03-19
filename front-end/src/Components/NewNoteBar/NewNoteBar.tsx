import { InputBase, IconButton, makeStyles } from "@material-ui/core";
import { CheckBoxOutlined as NewListIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    border: `thin solid ${theme.palette.text.disabled}`,
    borderRadius: 8,
    width: "100%",
    display: "flex",
    padding: theme.spacing(0, 2)
  },
  input: {
    flexGrow: 1,
    fontWeight: 100
  },
  icon: {
    color: theme.palette.text.disabled,
    "&:hover": {
      color: theme.palette.text.primary
    }
  }
}));

function NewNoteBar() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <InputBase className={classes.input} placeholder="Take a note..." />
      <IconButton className={classes.icon}>
        <NewListIcon />
      </IconButton>
    </div>
  );
}

export default NewNoteBar;
