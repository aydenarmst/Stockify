import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Paper,
  Switch,
  Tooltip,
  Slider,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import axios from "axios";

const ETFSearchFormWeight = (props) => {
  const [etfNameList, setEtfNameList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [weights, setWeights] = useState({});
  const [excludedSectors, setExcludedSectors] = useState([]);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const SECTORS = [
    "Energy",
    "Health Care",
    "Information Technology",
    "Communication",
    "Consumer Discretionary",
    "Utilities",
    "Financials",
    "Materials",
    "Real Estate",
    "Consumer Staples",
    "Industrials",
    "Cash and/or Derivatives"
  ];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/etfList")
      .then((response) => response.json())
      .then((data) => {
        setEtfNameList(data);
      })
      .catch((error) => {
        console.error("Error fetching ETF list: ", error);
      });
  }, []);

  const handleWeightChange = (ticker, newValue) => {
    const newNumericValue =
      typeof newValue === "string" ? parseFloat(newValue) : newValue;

    if (!selectedOptions.some((option) => option.includes(ticker))) {
      return; // Exit if the ticker is not in the selected options.
    }

    const currentTotalWithoutTicker = Object.keys(weights).reduce(
      (sum, key) =>
        key !== ticker ? sum + parseFloat(weights[key] || 0) : sum,
      0
    );

    const effectiveNewValue = Math.min(
      newNumericValue,
      100 - currentTotalWithoutTicker
    );

    setWeights((prev) => ({
      ...prev,
      [ticker]: effectiveNewValue,
    }));
  };

  const renderWeightSlider = (ticker) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <TextField
        type="number"
        value={weights[ticker] || 0}
        onChange={(e) => handleWeightChange(ticker, e.target.value)}
        inputProps={{ min: "0", max: "100", step: "1" }}
        style={{ width: "70px", marginRight: "10px" }}
        InputProps={{
          endAdornment: <Typography variant="caption">%</Typography>,
        }}
      />
      <Tooltip title="Set ETF weight" placement="right">
        <Slider
          value={weights[ticker] || 0}
          onChange={(_, newValue) => handleWeightChange(ticker, newValue)}
          min={0}
          max={100}
          valueLabelDisplay="off" // Turn off since we now have a text box
          style={{ marginLeft: "10px", width: "150px" }}
        />
      </Tooltip>
    </div>
  );

  const handleChange = (event, newValue) => {
    if (newValue.length <= 5) {
      const newSelectedTickers = newValue
        .map((option) => option.match(/\((.*?)\)/)?.[1])
        .filter(Boolean);
      setWeights((prevWeights) => {
        const updatedWeights = { ...prevWeights };
        for (let ticker in prevWeights) {
          if (!newSelectedTickers.includes(ticker)) {
            delete updatedWeights[ticker];
          }
        }
        return updatedWeights;
      });
      setSelectedOptions(newValue);
    }
  };

  const handleOverlapClick = () => {
    const ETFTickers = selectedOptions
      .filter((option) => option)
      .map((option) => option.match(/\((.*?)\)/)?.[1] ?? "")
      .filter((ticker) => ticker);

    const ETFWeights = ETFTickers.map((ticker) => weights[ticker] || 0);

    const etfTickerWeightTuples = ETFTickers.map((ticker, index) => [
      ticker,
      ETFWeights[index],
    ]);

    // Create a query string for ETFs
    const etfQueryString = etfTickerWeightTuples
      .map(([ticker, weight]) => `etf=${encodeURIComponent(ticker)}:${weight}`)
      .join("&");

    // Create a query string for excluded sectors
    const excludedSectorsQueryString = excludedSectors
      .map((sector) => `exclude=${encodeURIComponent(sector)}`)
      .join("&");

    // Merge the ETF and excluded sectors query strings
    const queryParameters = `${etfQueryString}&${excludedSectorsQueryString}`;

    axios
      .get(`http://127.0.0.1:8000/api/overlap/?${queryParameters}`)
      .then((response) => {
        console.log(response.data);
        props.handleApiResponse(response.data);
      })
      .catch((error) => console.error("Error fetching ETF overlaps: ", error));
  };

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

  const handleSwitchChange = (event) => {
    setIsSwitchOn(event.target.checked);
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
        {selectedOptions.map((option) => {
          const ticker = option.match(/\((.*?)\)/)?.[1] ?? "";
          return (
            <div
              key={ticker}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <Typography variant="body1">{option}</Typography>
              {renderWeightSlider(ticker)}
            </div>
          );
        })}
      </Grid>

      <Grid item xs={12} align="center">
        <Typography component="div" variant="subtitle1">
          Exclude Sectors?:
          <Switch checked={isSwitchOn} onChange={handleSwitchChange} />
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        {isSwitchOn && (
          <>
            <Typography variant="h6">Exclude Sectors</Typography>
            <Autocomplete
              multiple
              options={SECTORS}
              value={excludedSectors}
              onChange={(event, newValue) => setExcludedSectors(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Exclude Sectors"
                  margin="normal"
                />
              )}
            />
          </>
        )}
      </Grid>

      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          onClick={handleOverlapClick}
          style={{ backgroundColor: "#003366", color: "#FFFFFF" }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#002244")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#003366")
          }
        >
          Calculate Overlap
        </Button>
      </Grid>
    </Grid>
  );
};

export default ETFSearchFormWeight;
