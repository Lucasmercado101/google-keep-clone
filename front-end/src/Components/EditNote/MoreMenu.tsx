import { useRef, useState } from "react";
import {
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Popover
} from "@material-ui/core";
import { MoreVertOutlined as MoreIcon } from "@material-ui/icons";
import LabelsMenu from "../LabelsMenu/LabelsMenu";

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
  selectedLabels?: number[];
  onSelectLabel: (selectedLabels: number[]) => void;
};

const MoreMenu: React.FC<props> = ({ selectedLabels, onSelectLabel }) => {
  const classes = useStyles();
  const menuIconRef = useRef<HTMLButtonElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
  const [
    labelsMenuAnchorEl,
    setLabelsMenuAnchorEl
  ] = useState<null | HTMLElement>();

  const handleMenuOpen = () => setAnchorEl(menuIconRef.current);

  const handleMenuClose = () => setAnchorEl(null);

  const handleLabelsMenuOpen = () => setLabelsMenuAnchorEl(menuIconRef.current);

  const handleLabelsMenuClose = () => setLabelsMenuAnchorEl(null);

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        className={classes.iconContainer}
        color="inherit"
        ref={menuIconRef}
      >
        <MoreIcon className={classes.icon} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={(e) => {
            handleLabelsMenuOpen();
            handleMenuClose();
          }}
        >
          Add labels
        </MenuItem>
      </Menu>

      <Popover
        anchorEl={labelsMenuAnchorEl}
        open={Boolean(labelsMenuAnchorEl)}
        onClose={handleLabelsMenuClose}
      >
        <LabelsMenu
          selectedLabels={selectedLabels}
          onSelectLabel={onSelectLabel}
        />
      </Popover>
    </>
  );
};

export default MoreMenu;
