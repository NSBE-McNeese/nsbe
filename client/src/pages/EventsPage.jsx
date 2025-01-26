import React, { useContext } from "react";
import EventCardContainer from "../components/EventCardContainer";
import { Typography, Button, Box } from "@mui/material";
import EventContext from "../context/EventContext";

const EventsPage = () => {
  const { isUpcoming, setIsUpcoming, filteredEvents } =
    useContext(EventContext);

  return (
    <>
      <Typography variant="h4">Events</Typography>
      <Box component="section" sx={{ display: "flex", gap: 1 }}>
        <Button
          sx={{ width: "150px" }}
          onClick={() => setIsUpcoming(true)}
          variant={isUpcoming ? "contained" : "outlined"}
        >
          Upcoming
        </Button>
        <Button
          sx={{ width: "150px" }}
          onClick={() => setIsUpcoming(false)}
          variant={!isUpcoming ? "contained" : "outlined"}
        >
          Past
        </Button>
      </Box>
      <EventCardContainer events={filteredEvents} />
    </>
  );
};

export default EventsPage;
