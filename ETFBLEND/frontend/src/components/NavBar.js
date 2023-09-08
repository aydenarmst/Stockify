import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

import logo from "../../static/images/8.png";
import { alignProperty } from "@mui/material/styles/cssUtils";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="sticky" style={{ backgroundColor: "black" }}>
        <Toolbar>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          <Typography
            variant="h6"
            style={{ fontFamily: "Montserrat, sans-serif", flexGrow: 1 }}
          >
            Stockify
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <IconButton onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
        <List>
          <ListItem component={Link} to="/" onClick={toggleDrawer}>
            Home
          </ListItem>
          <ListItem component={Link} to="/blend" onClick={toggleDrawer}>
            Blend
          </ListItem>
          <ListItem component={Link} to="/addETF" onClick={toggleDrawer}>
            Adjust Sectors
          </ListItem>
          <ListItem component={Link} to="/addStock" onClick={toggleDrawer}>
            Terms of service
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
