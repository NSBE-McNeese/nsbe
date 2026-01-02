import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import EventContext from "../context/EventContext";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  Chip,
  LinearProgress,
  Alert,
} from "@mui/material";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import VerifiedIcon from "@mui/icons-material/Verified";

const EventDetail = () => {
  const { event_slug } = useParams();
  const {
    eventDetail,
    fetchEvent,
    checkAttendanceStatus,
    handleRegistration,
    handleUnregistration,
    attendanceStatus,
  } = useContext(EventContext);

  // Add loading state for attendance check
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (event_slug) {
        try {
          await fetchEvent(event_slug);
          await checkAttendanceStatus(event_slug);
        } catch (error) {
          console.error("Error loading event data:", error);
        } finally {
          if (isMounted) {
            setCheckingStatus(false);
          }
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [event_slug, fetchEvent, checkAttendanceStatus]);

  // Show loading if checking status OR event not loaded yet
  if (checkingStatus || !eventDetail || eventDetail.slug !== event_slug) {
    return <LinearProgress />;
  }

  // --- LOGIC ---
  // Look up status using the SLUG
  const status = attendanceStatus[event_slug] || {
    is_registered: false,
    is_approved: false,
    status: "not_registered",
    qr_token: null,
  };

  const isRegistered = status.is_registered;
  const isApproved = status.is_approved;
  const ticketStatus = status.status; // 'pending', 'approved', 'checked_in', etc.
  const qrToken = status.qr_token;

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    const baseUrl = window.API_URL?.replace("/api", "") || process.env.REACT_APP_API_URL?.replace("/api", "") || "";
    return `${baseUrl}${imagePath}`;
  };

  const isPast = new Date(eventDetail.end_time) < new Date();

  const startDate = new Date(eventDetail.start_time);
  const dateStr = startDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const timeStr = startDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const onToggleRegister = async () => {
    if (isApproved) {
      toast.error("Cannot modify an approved ticket");
      return;
    }

    try {
      if (isRegistered) {
        await handleUnregistration(event_slug);
      } else {
        await handleRegistration(event_slug);
      }
      await checkAttendanceStatus(event_slug);
    } catch (error) {
      console.error("Error toggling registration:", error);
    }
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", pb: 8 }}>
      {/* HERO BANNER */}
      <Box
        sx={{
          height: 350,
          bgcolor: "#00205B",
          backgroundImage: eventDetail.image
            ? `url(${getImageUrl(eventDetail.image)})`
            : "linear-gradient(135deg, #005090 0%, #003366 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, pb: 6 }}>
          <Button
            component={Link}
            to="/events"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "rgba(255,255,255,0.8)",
              mb: 2,
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { color: "white" },
            }}
          >
            Back to Events
          </Button>

          <Typography
            variant="h2"
            fontWeight="800"
            color="white"
            sx={{
              textShadow: "0px 4px 10px rgba(0,0,0,0.3)",
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            {eventDetail.title}
          </Typography>

          <Box display="flex" gap={2} mt={2} flexWrap="wrap">
            <Chip label="Event" sx={{ bgcolor: "#FFC72C", color: "#000", fontWeight: "bold" }} />
            {isPast && <Chip label="Past Event" color="error" />}
            {isApproved && (
              <Chip
                icon={<VerifiedIcon />}
                label="Ticket Approved"
                color="success"
                variant="outlined"
              />
            )}
            {isRegistered && ticketStatus === "pending" && (
              <Chip label="Pending Approval" color="warning" />
            )}
          </Box>
        </Container>
      </Box>

      {/* CONTENT GRID */}
      <Container maxWidth="lg" sx={{ mt: -5, position: "relative", zIndex: 3 }}>
        <Grid container spacing={4}>
          {/* Details Column */}
          <Grid item xs={12} md={7} lg={8}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{
                  color: "#00205B",
                  borderBottom: "3px solid #FFC72C",
                  display: "inline-block",
                  pb: 1,
                  mb: 3,
                }}
              >
                Event Details
              </Typography>

              <Typography
                variant="body1"
                sx={{ lineHeight: 1.8, fontSize: "1.1rem", color: "#444", whiteSpace: "pre-line" }}
              >
                {eventDetail.description}
              </Typography>
            </Paper>
          </Grid>

          {/* Ticket/Action Card */}
          <Grid item xs={12} md={5} lg={4}>
            <Paper
              elevation={4}
              sx={{
                p: 0,
                borderRadius: 3,
                position: "sticky",
                top: 20,
                overflow: "hidden",
                border: "1px solid #e0e0e0",
              }}
            >
              <Box
                sx={{
                  bgcolor: isApproved ? "#2e7d32" : isRegistered ? "#1976d2" : "#00205B",
                  p: 3,
                  color: "white",
                  textAlign: "center",
                  transition: "0.3s",
                }}
              >
                <ConfirmationNumberIcon sx={{ fontSize: 40, opacity: 0.8, mb: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  {isApproved
                    ? "Ticket Approved!"
                    : isRegistered
                      ? "Registration Confirmed"
                      : "Event Info"}
                </Typography>
                {isRegistered && !isApproved && (
                  <Typography variant="caption" sx={{ opacity: 0.9, display: "block", mt: 1 }}>
                    Awaiting admin approval
                  </Typography>
                )}
              </Box>

              <Box sx={{ p: 3 }}>
                {/* --- APPROVED TICKET MESSAGE --- */}
                {isApproved && (
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Your ticket has been approved. Please present your QR code at the event.
                  </Alert>
                )}

                {/* --- QR CODE DISPLAY --- */}
                {isRegistered && qrToken && (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "white",
                        border: isApproved ? "2px solid #2e7d32" : "2px dashed #ccc",
                        borderRadius: 2,
                      }}
                    >
                      <QRCode
                        value={qrToken}
                        size={150}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        viewBox={`0 0 256 256`}
                      />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ mt: 1, color: "text.secondary", fontWeight: "bold" }}
                    >
                      {isApproved ? "READY FOR CHECK-IN" : "SCAN AT DOOR"}
                    </Typography>
                  </Box>
                )}

                {/* Info Rows */}
                <Box display="flex" gap={2} mb={2}>
                  <CalendarTodayIcon color="action" />
                  <Typography fontWeight="bold">{dateStr}</Typography>
                </Box>
                <Box display="flex" gap={2} mb={2}>
                  <AccessTimeIcon color="action" />
                  <Typography fontWeight="bold">{timeStr}</Typography>
                </Box>
                <Box display="flex" gap={2} mb={3}>
                  <LocationOnIcon color="action" />
                  <Typography fontWeight="bold">{eventDetail.location}</Typography>
                </Box>

                {/* Points Badge */}
                <Box
                  sx={{
                    bgcolor: "#fff8e1",
                    border: "1px solid #FFC72C",
                    borderRadius: 2,
                    p: 2,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <StarIcon sx={{ color: "#f57c00" }} />
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" color="#f57c00">
                      Earn {eventDetail.points} Points
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {!isPast ? (
                  isApproved ? (
                    // Approved ticket - no changes allowed
                    <Button
                      variant="contained"
                      color="success"
                      size="large"
                      fullWidth
                      disabled
                      startIcon={<VerifiedIcon />}
                    >
                      Ticket Approved
                    </Button>
                  ) : isRegistered ? (
                    // Registered but not approved - can cancel
                    <Button
                      variant="outlined"
                      color="error"
                      size="large"
                      fullWidth
                      onClick={onToggleRegister}
                      startIcon={<CheckCircleIcon />}
                    >
                      Cancel Registration
                    </Button>
                  ) : (
                    // Not registered - can register
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      onClick={onToggleRegister}
                    >
                      Register Now
                    </Button>
                  )
                ) : (
                  <Button variant="contained" disabled fullWidth>
                    Event Ended
                  </Button>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EventDetail;
