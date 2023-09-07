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
      <AppBar position="sticky" style={{ backgroundColor: 'black' }}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Stockify</Typography>
          <IconButton
            edge="end" // Use "end" to move the icon to the right
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
