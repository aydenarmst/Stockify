import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  Hidden, // Import Hidden component from MUI
  ThemeProvider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountDropdown from "./AccountDropdown";

import logo from "../images/logo.png";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const StyledOption = styled(ListItem)(({ theme }) => ({
  color: 'white',
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  '&:hover': {
    textDecoration: 'underline',
    textDecorationColor: 'white',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const StyledFirstOption = styled(StyledOption)(({ theme }) => ({
  marginLeft: theme.spacing(25),
}));

const StyledDrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const StyledDrawerItem = styled(ListItem)({
  padding: '16px',
  fontFamily: 'Poppins, sans-serif',
  textDecoration: 'none',
  color: 'black',
});

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar
        position="sticky"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)", // This makes it 80% opaque.
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)", // This adds a subtle shadow
        }}
      >
        <StyledToolbar>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "30px",
              height: "30px",
              marginRight: "10px",
            }}
          />
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography
              variant="h6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Stockify
            </Typography>
          </Link>
          <Hidden mdUp>
            {/* Hamburger menu for smaller screens */}
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              style={{ marginLeft: "auto" }}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden smDown>
            {/* Navigation options for larger screens */}
            <StyledFirstOption
              component={Link}
              to="/blend"
            >
              Blend
            </StyledFirstOption>
            <StyledOption component={Link} to="/overlap">
              Overlap
            </StyledOption>
            <StyledOption component={Link} to="/terms">
              Terms of service
            </StyledOption>
            <AccountDropdown />
          </Hidden>
        </StyledToolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        transitionDuration={500} // Add smooth transition
      >
        <StyledDrawerHeader>
          <IconButton onClick={toggleDrawer}>
            <ChevronRightIcon />
          </IconButton>
        </StyledDrawerHeader>
        <List>
          {[
            { name: "Home", path: "/" },
            { name: "Blend", path: "/blend" },
            { name: "Overlap", path: "/overlap" },
            { name: "Terms of service", path: "/terms" },
          ].map((item) => (
            <StyledDrawerItem
              button
              key={item.name}
              component={Link}
              to={item.path}
              onClick={toggleDrawer}
            >
              {item.name}
            </StyledDrawerItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
