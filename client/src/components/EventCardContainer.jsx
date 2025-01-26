import React from "react";
import EventCard from "./EventCard";
import { Grid } from "@mui/material";

const EventCardContainer = ({ events }) => {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      {events.length > 0 ? (
        events.map((event) => <EventCard key={event.slug} event={event} />)
      ) : (
        <p>No events available now</p>
      )}
    </Grid>
  );
};

export default EventCardContainer;
