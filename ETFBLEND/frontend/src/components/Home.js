import React, { useState, useMemo, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import DropdownComponent from "./DropDown";

const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

export default function Home() {

    const [etfNameList, setEtfNameList] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState(["","","","",""]);
    
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

    const [searchText, setSearchText] = useState("");

    const allOptions = useMemo(
        () => etfNameList.filter((option) => containsText(option, searchText)),
        [searchText, etfNameList]
    );

    const filteredOptions = useMemo(
        () => allOptions.filter((option) => !selectedOptions.includes(option)),
        [allOptions, selectedOptions]
    );
    


    const handleOptionChange = (index, value) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = value;
        setSelectedOptions(newSelectedOptions);
    };

    const handleBlendClick = () => {
        const filteredOptions = selectedOptions.filter((option) => option !== "");
        
        // Extract the ticker from each option
        const ETFTickers = filteredOptions.map((option) => {
            const matches = option.match(/\((.*?)\)/);
            return matches ? matches[1] : '';
        });
        
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ETFTickers: ETFTickers  // Use 'ticker' as the key
            })
        };
    
        fetch("/api/blend", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
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
                        displayedOptions={filteredOptions}
                        setSearchText={setSearchText}
                    />
                    <Button color="secondary" onClick={() => handleOptionChange(index, "")}>
                        Clear
                    </Button>

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
