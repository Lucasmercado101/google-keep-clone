import { useState } from "react";
import { ColorLensOutlined as CanvasIcon } from "@material-ui/icons";
import { IconButton, makeStyles, Popover, Paper } from "@material-ui/core";
import clsx from "clsx";

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
    pointerEvents: "auto",
    display: "grid",
    gridTemplateColumns: "26px 26px 26px 26px",
    gridTemplateRows: "26px 26px 26px",
    gap: 5
  },
  popover: { pointerEvents: "none" },
  color: {
    minWidth: 26,
    maxWidth: 26,
    minHeight: 26,
    maxHeight: 26,
    borderRadius: "50%",
    opacity: 0.3,
    position: "relative"
  },
  colorWrapper: {
    cursor: "pointer",
    position: "relative",
    "&:hover $colorSelectedOutline": {
      border: `2px solid ${theme.palette.text.primary}`
    }
  },
  colorSelectedOutline: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "50%"
  },
  transparentColor: {
    border: `2px solid ${theme.palette.text.primary}`
  }
}));

type props = {
  onSelectColor: (selectedColor?: string) => void;
};

const ColorPicker: React.FC<props> = ({ onSelectColor }) => {
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
    <div onClick={(e) => e.stopPropagation()} onMouseLeave={handlePopoverClose}>
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
        <Paper className={classes.paper}>
          <div
            className={classes.colorWrapper}
            onClick={() => onSelectColor(undefined)}
          >
            <div
              style={{ background: "transparent" }}
              className={clsx(classes.color, classes.transparentColor)}
            />
            <div className={classes.colorSelectedOutline} />
          </div>
          <div
            className={classes.colorWrapper}
            onClick={() => onSelectColor("red")}
          >
            <div style={{ background: "red" }} className={classes.color} />
            <div className={classes.colorSelectedOutline} />
          </div>

          <div
            className={classes.colorWrapper}
            onClick={() => onSelectColor("orange")}
          >
            <div style={{ background: "orange" }} className={classes.color} />
            <div className={classes.colorSelectedOutline} />
          </div>

          <div
            className={classes.colorWrapper}
            onClick={() => onSelectColor("yellow")}
          >
            <div style={{ background: "yellow" }} className={classes.color} />
            <div className={classes.colorSelectedOutline} />
          </div>
          <div
            className={classes.colorWrapper}
            onClick={() => onSelectColor("green")}
          >
            <div style={{ background: "green" }} className={classes.color} />
            <div className={classes.colorSelectedOutline} />
          </div>
          <div
            className={classes.colorWrapper}
            onClick={() => onSelectColor("teal")}
          >
            <div style={{ background: "teal" }} className={classes.color} />
            <div className={classes.colorSelectedOutline} />
          </div>
          <div
            className={classes.colorWrapper}
            onClick={() => onSelectColor("blue")}
          >
            <div style={{ background: "blue" }} className={classes.color} />
            <div className={classes.colorSelectedOutline} />
          </div>
          <div
            className={classes.colorWrapper}
            onClick={() => onSelectColor("darkblue")}
          >
            <div style={{ background: "darkblue" }} className={classes.color} />
            <div className={classes.colorSelectedOutline} />
          </div>
          <div
            className={classes.colorWrapper}
            onClick={() => onSelectColor("purple")}
          >
            <div style={{ background: "purple" }} className={classes.color} />
            <div className={classes.colorSelectedOutline} />
          </div>
          <div
            className={classes.colorWrapper}
            onClick={() => onSelectColor("pink")}
          >
            <div style={{ background: "pink" }} className={classes.color} />
            <div className={classes.colorSelectedOutline} />
          </div>
          <div
            className={classes.colorWrapper}
            onClick={() => onSelectColor("brown")}
          >
            <div style={{ background: "brown" }} className={classes.color} />
            <div className={classes.colorSelectedOutline} />
          </div>
          <div
            className={classes.colorWrapper}
            onClick={() => onSelectColor("gray")}
          >
            <div style={{ background: "gray" }} className={classes.color} />
            <div className={classes.colorSelectedOutline} />
          </div>
        </Paper>
      </Popover>
    </div>
  );
};

export default ColorPicker;
