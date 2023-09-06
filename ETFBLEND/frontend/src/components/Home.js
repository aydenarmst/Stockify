import React from "react";
import ETFSearchForm from "./ETFSearchForm";
import { Grid, Typography, Paper } from "@mui/material";

function Blend() {
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <Paper elevation={3} style={{ padding: "2rem", borderRadius: "1rem", maxWidth: "400px" }}>
        <Typography variant="h6" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae justo nec quam dignissim lacinia. Nullam vel urna eget erat vestibulum
          vehicula. Praesent nec risus ac est viverra euismod vel vel ante. Ut bibendum sapien ac libero tristique, a auctor felis fringilla.
          Sed vel urna ullamcorper, congue urna sit amet, tristique est. In laoreet, odio id tincidunt posuere, justo tortor venenatis turpis,
          a lacinia ipsum tortor non ex. Sed dapibus sed purus eu laoreet. Maecenas sollicitudin odio eu neque blandit, ac dignissim dui laoreet.
          Fusce suscipit, dui vel iaculis tristique, odio ante vehicula nunc, ac gravida lectus libero id lorem. Etiam ac placerat elit.
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Blend;
