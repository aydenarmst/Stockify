import React, { useState } from "react";
import ETFSearchForm from "./ETFSearchForm";
import { Grid, Typography, Paper, Container, Divider } from "@mui/material";
import ETFDataGrid from "./ETFDataGrid";
import SectorExposureChart from "./SectorExposureChart";

function Blend() {
  const [holdingsData, setHoldingsData] = useState(null);
  const [sectorData, setSectorData] = useState(null);

  const handleApiResponse = (data) => {
    setHoldingsData(data.top_holdings);
    setSectorData(data.sector_exposure);
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: '2rem', borderRadius: '1rem', backgroundColor: '#f4f4f4', maxHeight: '90vh', overflowY: 'auto' }}>
        <Typography variant="h3" gutterBottom align="center" style={{ fontFamily: 'Outfit', color: '#333' }}>
          Select ETFs
        </Typography>
        <Divider style={{ marginBottom: '2rem' }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} align="center">
            <ETFSearchForm handleApiResponse={handleApiResponse} />
          </Grid>

          {holdingsData && (
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom align="left" style={{ fontFamily: 'Outfit', color: '#333' }}>
                ETF Holdings
              </Typography>
              <ETFDataGrid data={holdingsData} />
            </Grid>
          )}

          {sectorData && (
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom align="left" style={{ fontFamily: 'Outfit', color: '#333' }}>
                Sector Exposure
              </Typography>
              <SectorExposureChart data={sectorData} />
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
}

export default Blend;