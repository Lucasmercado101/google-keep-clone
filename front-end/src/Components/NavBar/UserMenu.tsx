import { useState, useContext } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle as UserIcon } from "@material-ui/icons";
import { GlobalStateContext } from "../../StateProvider";
import { logOut } from "../../api";
import { useHistory } from "react-router-dom";

function UserMenu() {
  const ctx = useContext(GlobalStateContext);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    logOut().then(() => {
      ctx.userData = null;
      history.replace("/");
    });
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen} edge="end" color="inherit">
        <UserIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLogOut}>Log out</MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;
