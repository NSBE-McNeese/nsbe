import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Password = ({
  value,
  autoComplete = "new-password",
  label = "Password",
  error,
  helperText,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
 
  return (
    <Box mb={2} sx={{ display: "flex", position: "relative", top: "10px" }}>
      <TextField
        value={value}
        autoComplete={autoComplete}
        label={label}
        type={showPassword ? "text" : "password"}
        fullWidth
        onChange={onChange}
        error={error}
        helperText={helperText}
      />
      <IconButton
        onClick={() => setShowPassword(!showPassword)}
        sx={{ position: "absolute", right: "1.5%", top: "20%", color: "black" }}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </Box>
  );
};

export default Password;
