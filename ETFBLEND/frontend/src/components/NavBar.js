import React, { useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import logo from "../../static/images/8.png";

const useStyles = makeStyles((theme) => ({
  logo: {
    width: "30px",
    height: "30px",
    marginRight: "10px",
  },
  toolbar: {
    [theme.breakpoints.up("md")]: {
      display: "flex", // Display options in a row for larger screens
      justifyContent: "space-between", // Position items to the left and right
    },
  },
  option: {
    color: "white",
    [theme.breakpoints.down("sm")]: {
      display: "none", // Hide options for smaller screens
    },
    marginLeft: theme.spacing(1), // Add spacing between options
    marginRight: theme.spacing(1), // Add spacing between options
    "&:hover": {
      textDecoration: "underline",
      textDecorationColor: "white",
    },
  },
  firstOption: {
    color: "white",
    [theme.breakpoints.down("sm")]: {
      display: "none", // Hide options for smaller screens
    },
    marginLeft: theme.spacing(25), // Add spacing between options
    "&:hover": {
      textDecoration: "underline",
      textDecorationColor: "white",
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  drawerItem: {
    padding: theme.spacing(2),
    fontFamily: "Poppins, sans-serif",
    textDecoration: "none",
    color: "black",
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="sticky" style={{ backgroundColor: "black" }}>
        <Toolbar className={classes.toolbar}>
          <img src={logo} alt="Logo" className={classes.logo} />
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
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden smDown>
            {/* Navigation options for larger screens */}
            <ListItem component={Link} to="/blend" className={classes.firstOption}>
              Blend
            </ListItem>
            <ListItem component={Link} to="/overlap" className={classes.option}>
              Overlap
            </ListItem>
            <ListItem component={Link} to="/terms" className={classes.option}>
              Terms of service
            </ListItem>
          </Hidden>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        transitionDuration={500} // Add smooth transition
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleDrawer}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <List>
          {[
            { name: "Home", path: "/" },
            { name: "Blend", path: "/blend" },
            { name: "Adjust Sectors", path: "/addETF" },
            { name: "Terms of service", path: "/terms" },
          ].map((item) => (
            <ListItem
              button
              key={item.name}
              component={Link}
              to={item.path}
              onClick={toggleDrawer}
              className={classes.drawerItem}
            >
              {item.name}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
