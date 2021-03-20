import { makeStyles, Typography, Modal, IconButton } from "@material-ui/core";
import { useState } from "react";
import { CheckCircle as SelectNoteIcon } from "@material-ui/icons";
import EditNote from "../../Components/EditNote/EditNote";
import { usePutNote } from "../../Hooks/queries";
import BottomButtons from "./BottomButtons";
import Icon from "@mdi/react";
import { mdiPinOutline } from "@mdi/js";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  container: {
    width: 240,
    maxWidth: 240,
    borderRadius: 8,
    border: `thin solid ${theme.palette.text.disabled}`,
    minHeight: 100,
    maxHeight: 450,
    height: "100%",
    position: "relative"
  },
  title: {
    fontWeight: 500,
    marginBottom: 5,
    flexGrow: 1
  },
  modal: {
    width: "100%",
    height: "100%",
    display: "flex"
  },
  modalContent: {
    margin: "auto",
    maxHeight: "100vh",
    overflow: "auto"
  },
  textWrapper: {
    padding: theme.spacing(1, 2)
  },
  titleWrapper: {
    display: "flex",
    alignItems: "flex-start"
  },
  selectNoteIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    transform: "translate(-50%, -50%)"
  },
  hidden: {
    opacity: 0,
    transition: "opacity 350ms"
  },
  show: {
    opacity: 1
  }
}));

type props = {
  title?: string;
  content?: string;
  archived: boolean;
  pinned: boolean;
  id: number;
};

const Note: React.FC<props> = ({ id, archived, content, pinned, title }) => {
  const putNote = usePutNote();
  const [isHovering, setIsHovering] = useState(false);
  const classes = useStyles();
  const [isEditingModal, setIsEditingModal] = useState(false);

  if (title) {
    // maximum 50 char title
    title = title.length > 50 ? `${title.substr(0, 47).trim()}...` : title;
  }

  if (content) {
    // maximum 235 content
    content =
      content.length > 235 ? `${content.substr(0, 232).trim()}...` : content;
  }

  const show = clsx(classes.hidden, isHovering && classes.show);

  return (
    <>
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setIsEditingModal(true)}
        className={classes.container}
      >
        <SelectNoteIcon className={classes.selectNoteIcon + " " + show} />
        <div className={classes.textWrapper}>
          <div className={classes.titleWrapper}>
            <Typography
              className={classes.title}
              variant="subtitle1"
              component="h4"
            >
              {title}
            </Typography>
            <IconButton
              className={show}
              style={{ marginRight: -5 }}
              size="small"
            >
              <Icon path={mdiPinOutline} size={1} />
            </IconButton>
          </div>
          <Typography>{content}</Typography>
        </div>
        <div className={show}>
          <BottomButtons />
        </div>
      </div>
      <Modal
        className={classes.modal}
        open={isEditingModal}
        onClose={() => setIsEditingModal(false)}
      >
        <EditNote
          className={classes.modalContent}
          archived={archived}
          content={content}
          pinned={pinned}
          title={title}
          onClickOutside={(data) => {
            putNote(id, data);
          }}
        />
      </Modal>
    </>
  );
};

export default Note;
