import React, { useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  Container,
  Divider,
  Button,
} from "@mui/material";
import SectorExposureChart from "../Blend/SectorExposureChart";
import ETFSearchFormWeight from "./ETFSearchFormWeight";
import OverlapDataGrid from "./OverlapDataGrid";
import Alert from "@mui/material/Alert";

function Overlap() {
  const [overlapData, setHoldingsData] = useState([]);
  const [overlapCount, setOverlapCount] = useState(null);
  const [sectorData, setSectorData] = useState(null);
  const [apiResponded, setApiResponded] = useState(false);

  const handleApiResponse = (data) => {
    setHoldingsData(data.overlap_data);
    setOverlapCount(data.overlap_count);
    setSectorData(data.sector_exposure);
    setApiResponded(true);
  };

  const handleExportToCSVOverlap = () => {
    console.log("exporting to csv");
    console.log(overlapData);
    const csvRows = [];

    // Ensure data[0] and data[0].etf_weights exist before attempting to access keys
    const headers =
      overlapData && overlapData[0] && overlapData[0].etf_weights
        ? ["ticker", ...Object.keys(overlapData[0].etf_weights), "total_weight"]
        : ["ticker", "total_weight"];

    // Add the headers to the CSV
    csvRows.push(headers.join(","));

    // Add the rows to the CSV
    for (const row of overlapData) {
      const values = headers.map((header) => {
        if (row.etf_weights && header in row.etf_weights) {
          return `"${row.etf_weights[header].toFixed(2)}%"`;
        }
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
    anchorElement.download = "ETF_overlap.csv"; // Changed the name for differentiation

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
          Overlap
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
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
          This tool calculates the overlap between ETFs based on their
          respective weights. You can explore the aggregated ETF data and even
          export it for further analysis.
        </Typography>
        <Divider style={{ marginBottom: "3rem", marginTop: "2rem" }} />

        <Grid container spacing={5}>
          <Grid item xs={12} md={6} lg={4}>
            <ETFSearchFormWeight handleApiResponse={handleApiResponse} />
            {apiResponded && overlapCount && overlapData.length > 0 && (
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
                  Number of Overlapping Stocks: {overlapCount}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    fontFamily: "Lato, sans-serif",
                    color: "#777",
                  }}
                >
                  The Number of overlapping Stocks is the number of stocks
                  across all ETF's selected.
                </Typography>
              </div>
            )}
          </Grid>

          {apiResponded && overlapData.length === 0 && (
            <Alert severity="warning" style={{ marginTop: "2rem" }}>
              No overlap found.
            </Alert>
          )}

          {apiResponded && overlapData.length > 0 && (
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
                  onClick={handleExportToCSVOverlap}
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

              <Grid item xs={12}>
                <OverlapDataGrid data={overlapData} />
              </Grid>
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
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
}

export default Overlap;
