import React from "react";
import { Box, TextField, Grid } from "@mui/material";

const Name = ({ nameType, value, onChange }) => {
  return (
    <Grid item xs={12} sm={6}>
      <Box>
        <TextField
          name={nameType}
          label={nameType === "firstName" ? "First Name" : "Last Name"}
          value={value}
          onChange={onChange}
          fullWidth
        />
      </Box>
    </Grid>
  );
};

export default Name;
