import { IconButton, makeStyles } from "@material-ui/core";
import {
  AddAlertOutlined as ReminderIcon,
  PersonAddOutlined as AddCollaboratorIcon,
  ColorLensOutlined as CanvasIcon,
  CropOriginal as AddImageIcon,
  ArchiveOutlined as ArchiveIcon,
  UnarchiveOutlined as UnarchiveOutline,
  MoreVertOutlined as MoreIcon
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
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
  style?: any;
  extraButtons?: any[] | null;
};

const BottomButtons: React.FC<props> = ({ style, extraButtons = null }) => {
  const classes = useStyles();
  return (
    <div style={style} className={classes.container}>
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
      {/* TODO: fix this, this is just for design test */}
      {extraButtons &&
        extraButtons.map((CustomIcon) => (
          <IconButton className={classes.iconContainer} color="inherit">
            <CustomIcon className={classes.icon} />
          </IconButton>
        ))}
    </div>
  );
};

export default BottomButtons;
