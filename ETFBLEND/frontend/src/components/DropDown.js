import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
  InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const DropdownComponent = ({
  selectedOption,
  index,
  handleOptionChange,
  displayedOptions,
  setSearchText,
}) => {

  const handleClearSelection = () => {
    handleOptionChange(index, "");
    setSearchText("");
  };
  
  return (
    <FormControl fullWidth>
      <InputLabel id={`search-select-label-${index}`}>Option {index + 1}</InputLabel>
      <Select
        MenuProps={{ autoFocus: false }}
        labelId={`search-select-label-${index}`}
        id={`search-select-${index}`}
        value={selectedOption}
        label={`Option ${index + 1}`}
        onChange={(e) => handleOptionChange(index, e.target.value)}
        onClose={() => setSearchText("")}
        renderValue={() => selectedOption}
      >
        <ListSubheader>
          <TextField
            size="small"
            autoFocus
            placeholder="Type to search..."
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Escape") {
                e.stopPropagation();
              }
            }}
          />
        </ListSubheader>
        {/* <MenuItem onClick={handleClearSelection}>Clear</MenuItem> */}
        {displayedOptions.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownComponent;
