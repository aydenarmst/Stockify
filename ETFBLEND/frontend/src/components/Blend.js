import React from "react";
import ETFSearchForm from "./ETFSearchForm";
import { Grid, Typography } from "@mui/material";


function Blend(){
    return (
        <Grid container spacing={2}>
          <Grid item xs={12} align="center">
            <Typography variant="h4">Select ETFs</Typography>
          </Grid>
    
          <Grid item xs={12} align="center">
            <Grid container justifyContent="center" spacing={2}>
                <ETFSearchForm />
            </Grid>
          </Grid>
        </Grid>
      );
};

export default Blend;