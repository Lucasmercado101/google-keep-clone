import { useState } from "react";
import { List, makeStyles, Modal } from "@material-ui/core";
import {
  LabelOutlined as LabelsIcon,
  NotificationsNoneOutlined as RemindersIcon,
  EditOutlined as EditLabelsIcon,
  ArchiveOutlined as ArchivesIcon,
  DeleteOutline as TrashIcon
} from "@material-ui/icons";
import Icon from "@mdi/react";
import { mdiLightbulbOutline as LightBulbIcon } from "@mdi/js";
import clsx from "clsx";
import ListItem from "./ListItem";
import { stateTypes, sendTypes } from "../../Pages/Home/homeMachine";
import { useRouter } from "react-router5";
// import EditLabelsMenu from "../EditLabelsMenu/EditLabelsMenu";

const useStyles = makeStyles((theme) => ({
  drawer: {
    height: "100%",
    minHeight: "100%",
    overflow: "hidden",
    background: theme.palette.background.default,
    position: "relative",
    transition: "min-width 150ms"
  },
  innerDrawer: {
    position: "fixed",
    zIndex: 2
  },
  drawerClosed: {
    minWidth: theme.spacing(10),
    maxWidth: theme.spacing(10)
  },
  drawerOpen: {
    boxShadow: theme.shadows[5],
    minWidth: theme.spacing(35),
    maxWidth: theme.spacing(35)
  },
  list: {
    marginLeft: 25,
    display: "flex",
    flexDirection: "column"
  },
  wrapper: (isMenuExpandedToggle) => ({
    minWidth: isMenuExpandedToggle ? theme.spacing(35) : theme.spacing(10),
    maxWidth: isMenuExpandedToggle ? theme.spacing(35) : theme.spacing(10),
    overflow: "visible"
  }),
  link: { textDecoration: "none" },
  labelsMenuModal: {
    display: "grid",
    placeItems: "center"
  },
  editLabelsMenuWrapper: {
    width: 300,
    "&:hover, &:focus": {
      outline: "none"
    }
  }
}));

const LeftDrawer: React.FC<any> = ({ machine }) => {
  const [state, send] = machine;
  const [isSelected, setIsSelected] = useState(0);
  const router = useRouter();

  const drawerIsOpen = [
    {
      drawer: {
        [stateTypes.DRAWER_DEFAULT]: stateTypes.DRAWER_IS_HOVERED_OPEN
      }
    },
    { drawer: stateTypes.DRAWER_TOGGLED_OPEN }
  ].some(state.matches);

  const classes = useStyles(drawerIsOpen);

  const [isEditLabelsModalOpen, setIsEditLabelsModalOpen] = useState(false);

  const handleCloseEditLabelsMenu = () => setIsEditLabelsModalOpen(false);
  const handleOpenEditLabelsMenu = () => setIsEditLabelsModalOpen(true);

  return (
    <>
      <div
        className={clsx(
          classes.wrapper,
          classes.drawer,
          !drawerIsOpen && classes.drawerClosed,
          drawerIsOpen && classes.drawerOpen
        )}
      >
        <div
          onMouseEnter={() => send(sendTypes.HOVER_ON_DRAWER)}
          onMouseLeave={() => send(sendTypes.MOUSE_LEFT_AREA)}
          className={clsx(
            classes.drawer,
            !drawerIsOpen && classes.drawerClosed,
            drawerIsOpen && classes.drawerOpen,
            classes.innerDrawer
          )}
        >
          <List className={classes.list}>
            <ListItem
              isSelected={state.matches({ routes: [stateTypes.MAIN_NOTES] })}
              icon={<Icon path={LightBulbIcon} size={1} />}
              primary="Notes"
              onClick={() => router.navigate("notes")}
              isListOpen={drawerIsOpen}
            />
            {/* <Link
            onClick={() => setIsSelected(1)}
            className={classes.link}
            to="/notes/reminders"
          > */}
            {/* <ListItem
            isSelected={isSelected === 1}
            icon={<RemindersIcon />}
            primary="Reminders"
            isListOpen={open}
          /> */}
            {/* </Link> */}
            <ListItem
              icon={<EditLabelsIcon />}
              primary="Edit labels"
              onClick={handleOpenEditLabelsMenu}
              isListOpen={drawerIsOpen}
            />
            <ListItem
              isSelected={state.matches({
                routes: [stateTypes.ARCHIVED_NOTES]
              })}
              icon={<ArchivesIcon />}
              primary="Archive"
              isListOpen={drawerIsOpen}
              onClick={() => router.navigate("notes.archived")}
            />
            {/* <ListItem icon={<TrashIcon />} primary="Trash" isListOpen={open} /> */}
          </List>
        </div>
      </div>
      <Modal
        open={isEditLabelsModalOpen}
        onClose={handleCloseEditLabelsMenu}
        className={classes.labelsMenuModal}
      >
        <div className={classes.editLabelsMenuWrapper}>
          {/* <EditLabelsMenu onClose={handleCloseEditLabelsMenu} /> */}
        </div>
      </Modal>
    </>
  );
};

export default LeftDrawer;
