import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import EventContext from "../context/EventContext";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
  Divider,
  Chip,
  Avatar,
  LinearProgress,
} from "@mui/material";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const styles = {
  card: {
    p: 3,
    borderRadius: 4,
    bgcolor: "background.paper",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
    height: "100%",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.1)",
    },
  },
  gradientHeader: {
    background: "linear-gradient(135deg, #00205B 0%, #0047AB 100%)",
    borderRadius: 4,
    p: 4,
    color: "white",
    mb: 4,
    boxShadow: 3,
  },
  statValue: {
    fontWeight: 800,
    color: "#00205B",
  },
  socialIcon: {
    fontSize: "2rem",
    color: "#00205B",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#FDB913",
      transform: "scale(1.2)",
    },
  },
  link: {
    textDecoration: "none",
    color: "#0047AB",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
};

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const { pointsData, fetchPoints } = useContext(EventContext);

  useEffect(() => {
    fetchPoints();
  }, [fetchPoints]);

  if (!user) return <LinearProgress />;

  const isActive = pointsData?.total_points > 50;

  return (
    <Box sx={{ bgcolor: "#f4f6f8", minHeight: "100vh", pb: 8 }}>
      <Container maxWidth="xl" sx={{ pt: 4 }}>
        <Box sx={styles.gradientHeader}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Welcome, {user.first_name}!
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Here is your NSBE membership snapshot.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
              <Chip
                label={isActive ? "Active Member" : "Inactive Member"}
                color={isActive ? "success" : "error"}
                sx={{
                  fontSize: "1rem",
                  px: 1,
                  py: 2.5,
                  borderRadius: 2,
                  fontWeight: "bold",
                  color: "white",
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {[
                {
                  label: "Member ID",
                  value: `000${user.id || "3780"}`,
                  icon: <BadgeIcon />,
                  color: "#e3f2fd",
                  iconColor: "#1565c0",
                },
                {
                  label: "Total Members",
                  value: "900+",
                  icon: <GroupsIcon />,
                  color: "#fff3e0",
                  iconColor: "#ef6c00",
                },
                {
                  label: "Events Attended",
                  value: pointsData?.events_attended || 0,
                  icon: <EventAvailableIcon />,
                  color: "#e8f5e9",
                  iconColor: "#2e7d32",
                },
                {
                  label: "Points Earned",
                  value: pointsData?.total_points || 0,
                  icon: <EmojiEventsIcon />,
                  color: "#f3e5f5",
                  iconColor: "#7b1fa2",
                },
              ].map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper
                    sx={{
                      ...styles.card,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      p: 2,
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      mb={2}
                    >
                      <Avatar
                        sx={{ bgcolor: stat.color, color: stat.iconColor, width: 48, height: 48 }}
                      >
                        {stat.icon}
                      </Avatar>
                    </Box>
                    <Box>
                      <Typography variant="h4" sx={styles.statValue}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" fontWeight="600">
                        {stat.label}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Paper sx={{ ...styles.card, height: "auto" }}>
              <Typography variant="h5" fontWeight="bold" mb={1}>
                Activity Status
              </Typography>
              <Typography variant="body2" color="textSecondary" mb={2}>
                Activity is tracked weekly. Participate in events to remain active.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{ p: 1.5, borderRadius: 2, border: "1px solid #eee", textAlign: "center" }}
                  >
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      THIS WEEK
                    </Typography>
                    <Chip
                      icon={<CancelIcon />}
                      label="Inactive"
                      color="error"
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{ p: 1.5, borderRadius: 2, border: "1px solid #eee", textAlign: "center" }}
                  >
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      LAST 16 WEEKS
                    </Typography>
                    <Chip
                      icon={<CancelIcon />}
                      label="Inactive"
                      color="error"
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            <Paper
              sx={{
                ...styles.card,
                height: "auto",
                mt: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Complete Activation
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Unlock full membership benefits.
                </Typography>
              </Box>
              <Box display="flex" gap={2}>
                <Chip label="Profile Setup" color="success" icon={<CheckCircleIcon />} />
                <Chip label="Pay Dues" color="default" icon={<CancelIcon />} variant="outlined" />
              </Box>
              <Link to="/profile" style={styles.link}>
                Go to Profile <ArrowForwardIcon fontSize="small" />
              </Link>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 4, borderRadius: 4, bgcolor: "#121212", color: "white", mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: "#FDB913" }}>
                OUR MISSION
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7, opacity: 0.9 }}>
                To <strong style={{ color: "#FDB913" }}>increase</strong> the number of culturally
                responsible Black Engineers who excel academically, succeed professionally, and
                positively impact the community.
              </Typography>
            </Paper>

            <Paper sx={styles.card}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Quick Links 🔗
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  p: 0,
                  m: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {[
                  {
                    name: "NSBE National",
                    desc: "The heartbeat of our community.",
                    url: "https://www.nsbe.org/",
                  },
                  { name: "Region V Bylaws", desc: "Regional regulations.", url: "#" },
                  { name: "Code of Conduct", desc: "Community standards.", url: "#" },
                ].map((item, i) => (
                  <Box component="li" key={i}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold" color="primary">
                        {item.name}
                      </Typography>
                    </a>
                    <Typography variant="body2" color="textSecondary">
                      {item.desc}
                    </Typography>
                    {i !== 2 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </Box>
            </Paper>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Box display="flex" justifyContent="center" gap={3}>
                <IconButton sx={styles.socialIcon} href="https://linkedin.com">
                  <LinkedInIcon fontSize="inherit" />
                </IconButton>
                <IconButton sx={styles.socialIcon} href="https://instagram.com">
                  <InstagramIcon fontSize="inherit" />
                </IconButton>
                <IconButton sx={styles.socialIcon} href="mailto:contact@nsbe.org">
                  <EmailIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
