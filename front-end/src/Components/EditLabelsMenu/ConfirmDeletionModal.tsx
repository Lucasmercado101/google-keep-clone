import {
  Modal,
  Paper,
  Typography,
  Button,
  makeStyles
} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  confirmMenuModal: {
    display: "grid",
    placeItems: "center"
  },
  confirmPaperWrapper: {
    width: 270,
    "&:hover, &:focus": {
      outline: "none"
    },
    [theme.breakpoints.up("sm")]: {
      width: 430
    }
  },
  confirmPaper: {
    padding: theme.spacing(3, 3, 2, 3)
  },
  confirmModalButton: {
    textTransform: "none",
    padding: theme.spacing(1, 3)
  },
  confirmButton: {
    color: theme.palette.secondary.main
  },
  confirmModalButtons: {
    marginTop: 15,
    display: "flex",
    gap: 15,
    justifyContent: "flex-end"
  }
}));

type props = {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  onConfirm: () => void;
};

const ConfirmDeletionModal: React.FC<props> = ({
  isOpen,
  setIsOpen,
  onConfirm
}) => {
  const classes = useStyles();
  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={classes.confirmMenuModal}
    >
      <div className={classes.confirmPaperWrapper}>
        <Paper className={classes.confirmPaper}>
          <Typography variant="body2">
            We’ll delete this label and remove it from all of your Meep notes.
            Your notes won’t be deleted.
          </Typography>
          <div className={classes.confirmModalButtons}>
            <Button
              className={classes.confirmModalButton}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className={clsx(
                classes.confirmModalButton,
                classes.confirmButton
              )}
              onClick={onConfirm}
            >
              Delete
            </Button>
          </div>
        </Paper>
      </div>
    </Modal>
  );
};

export default ConfirmDeletionModal;
