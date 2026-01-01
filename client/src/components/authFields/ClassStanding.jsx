import React from "react";
import choices from "../../utils/choices.json";
import { Box, Autocomplete, TextField } from "@mui/material";

const ClassStanding = ({ inputValue, onInputChange }) => {
  const { class_standings } = choices;

  return (
    <Box>
      <Autocomplete
        options={class_standings}
        name="class_standing"
        renderInput={(params) => <TextField {...params} label="Class Standing" />}
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

export default ClassStanding;
