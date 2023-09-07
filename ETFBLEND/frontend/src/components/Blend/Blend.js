import React, { useState } from "react";
import ETFSearchForm from "./ETFSearchForm";
import {
  Grid,
  Typography,
  Paper,
  Container,
  Divider,
  Button,
} from "@mui/material";
import ETFDataGrid from "./ETFDataGrid";
import SectorExposureChart from "./SectorExposureChart";
import BarGraph from "./BarGraph";
import { handleExportToCSV } from "./ExportToCSV";

function Blend() {
  const [holdingsData, setHoldingsData] = useState(null);
  const [sectorData, setSectorData] = useState(null);
  const [expenseRatio, setExpenseRatio] = useState(null);

  const handleApiResponse = (data) => {
    setHoldingsData(data.top_holdings);
    setSectorData(data.sector_exposure);
    setExpenseRatio(data.expense_ratio);
  };

  return (
    <Container
      maxWidth="xl"
      style={{
        margin: "4rem auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={4}
        style={{
          width: "100%",
          padding: "3rem",
          borderRadius: "1rem",
          backgroundColor: "#f9f9f9",
          overflowY: "auto",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          align="left"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            color: "#333",
            marginBottom: "2rem",
          }}
        >
          BLEND
        </Typography>
        <Typography
          style={{
            fontFamily: "Lato, sans-serif",
            color: "#555",
            marginBottom: "1.5rem",
            border: "1px solid #e1e1e1",
            padding: "1rem",
            borderRadius: "5px",
          }}
        >
          Welcome to Blend. This tool not only takes the number of constituent
          stocks you've selected but also normalizes the holdings to determine
          the most common stocks among each ETF. By doing this, it provides a
          comprehensive view of the combined allocations based on the selected
          ETF's holdings. If you're specifically interested in identifying just
          the overlapping stocks between ETFs, we recommend heading over to the
          'Overlap' page.
        </Typography>

        <Divider style={{ marginBottom: "3rem", marginTop: "2rem" }} />

        <Grid container spacing={5}>
          <Grid item xs={12} md={6} lg={4}>
            <ETFSearchForm handleApiResponse={handleApiResponse} />
            {expenseRatio && (
              <div
                style={{
                  border: "1px solid #e1e1e1",
                  padding: "1rem",
                  borderRadius: "5px",
                  marginTop: "1rem",
                }}
              >
                <Typography
                  variant="h6"
                  align="left"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    color: "#666",
                    margin: "1rem 0",
                  }}
                >
                  Blended Expense Ratio: {expenseRatio}%
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    fontFamily: "Lato, sans-serif",
                    color: "#777",
                  }}
                >
                  The blended expense ratio represents the average of the
                  expense ratios of the selected ETFs, assuming an equal split
                  among them. It gives an estimate of the total yearly cost if
                  the holdings were merged into a single ETF.
                </Typography>
              </div>
            )}
          </Grid>

          {holdingsData && (
            <Grid item xs={12} md={6} lg={8} align="center">
              <Typography
                variant="h5"
                gutterBottom
                align="left"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  color: "#333",
                  marginBottom: "1rem",
                }}
              >
                Recreated ETF Holdings
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleExportToCSV}
                style={{
                  marginBottom: "1rem",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                Export to CSV
              </Button>

              <ETFDataGrid data={holdingsData} />
            </Grid>
          )}
          {holdingsData && (
            <Grid item xs={12} md={6} lg={6} align="center">
              <Typography
                variant="h5"
                gutterBottom
                align="left"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  color: "#333",
                  marginBottom: "1rem",
                }}
              >
                Holdings by Location
              </Typography>
              <BarGraph data={holdingsData} />
            </Grid>
          )}

          {sectorData && (
            <Grid item xs={12} md={6} lg={6} align="center">
              <Typography
                variant="h5"
                gutterBottom
                align="left"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  color: "#333",
                  marginBottom: "1rem",
                }}
              >
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
