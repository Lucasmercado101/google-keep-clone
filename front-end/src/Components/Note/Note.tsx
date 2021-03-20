import { makeStyles, Typography, Modal, IconButton } from "@material-ui/core";
import { useState } from "react";
import {
  CheckCircle as SelectNoteIcon,
  AddAlertOutlined as ReminderIcon,
  PersonAddOutlined as AddCollaboratorIcon,
  ColorLensOutlined as CanvasIcon,
  CropOriginal as AddImageIcon,
  ArchiveOutlined as ArchiveIcon,
  UnarchiveOutlined as UnarchiveOutline,
  MoreVertOutlined as MoreIcon
} from "@material-ui/icons";
import EditNote from "../../Components/EditNote/EditNote";
import BottomButtons from "./BottomButtons";
import Icon from "@mdi/react";
import { mdiPinOutline as PinIcon, mdiPin as UnpinIcon } from "@mdi/js";
import clsx from "clsx";
import { usePutNote } from "../../Hooks/queries";

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
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    margin: "10px 0 5px 0"
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
  title?: string;
  content?: string;
  archived: boolean;
  pinned: boolean;
  id: number;
};

function shorten(str: string | undefined | null, len: number) {
  if (!str) return;
  return str.length > len ? `${str.substr(0, len - 3).trim()}...` : str;
}

const Note: React.FC<props> = ({ id, archived, content, pinned, title }) => {
  const putNote = usePutNote();
  const [isHovering, setIsHovering] = useState(false);
  const classes = useStyles();
  const [isEditingModal, setIsEditingModal] = useState(false);

  const show = clsx(classes.hidden, isHovering && classes.show);

  return (
    <>
      <div
        onMouseOverCapture={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setIsEditingModal(true)}
        className={classes.container}
      >
        {/* <SelectNoteIcon className={classes.selectNoteIcon + " " + show} /> */}
        <div className={classes.textWrapper}>
          <div className={classes.titleWrapper}>
            <Typography
              className={classes.title}
              variant="subtitle1"
              component="h4"
            >
              {shorten(title, 50)}
            </Typography>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                putNote(id, { pinned: !pinned });
              }}
              className={show}
              style={{ marginRight: -5 }}
              size="small"
            >
              <Icon path={pinned ? UnpinIcon : PinIcon} size={1} />
            </IconButton>
          </div>
          <Typography>{shorten(content, 235)}</Typography>
        </div>

        <div className={clsx(classes.actionsContainer, show)}>
          <IconButton className={classes.iconContainer} color="inherit">
            <ReminderIcon className={classes.icon + " " + classes.icon} />
          </IconButton>
          <IconButton className={classes.iconContainer} color="inherit">
            <AddCollaboratorIcon
              className={classes.icon}
              style={{ transform: "scaleX(-1)" }}
            />
          </IconButton>
          <IconButton className={classes.iconContainer} color="inherit">
            <CanvasIcon className={classes.icon} />
          </IconButton>
          <IconButton className={classes.iconContainer} color="inherit">
            <AddImageIcon className={classes.icon} />
          </IconButton>
          <IconButton className={classes.iconContainer} color="inherit">
            <ArchiveIcon className={classes.icon} />
          </IconButton>
          <IconButton className={classes.iconContainer} color="inherit">
            <MoreIcon className={classes.icon} />
          </IconButton>
        </div>
      </div>
      <Modal className={classes.modal} open={isEditingModal}>
        <EditNote
          className={classes.modalContent}
          archived={archived}
          content={content}
          pinned={pinned}
          title={title}
          onClickOutside={(data) => {
            putNote(id, data);
            setIsEditingModal(false);
          }}
        />
      </Modal>
    </>
  );
};

export default Note;
