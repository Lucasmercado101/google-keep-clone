import { useState, FC } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  makeStyles,
  Popover
} from "@material-ui/core";
import { useDeleteNote, usePutNote } from "../../Hooks/queries";
import { MoreVertOutlined as MoreIcon } from "@material-ui/icons";
import LabelsMenu from "../LabelsMenu/LabelsMenu";
import { label } from "../../api";

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
  noteId: number;
  labels?: label[];
};

const MoreMenu: FC<props> = ({ noteId, labels }) => {
  const classes = useStyles();
  const deleteNote = useDeleteNote();
  const putNote = usePutNote();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);

  const handlePopoverClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    setAnchorEl2(e.currentTarget);
  };

  const handlePopoverClose = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setAnchorEl2(null);
  };

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        className={classes.iconContainer}
        color="inherit"
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
            handleMenuClose(e);
            deleteNote(noteId);
          }}
        >
          Delete note
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            handleMenuClose(e);
            handlePopoverClick(e);
          }}
        >
          Add label
        </MenuItem>
      </Menu>
      <Popover
        anchorEl={anchorEl2}
        open={Boolean(anchorEl2)}
        onClick={(e) => e.stopPropagation()}
        onClose={handlePopoverClose}
      >
        <LabelsMenu
          selectedLabels={labels}
          onSelectLabel={(selectedLabels: label[]) => {
            putNote(noteId, { labels: selectedLabels.map((lbl) => lbl.id) });
          }}
        />
      </Popover>
    </>
  );
};

export default MoreMenu;
