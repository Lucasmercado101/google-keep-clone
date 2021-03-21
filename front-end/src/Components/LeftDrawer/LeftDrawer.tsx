import { useState, useContext } from "react";
import { List, makeStyles } from "@material-ui/core";
import { GlobalStateContext } from "../../StateProvider";
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
import ListItem from "./Item";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  drawer: {
    height: "100%",
    minHeight: "100%",
    overflow: "hidden",
    background: theme.palette.background.default,
    position: "relative",
    transition: "min-width 150ms",
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
  link: { textDecoration: "none" }
}));

const LeftDrawer: React.FC = observer(() => {
  const ctx = useContext(GlobalStateContext);
  const [isSelected, setIsSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const classes = useStyles(ctx.isMenuExpanded);

  return (
    <div
      className={clsx(
        classes.wrapper,
        classes.drawer,
        classes.drawerClosed,
        (open || ctx.isMenuExpanded) && classes.drawerOpen
      )}
    >
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={clsx(
          classes.drawer,
          classes.drawerClosed,
          (open || ctx.isMenuExpanded) && classes.drawerOpen
        )}
      >
        <List className={classes.list}>
          <Link
            onClick={() => setIsSelected(0)}
            className={classes.link}
            to="/notes"
          >
            <ListItem
              isSelected={isSelected === 0}
              icon={<Icon path={LightBulbIcon} size={1} />}
              primary="Notes"
              isListOpen={open || ctx.isMenuExpanded}
            />
          </Link>
          {/* <Link
            onClick={() => setIsSelected(1)}
            className={classes.link}
            to="/notes/reminders"
          > */}
          <ListItem
            isSelected={isSelected === 1}
            icon={<RemindersIcon />}
            primary="Reminders"
            isListOpen={open}
          />
          {/* </Link> */}
          <ListItem
            icon={<EditLabelsIcon />}
            primary="Edit labels"
            isListOpen={open}
          />
          <Link
            onClick={() => setIsSelected(2)}
            className={classes.link}
            to="/notes/archived"
          >
            <ListItem
              isSelected={isSelected === 2}
              icon={<ArchivesIcon />}
              primary="Archive"
              isListOpen={open}
            />
          </Link>
          <ListItem icon={<TrashIcon />} primary="Trash" isListOpen={open} />
        </List>
      </div>
    </div>
  );
});

export default LeftDrawer;
