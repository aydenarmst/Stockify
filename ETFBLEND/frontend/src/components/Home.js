import React from "react";
import { Button, Grid, Typography, Box, useTheme, useMediaQuery } from "@mui/material";

function HomePage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh", padding: isSmallScreen ? "1rem" : "2rem" }}
    >
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {/* Stockify Title */}
        <Grid item xs={12} md={4}>
          <Typography
            variant={isSmallScreen ? "h4" : "h2"}
            gutterBottom
            align={isSmallScreen ? "center" : "left"}
            fontFamily={"Montserrat, sans-serif"}
          >
            Stockify: Your ETF Analysis Powerhouse
          </Typography>
        </Grid>

        {/* Stockify Statement */}
        <Grid item xs={12} md={8}>
          <Typography
            variant="h6"
            gutterBottom
            align={isSmallScreen ? "center" : "left"}
            style={{ maxWidth: isSmallScreen ? "90vw" : "600px" }}
            fontFamily={"Lato, sans-serif"}
            fontWeight={700}
          >
            Dive deep into ETF holdings with a tool built on the strength of Django
            and the dynamism of React. Stockify bridges the gap in the market,
            making intricate overlaps in ETFs transparent and understandable.
            Designed for everyone from DIY investors and novices to retirement
            account holders and financial professionals. Revolutionize the way you
            view and allocate Exchange-Traded Funds.
          </Typography>
        </Grid>
      </Grid>

      {/* Buttons */}
      <Box mt={4}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md="auto">
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth={isSmallScreen}
              sx={{
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
              href="/login"
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md="auto">
            <Button
              variant="outlined"
              size="large"
              fullWidth={isSmallScreen}
              sx={{
                borderRadius: "0px",
                backgroundColor: "transparent",
                color: "white",
                border: "1px solid white",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid white",
                },
              }}
              href="/signup"
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default HomePage;
