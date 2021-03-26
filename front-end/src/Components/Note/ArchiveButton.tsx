import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import {
  ArchiveOutlined as ArchiveIcon,
  UnarchiveOutlined as UnarchiveIcon
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
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
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  archived: boolean;
};

const ArchiveButton: React.FC<props> = ({ onClick, archived }) => {
  const classes = useStyles();

  return (
    <IconButton
      className={classes.iconContainer}
      onClick={onClick}
      color="inherit"
    >
      {archived ? (
        <UnarchiveIcon className={classes.icon} />
      ) : (
        <ArchiveIcon className={classes.icon} />
      )}
    </IconButton>
  );
};

export default ArchiveButton;
