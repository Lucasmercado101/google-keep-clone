import { Divider, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    minHeight: 70,
    maxHeight: 70
  },
  divider: {
    color: theme.palette.text.secondary
  },
  buttonWrapper: {
    display: "flex",
    padding: theme.spacing(2)
  },
  doneButton: {
    color: theme.palette.text.primary,
    marginLeft: "auto"
  }
}));

type props = {
  onClickDone: () => void;
};

const Footer: React.FC<props> = ({ onClickDone }) => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Divider className={classes.divider} />
      <div className={classes.buttonWrapper}>
        <Button onClick={onClickDone} className={classes.doneButton}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default Footer;
