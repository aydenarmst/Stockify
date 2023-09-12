import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import axios from "axios";

const ETFSearchFormWeight = (props) => {
  const [etfNameList, setEtfNameList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [weights, setWeights] = useState({});

  useEffect(() => {
    fetch("api/etfList")
      .then((response) => response.json())
      .then((data) => {
        setEtfNameList(data);
      })
      .catch((error) => {
        console.error("Error fetching ETF list: ", error);
      });
  }, []);

  const handleWeightChange = (ticker, event) => {
    if (!selectedOptions.some((option) => option.includes(ticker))) {
      return; // Exit if the ticker is not in the selected options.
    }
    const newWeight = parseFloat(event.target.value) || 0; // Convert to float or set to 0 if empty or invalid
    const currentTotalWithoutTicker = Object.keys(weights).reduce(
      (sum, key) =>
        key !== ticker ? sum + parseFloat(weights[key] || 0) : sum,
      0
    );

    if (currentTotalWithoutTicker + newWeight <= 100) {
      setWeights((prev) => ({
        ...prev,
        [ticker]: newWeight,
      }));
    } else {
      // Optionally, inform the user that they cannot exceed a total of 100%
      alert("Total weights cannot exceed 100%");
    }
  };

  const renderWeightField = (ticker) => (
    <TextField
      label="Weight (%)"
      value={weights[ticker] || ""}
      onChange={(e) => handleWeightChange(ticker, e)}
      type="number"
      inputProps={{ min: 0, max: 100 }}
      margin="normal"
      style={{ marginLeft: "10px" }}
    />
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

    const queryParameters = etfTickerWeightTuples
      .map(([ticker, weight]) => `etf=${encodeURIComponent(ticker)}:${weight}`)
      .join("&");

    axios
      .get(`/api/overlap/?${queryParameters}`)
      .then((response) => {
        console.log(response.data)
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
              }}
            >
              <Typography variant="body1">{option}</Typography>
              {renderWeightField(ticker)}
            </div>
          );
        })}
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
