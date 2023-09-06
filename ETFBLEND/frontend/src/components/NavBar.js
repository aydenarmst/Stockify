import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="sticky" style={{ backgroundColor: 'black'}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ fontFamily: 'Outfit'}}>ETFBlend</Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <IconButton onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
        <List>
          <ListItem ButtonBase component={Link} to="/" onClick={toggleDrawer}>
            Home
          </ListItem>
          <ListItem ButtonBase component={Link} to="/blend" onClick={toggleDrawer}>
            Blend
          </ListItem>
          <ListItem ButtonBase component={Link} to="/addETF" onClick={toggleDrawer}>
            Add ETF
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
