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
  })
}));

const LeftDrawer: React.FC = observer(() => {
  const ctx = useContext(GlobalStateContext);
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
          <ListItem
            isSelected
            icon={<Icon path={LightBulbIcon} size={1} />}
            primary="Notes"
            isListOpen={open || ctx.isMenuExpanded}
          />
          <ListItem
            icon={<RemindersIcon />}
            primary="Reminders"
            isListOpen={open}
          />
          <ListItem
            icon={<EditLabelsIcon />}
            primary="Edit labels"
            isListOpen={open}
          />
          <ListItem
            icon={<ArchivesIcon />}
            primary="Archive"
            isListOpen={open}
          />
          <ListItem icon={<TrashIcon />} primary="Trash" isListOpen={open} />
        </List>
      </div>
    </div>
  );
});

export default LeftDrawer;
