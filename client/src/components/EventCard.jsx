import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Card, CardContent, Button } from "@mui/material";
import parseTime from "../utils/parseTime";
import EventContext from "../context/EventContext";

const EventCard = ({ event }) => {
  const { handleRegistration, handleUnregistration, isUserRegistered, isUpcoming } =
    useContext(EventContext);

  const isUserRegisteredForEvent = isUserRegistered[event.slug];

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%", opacity: 0.95 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {event.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Location: {event.location.raw}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Start: {parseTime(event.start_time)}
          </Typography>

          <Link to={`/events/${event.slug}`}>
            <Button variant="contained" sx={{ margin: 1 }}>
              See details
            </Button>
          </Link>

          {isUpcoming ? (
            isUserRegisteredForEvent ? (
              <Button onClick={() => handleUnregistration(event.slug)} variant="outlined">
                Unregister
              </Button>
            ) : (
              <Button onClick={() => handleRegistration(event.slug)} variant="contained">
                Register
              </Button>
            )
          ) : null}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default EventCard;
