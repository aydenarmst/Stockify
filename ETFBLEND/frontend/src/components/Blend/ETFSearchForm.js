import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";

const ETFSearchForm = (props) => {
  const [etfNameList, setEtfNameList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [numHoldings, setNumHoldings] = useState(5);

  useEffect(() => {
    axios
      .get("api/etfList")
      .then((response) => {
        setEtfNameList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ETF list: ", error);
      });
  }, []);

  const highlightText = (text, inputValue) => {
    const matches = match(text, inputValue, { insideWords: true });
    const parts = parse(text, matches);

    return (
      <div>
        {parts.map((part, index) => (
          <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    );
  };

  const handleChange = (event, newValue) => {
    if (newValue.length <= 5) {
      setSelectedOptions(newValue);
    }
  };

  const handleSliderChange = (event, newValue) => {
    setNumHoldings(newValue);
  };

  const handleBlendClick = () => {
    const ETFTickers = selectedOptions
      .filter((option) => option)
      .map((option) => option.match(/\((.*?)\)/)?.[1] ?? "")
      .filter((ticker) => ticker);

    // Create an instance of URLSearchParams
    const params = new URLSearchParams();
    ETFTickers.forEach((ticker) => params.append("etf_tickers", ticker));
    params.append("number_of_holdings", numHoldings);

    axios
      .get("/api/etf-holdings/", { params })
      .then((response) => {
        props.handleApiResponse(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching ETF holdings: ", error));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} align="center">
        <Grid container justifyContent="center" spacing={2}>
          <Autocomplete
            multiple
            options={etfNameList}
            getOptionLabel={(option) => option}
            value={selectedOptions}
            onChange={handleChange}
            filterSelectedOptions
            limitTags={5}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search via ETF name or ticker"
                margin="normal"
              />
            )}
            renderOption={(props, option, { inputValue }) => (
              <li {...props}>{highlightText(option, inputValue)}</li>
            )}
            fullWidth
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              width: "1000px",
            }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} align="center">
        <Tooltip
          title="Select the number of top stocks you'd like to use to recreate the ETF(s)"
          placement="top"
        >
          <Typography gutterBottom style={{ cursor: "pointer" }}>
            Max Number of Constituent Stocks
          </Typography>
        </Tooltip>
        <Slider
          value={numHoldings}
          min={5}
          max={50}
          step={1}
          valueLabelDisplay="auto"
          onChange={handleSliderChange}
          sx={{
            color: "#003366",
          }}
        />
      </Grid>

      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          onClick={handleBlendClick}
          style={{ backgroundColor: "#003366", color: "#FFFFFF" }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#002244")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#003366")
          }
        >
          Blend ETF's
        </Button>
      </Grid>
    </Grid>
  );
};

export default ETFSearchForm;
