import React from "react";
import {
  Button,
  Grid,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Container,
} from "@mui/material";
import blend from "../images/blend.png";
import overlap from "../images/overlap.png";
import sourceCode from "../images/sourceCode.png";

const HomePage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const alignText = isSmallScreen ? "center" : "center";
  const spacing = isSmallScreen ? 2 : 3;

  const LoginButton = {
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  };

  const SignUpButton = {
    borderRadius: "0px",
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid white",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
      border: "1px solid white",
    },
  };

  const cards = [
    {
      title: "Blend",
      img: blend,
      color: "#F09819",
      desc: "Normalizes the weights of overlapping stocks, perfect for beginners who want a tailored overview.",
    },
    {
      title: "Overlap",
      img: overlap,
      color: "#FF512F",
      desc: "Strictly overlap in holdings, providing accurate weights based on ETF input.",
    },
    {
      title: "Source Code",
      img: sourceCode,
      color: "#FE2D6C",
      desc: "Explore the backbone of Stockify. Dive deep into the code and understand its intricacies.",
    },
  ];

  const renderCard = (card, href) => (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={card.title}>
      <Card
        style={{
          maxHeight: "500px",
          maxWidth: "400px",
          backgroundColor: "#444", // Slightly lighter color
          color: card.color,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow
          border: "1px solid rgba(255, 255, 255, 0.1)", // Subtle border
          marginBottom: "2rem",
        }}
      >
        <CardActionArea href={href}>
          <CardMedia
            component="img"
            alt={`${card.title} Image`}
            height="400"
            image={card.img}
            title={card.title}
          />
          <CardContent
            style={{
              paddingTop: "16px",
              paddingBottom: "32px",
              height: "200px",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              fontFamily={"Space Grotesk, serif-sans"}
            >
              {card.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ color: "whitesmoke" }}
            >
              {card.desc}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );

  return (
    <Container
      maxWidth={false}
      style={{ height: "100vh", marginTop: "5rem", padding: "0rem" }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container spacing={isSmallScreen ? 2 : 5} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant={isSmallScreen ? "h3" : "h1"}
              gutterBottom
              align={alignText}
              fontFamily={"Montserrat, sans-serif"}
            >
              Elevate Your Portfolio Vision.
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              align={alignText}
              fontFamily={"Lato, sans-serif"}
              fontWeight={700}
              style={{
                lineHeight: "1.6", // increased line height
                letterSpacing: "0.5px", // slight increase in letter spacing
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)", // subtle shadow for better legibility
                color: "#000000", // making sure text is pure black for contrast
              }}
            >
              Dive deep into ETF holdings with a tool built on the strength of
              Django and the dynamism of React. Stockify bridges the gap in the
              market, making intricate overlaps in ETFs transparent and
              understandable. Designed for everyone from DIY investors and
              novices to retirement account holders and financial professionals.
              Revolutionize the way you view and allocate Exchange-Traded Funds.
            </Typography>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Grid container spacing={spacing} justifyContent="center">
            <Grid item xs={12} sm={6} md="auto">
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth={isSmallScreen}
                sx={LoginButton}
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
                sx={SignUpButton}
                href="/signup"
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Grid
          marginTop={"10rem"}
          marginX={"0rem"}
          paddingBottom={"10rem"}
          paddingTop={"10rem"}
          width={"100%"}
          container
          justifyContent="space-evenly"
          align="center"
          style={{ backgroundColor: "#000" }}
        >
          {cards.map((card) =>
            renderCard(card, `/${card.title.toLowerCase()}`)
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
