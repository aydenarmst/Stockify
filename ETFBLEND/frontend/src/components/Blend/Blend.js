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

function Blend() {
  const [holdingsData, setHoldingsData] = useState([]);
  const [sectorData, setSectorData] = useState(null);
  const [expenseRatio, setExpenseRatio] = useState(null);
  const [apiResponded, setApiResponded] = useState(false);

  const handleApiResponse = (data) => {
    setHoldingsData(data.top_holdings);
    setSectorData(data.sector_exposure);
    setExpenseRatio(data.expense_ratio);
    setApiResponded(true);
  };

  const handleExportToCSV = () => {
    const csvRows = [];
    const headers = Object.keys(holdingsData[0]);

    // Add the headers to the CSV
    csvRows.push(headers.join(","));

    // Add the rows to the CSV
    for (const row of holdingsData) {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    // Create a CSV blob
    const csvString = csvRows.join("\n");
    const csvBlob = new Blob([csvString], { type: "text/csv" });

    // Create the download link
    const blobUrl = URL.createObjectURL(csvBlob);
    const anchorElement = document.createElement("a");

    // Set the anchorElement's properties
    anchorElement.href = blobUrl;
    anchorElement.download = "ETF_holdings.csv";

    // Append to the document
    document.body.appendChild(anchorElement);

    // Trigger download
    anchorElement.click();

    // Cleanup - remove the anchorElement from body
    document.body.removeChild(anchorElement);
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
          Blend
        </Typography>
        <Typography
          style={{
            fontFamily: "Lato, sans-serif",
            fontWeight: "700",
            color: "#555",
            marginBottom: "1.5rem",
            border: "1px solid #e1e1e1",
            padding: "1rem",
            borderRadius: "5px",
          }}
        >
          Choose your ETFs and set your preferred maximum stock count. Blend
          then zeros in on overlapping stocks, adjusting their weights to craft
          a complete portfolio that adds up to 100%. Non-overlapping assets? We
          set those aside for a concise view. Curious about the nuances of how
          different ETFs overlap? Visit our 'Overlap' page. Dive in and uncover
          tailored insights!
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
                    fontFamily: "Lato, sans-serif",
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

          {apiResponded && holdingsData.length === 0 && (
            <Alert severity="warning" style={{ marginTop: "2rem" }}>
              No overlap found.
            </Alert>
          )}

          {holdingsData.length > 0 && (
            <Grid container item xs={12} md={6} lg={8} alignItems="center">
              {/* Typography Grid */}
              <Grid item xs={8} md={9} lg={10}>
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
              </Grid>

              {/* Button Grid */}
              <Grid item xs={4} md={3} lg={2} align="right">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleExportToCSV}
                  style={{
                    marginBottom: "1rem",
                    fontFamily: "Poppins, sans-serif",
                    color: "#30B700",
                    borderColor: "#30B700",
                  }}
                >
                  Export to CSV
                </Button>
              </Grid>

              {/* ETFDataGrid */}
              <Grid item xs={12}>
                <ETFDataGrid data={holdingsData} />
              </Grid>
            </Grid>
          )}

          {holdingsData.length > 0 && (
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
