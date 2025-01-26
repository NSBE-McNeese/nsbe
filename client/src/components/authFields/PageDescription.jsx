import React from "react";
import { Typography, Avatar } from "@mui/material";

const PageDescription = ({ pageDescriptionString }) => {
  return (
    <div>
      <Avatar
        src="header_nsbe_logo.png"
        alt="NSBE Header Logo"
        variant="square"
        sx={{
          height: "auto",
          width: 110,
          marginTop: "-15px",
          marginBottom: "35px",
        }}
      />

      <Typography
        variant="h1"
        align="center"
        font="inherit"
        fontSize="40px"
        fontWeight="700"
        gutterBottom
        sx={{
          marginTop: "-85px",
          opacity: {
            xs: 0,
            sm: 1,
          },
        }}
      >
        {pageDescriptionString}
      </Typography>
    </div>
  );
};

export default PageDescription;
