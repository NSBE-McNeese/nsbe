import React from "react";
import { Box, TextField, IconButton } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const Email = ({ value, onChange }) => {
  const isError =
    value.length > 0 &&
    value.indexOf("@") > -1 &&
    value.indexOf(".") > -1 &&
    !value.endsWith("@mcneese.edu");

  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      <TextField
        label="McNeese Email"
        name="email"
        type="email"
        value={value}
        onChange={onChange}
        error={isError}
        helperText={isError ? "Email Must End in @mcneese.edu!" : ""}
        fullWidth
      />
      <IconButton sx={{ position: "absolute", right: "0.7%", top: "5%" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "2px solid grey",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderColor: "black",
          }}
        >
          <EmailIcon sx={{ color: "black" }} />
        </div>
      </IconButton>
    </Box>
  );
};

export default Email;
