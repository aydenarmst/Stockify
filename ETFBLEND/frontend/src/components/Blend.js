import React, { useState } from "react";
import ETFSearchForm from "./ETFSearchForm";
import { Grid, Typography } from "@mui/material";
import ETFDataGrid from "./ETFDataGrid";

function Blend() {
  const [responseData, setResponseData] = useState(null);

  const handleApiResponse = (data) => {
    setResponseData(data);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} align="center">
        <Typography variant="h4">Select ETFs</Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <Grid container justifyContent="center" spacing={2}>
          <ETFSearchForm handleApiResponse={handleApiResponse} />
        </Grid>
      </Grid>
      {responseData && (
        <Grid item xs={12} align="center">
          {/* Render the ETFDataGrid component with responseData */}
          <Typography variant="h4">ETF Holdings</Typography>
          <ETFDataGrid data={responseData} />
        </Grid>
      )}
    </Grid>
  );
}

export default Blend;
