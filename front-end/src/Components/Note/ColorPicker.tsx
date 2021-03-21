import { useState } from "react";
import { ColorLensOutlined as CanvasIcon } from "@material-ui/icons";
import { IconButton, makeStyles, Popover, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    height: 34,
    width: 34
  },
  icon: {
    width: 18,
    height: 18
  },
  paper: {
    padding: theme.spacing(1),
    pointerEvents: "auto"
  },
  popover: { pointerEvents: "none" }
}));

type props = {
  id: number;
  onSelectColor: (selectedColor: string) => void;
};

const ColorPicker: React.FC<props> = ({ id, onSelectColor }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div onMouseLeave={handlePopoverClose}>
      <IconButton
        onMouseEnter={handlePopoverOpen}
        className={classes.iconContainer}
        color="inherit"
      >
        <CanvasIcon className={classes.icon} />
      </IconButton>
      <Popover
        className={classes.popover}
        open={open}
        anchorEl={anchorEl}
        PaperProps={{ onMouseLeave: handlePopoverClose }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        onClose={handlePopoverClose}
      >
        <Paper className={classes.paper}>I use Popover.</Paper>
      </Popover>
    </div>
  );
};

export default ColorPicker;
