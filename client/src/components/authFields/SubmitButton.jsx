import React from "react";
import { Button } from "@mui/material";

const SubmitButton = ({ text }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{
        width: "100%",
        height: "auto",
        fontWeight: "600",
        fontSize: {
          xs: "150%",
        },
        marginTop: "20px",
        borderRadius: "50px",
        backgroundColor: "#FFD700",
        color: "#00529b",
        "&:hover": {
          backgroundColor: "#FFD700",
        },
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexWrap: "wrap",
        textAlign: "center",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
