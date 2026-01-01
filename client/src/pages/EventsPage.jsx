import React, { useContext, useState, useEffect } from "react";
import EventContext from "../context/EventContext";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Chip,
  TextField,
  InputAdornment,
  LinearProgress,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import EventIcon from "@mui/icons-material/Event";

const EventsPage = () => {
  const { filteredEvents, isUpcoming, setIsUpcoming, loading, fetchPoints } =
    useContext(EventContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPoints();
  }, [fetchPoints]);

  const displayEvents = filteredEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDateBadge = (dateString) => {
    if (!dateString) return { month: "---", day: "--", time: "--" };
    const date = new Date(dateString);
    return {
      month: date.toLocaleString("default", { month: "short" }).toUpperCase(),
      day: date.getDate(),
      time: date.toLocaleString("default", { hour: "numeric", minute: "2-digit", hour12: true }),
    };
  };

  if (loading) return <LinearProgress />;

  // Clean the Base URL for images
  const apiBaseUrl = process.env.REACT_APP_API_URL?.replace("/api", "") || "";

  return (
    <Box sx={{ bgcolor: "#f4f6f8", minHeight: "100vh", pb: 8 }}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #00205B 0%, #005090 100%)",
          py: 8,
          px: 2,
          textAlign: "center",
          color: "white",
          mb: 6,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="overline"
            letterSpacing={2}
            fontWeight="bold"
            sx={{ color: "#FFC72C" }}
          >
            MCNEESE NSBE CHAPTER
          </Typography>
          <Typography variant="h3" fontWeight="800" gutterBottom sx={{ mt: 1 }}>
            Events & Workshops
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.85, mb: 4, fontWeight: 300 }}>
            Connect with peers, gain professional skills, and earn points.
          </Typography>

          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              maxWidth: 600,
              mx: "auto",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }}
          >
            <InputAdornment position="start" sx={{ pl: 2 }}>
              <SearchIcon color="action" />
            </InputAdornment>
            <TextField
              fullWidth
              placeholder="Search by title or topic..."
              variant="standard"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{ disableUnderline: true }}
              sx={{ px: 2, py: 1.5 }}
            />
          </Paper>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          flexWrap="wrap"
          gap={2}
          sx={{ borderBottom: "1px solid #e0e0e0", pb: 2 }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <EventIcon color="action" />
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              {isUpcoming ? "Upcoming Events" : "Past Events"}
            </Typography>
            <Chip
              label={displayEvents.length}
              size="small"
              sx={{ bgcolor: "#e3f2fd", color: "#1565c0", fontWeight: "bold" }}
            />
          </Box>

          <ToggleButtonGroup
            value={isUpcoming}
            exclusive
            onChange={(e, val) => {
              if (val !== null) setIsUpcoming(val);
            }}
            size="small"
          >
            <ToggleButton value={true} sx={{ px: 3, borderRadius: 5 }}>
              Upcoming
            </ToggleButton>
            <ToggleButton value={false} sx={{ px: 3, borderRadius: 5 }}>
              Past
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Grid container spacing={3}>
          {displayEvents.map((event) => {
            const dateInfo = formatDateBadge(event.start_time);
            const imageUrl = event.image
              ? event.image.startsWith("http")
                ? event.image
                : `${apiBaseUrl}${event.image}`
              : null;

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={event.slug}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    border: "1px solid rgba(0,0,0,0.05)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box
                    sx={{ position: "relative", height: 180, overflow: "hidden", bgcolor: "#eee" }}
                  >
                    {imageUrl ? (
                      <CardMedia
                        component="img"
                        height="100%"
                        image={imageUrl}
                        alt={event.title}
                        sx={{ objectFit: "cover" }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(135deg, #005090 0%, #FFC72C 100%)",
                        }}
                      />
                    )}

                    {event.points > 0 && (
                      <Chip
                        icon={<StarIcon sx={{ color: "#FFC72C !important", fontSize: "1rem" }} />}
                        label={`${event.points} pts`}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          bgcolor: "rgba(0,0,0,0.8)",
                          color: "white",
                          fontWeight: "bold",
                          border: "1px solid rgba(255,255,255,0.2)",
                        }}
                      />
                    )}
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                    <Box display="flex" gap={2}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          minWidth: 50,
                        }}
                      >
                        <Typography variant="caption" fontWeight="bold" color="error">
                          {dateInfo.month}
                        </Typography>
                        <Typography variant="h5" fontWeight="900">
                          {dateInfo.day}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{ fontSize: "1.05rem", mb: 1, minHeight: "2.6em" }}
                        >
                          {event.title}
                        </Typography>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={0.8}
                          color="text.secondary"
                          mb={0.5}
                        >
                          <CalendarTodayIcon sx={{ fontSize: 16 }} />
                          <Typography variant="body2">{dateInfo.time}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={0.8} color="text.secondary">
                          <LocationOnIcon sx={{ fontSize: 16 }} />
                          <Typography variant="body2" noWrap sx={{ maxWidth: "160px" }}>
                            {event.location || "TBA"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>

                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      component={Link}
                      to={`/events/${event.slug}`}
                      variant="outlined"
                      fullWidth
                      endIcon={<ArrowForwardIcon />}
                      sx={{ borderRadius: 2, fontWeight: "bold", color: "#005090" }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default EventsPage;
