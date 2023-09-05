import React, { useState } from "react";
import ETFSearchForm from "./ETFSearchForm";
import { Grid, Typography, Paper, Container } from "@mui/material";
import ETFDataGrid from "./ETFDataGrid";

function Blend() {
  const [responseData, setResponseData] = useState(null);

  const handleApiResponse = (data) => {
    setResponseData(data);
  };

  return (
    <Container maxWidth="lg"> {/* Added a container to center the content */}
      <Paper elevation={3} style={{ padding: '2rem', borderRadius: '1rem' }}> {/* Wrapped content in a Paper component for better visual separation */}
        <Grid container spacing={4}>
          <Grid item xs={12} align="center">
            <Typography variant="h3" gutterBottom style={{ fontFamily: 'Outfit' }}> {/* Increased font size */}
              Select ETFs
            </Typography>
          </Grid>
        
          <Grid item xs={12} align="center">
            <ETFSearchForm handleApiResponse={handleApiResponse} />
          </Grid>

          {responseData && (
            <Grid item xs={12} align="center">
              <Typography variant="h5" gutterBottom align="left" style={{ fontFamily: 'Outfit' }}> {/* Increased font size */}
                ETF Holdings
              </Typography>
              <ETFDataGrid data={responseData} />
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
}

export default Blend;

