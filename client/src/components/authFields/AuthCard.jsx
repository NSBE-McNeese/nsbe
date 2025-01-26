import React from "react";
import { Card } from "@mui/material";

const AuthCard = ({ ...props }) => {
  return (
    <Card
      {...props}
      sx={{
        padding: "20px",
        width: {
          xs: "100vw",
          sm: "63%",
        },
        height: {
          xs: "auto",
          sm: "auto",
        },
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        border: "2.5px solid rgb(68, 66, 66, 0.35)",
        borderRadius: "10px",
        position: "relative",
        zIndex: "1",
        background: "rgb(255, 255, 255, 0.7)",
      }}
    ></Card>
  );
};

export default AuthCard;
