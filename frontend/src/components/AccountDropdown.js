import React from "react";
import { ListItem, ListItemText, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AccountDropdown() {
  const Navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Account" />
      </ListItem>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user ? (
          <MenuItem onClick={() => Navigate("/logout")}>Logout</MenuItem>
        ) : (
          [
            <MenuItem key="login" onClick={() => Navigate("/login")}>
              Login
            </MenuItem>,
            <MenuItem key="register" onClick={() => Navigate("/register")}>
              Register
            </MenuItem>,
          ]
        )}
      </Menu>
    </div>
  );
}

export default AccountDropdown;
