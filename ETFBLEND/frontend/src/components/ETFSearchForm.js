import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

const ETFSearchForm = () => {
  const [etfNameList, setEtfNameList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

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

  const handleBlendClick = () => {
    const filteredOptions = selectedOptions.filter((option) => option !== "");

    const ETFTickers = filteredOptions.map((option) => {
      const matches = option.match(/\((.*?)\)/);
      return matches ? matches[1] : "";
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ETFTickers: ETFTickers,
      }),
    };

    fetch("/api/blend", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
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
        <Button color="primary" variant="contained" onClick={handleBlendClick}>
          Blend ETF's
        </Button>
      </Grid>
    </Grid>
  );
};

export default ETFSearchForm;
