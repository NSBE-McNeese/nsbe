import React from "react";
import choices from "../../utils/choices.json";
import { Box, Autocomplete, TextField } from "@mui/material";

const Major = ({ inputValue, onInputChange }) => {
  const { majors } = choices;

  return (
    <Box>
      <Autocomplete
        options={majors}
        name="major"
        renderInput={(params) => <TextField {...params} label="Major" />}
        inputValue={inputValue}
        onInputChange={onInputChange}
        sx={{
          "& .MuiAutocomplete-popupIndicator": {
            position: "relative",
            "& svg": {
              fontSize: "3.5rem",
              color: "black",
            },
          },
        }}
      />
    </Box>
  );
};

export default Major;
