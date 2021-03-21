import {
  makeStyles,
  Typography,
  Modal,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import { useState } from "react";
import {
  CheckCircle as SelectNoteIcon,
  AddAlertOutlined as ReminderIcon,
  PersonAddOutlined as AddCollaboratorIcon,
  ColorLensOutlined as CanvasIcon,
  CropOriginal as AddImageIcon,
  ArchiveOutlined as ArchiveIcon,
  UnarchiveOutlined as UnarchiveIcon,
  MoreVertOutlined as MoreIcon
} from "@material-ui/icons";
import EditNote from "../../Components/EditNote/EditNote";
import Icon from "@mdi/react";
import { mdiPinOutline as PinIcon, mdiPin as UnpinIcon } from "@mdi/js";
import clsx from "clsx";
import { usePutNote, useDeleteNote } from "../../Hooks/queries";
import ColorPicker from "./ColorPicker";

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
  const deleteNote = useDeleteNote();
  const [isHovering, setIsHovering] = useState(false);
  const classes = useStyles();
  const [isEditingModal, setIsEditingModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const showOnHover = clsx(classes.hidden, isHovering && classes.show);

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
                putNote(id, { pinned: !pinned, archived: false });
              }}
              className={showOnHover}
              style={{ marginRight: -5 }}
              size="small"
            >
              <Icon path={pinned ? UnpinIcon : PinIcon} size={1} />
            </IconButton>
          </div>
          <Typography>{shorten(content, 235)}</Typography>
        </div>

        <div className={clsx(classes.actionsContainer, showOnHover)}>
          <IconButton className={classes.iconContainer} color="inherit">
            <ReminderIcon className={classes.icon + " " + classes.icon} />
          </IconButton>
          <IconButton className={classes.iconContainer} color="inherit">
            <AddCollaboratorIcon
              className={classes.icon}
              style={{ transform: "scaleX(-1)" }}
            />
          </IconButton>
          <ColorPicker id={id} onSelectColor={(color) => {}} />
          <IconButton className={classes.iconContainer} color="inherit">
            <AddImageIcon className={classes.icon} />
          </IconButton>
          <IconButton
            className={classes.iconContainer}
            onClick={(e) => {
              e.stopPropagation();
              putNote(id, { archived: !archived, pinned: false });
            }}
            color="inherit"
          >
            {archived ? (
              <UnarchiveIcon className={classes.icon} />
            ) : (
              <ArchiveIcon className={classes.icon} />
            )}
          </IconButton>
          <IconButton
            onClick={handleClick}
            className={classes.iconContainer}
            color="inherit"
          >
            <MoreIcon className={classes.icon} />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={(e) => {
                handleClose(e);
                deleteNote(id);
              }}
            >
              Delete note
            </MenuItem>
          </Menu>
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
