import React, { useState, useMemo } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import DropdownComponent from "./DropDown";

const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const allOptions = [
  "Invesco QQQ Trust(QQQ)",
  "SPDR S&P 500 ETF Trust(SPY)",
  "Vanguard Information Technology ETF(VGT)",
  "iShares U.S Technology ETF(IYW)"
];

export default function Home() {

    const [selectedOptions, setSelectedOptions] = useState([
        allOptions[0],
        "",
        "",
        "",
        ""
    ]);

    const [searchText, setSearchText] = useState("");

    const filteredOptions = allOptions.filter((option) =>
        !selectedOptions.includes(option)
    );

    const displayedOptions = useMemo(
        () => filteredOptions.filter((option) => containsText(option, searchText)),
        [searchText, filteredOptions]
    );

    const handleOptionChange = (index, value) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = value;
        setSelectedOptions(newSelectedOptions);
    };

    const handleBlendClick = () => {
        const filteredOptions = selectedOptions.filter((option) => option !== "");
        console.log(filteredOptions);
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4">Select ETFs</Typography>
            </Grid>
            
            <Grid item xs={12} align="center">
                <Grid container justifyContent="center" spacing = {2} style={{height: '100%'}}>
                {selectedOptions.map((selectedOption, index) => (
                    <Grid key={index} item xs={12} sm={6} md={5} lg={2}>
                    <DropdownComponent
                        selectedOption={selectedOption}
                        index={index}
                        handleOptionChange={handleOptionChange}
                        displayedOptions={displayedOptions}
                        setSearchText={setSearchText}
                    />
                    </Grid>
                ))}
                </Grid>
            </Grid>

            <Grid item xs={12} align="center" style={{height: '100%'}}>
                <Button
                    color = "primary" 
                    variant="contained"
                    onClick={handleBlendClick}>
                    Blend ETF's
                </Button>
            </Grid>

        </Grid>
    );
}
