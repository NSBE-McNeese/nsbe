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

// Icons
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

// --- Design Tokens (Consistent Styling) ---
const styles = {
  card: {
    p: 3,
    borderRadius: 4,
    bgcolor: "background.paper",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)", // Soft, modern shadow
    height: "100%", // Default height
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.1)",
    },
  },
  gradientHeader: {
    background: "linear-gradient(135deg, #00205B 0%, #0047AB 100%)", // NSBE Blue Gradient
    borderRadius: 4,
    p: 4,
    color: "white",
    mb: 4,
    boxShadow: 3,
  },
  statValue: {
    fontWeight: 800,
    color: "#00205B", // Dark Blue for readability
  },
  socialIcon: {
    fontSize: "2rem",
    color: "#00205B",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#FDB913", // NSBE Gold on hover
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
    "&:hover": { textDecoration: "underline" },
  },
};

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const { pointsData, fetchPoints } = useContext(EventContext);

  useEffect(() => {
    fetchPoints();
    // eslint-disable-next-line
  }, []);

  if (!user) return <LinearProgress />;

  return (
    <Box sx={{ bgcolor: "#f4f6f8", minHeight: "100vh", pb: 8 }}>
      <Container maxWidth="xl" sx={{ pt: 4 }}>
        
        {/* 1. Welcome Header (Hero Section) */}
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
                label={pointsData.total_points > 50 ? "Active Member" : "Inactive Member"} 
                color={pointsData.total_points > 50 ? "success" : "error"}
                sx={{ fontSize: "1rem", px: 1, py: 2.5, borderRadius: 2, fontWeight: "bold", bgcolor: pointsData.total_points > 50 ? "#4caf50" : "#d32f2f", color: "white" }}
              />
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={3}>
          {/* LEFT COLUMN: Main Stats & Activity */}
          <Grid item xs={12} lg={8}>
            
            {/* 2. Stats Grid */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {[
                { label: "Member ID", value: `000${user.id || "3780"}`, icon: <BadgeIcon />, color: "#e3f2fd", iconColor: "#1565c0" },
                { label: "Total Members", value: "900+", icon: <GroupsIcon />, color: "#fff3e0", iconColor: "#ef6c00" },
                { label: "Events Attended", value: pointsData.events_attended, icon: <EventAvailableIcon />, color: "#e8f5e9", iconColor: "#2e7d32" },
                { label: "Points Earned", value: pointsData.total_points, icon: <EmojiEventsIcon />, color: "#f3e5f5", iconColor: "#7b1fa2" },
              ].map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper sx={{ ...styles.card, display: "flex", flexDirection: "column", justifyContent: "space-between", p: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Avatar sx={{ bgcolor: stat.color, color: stat.iconColor, width: 48, height: 48 }}>
                        {stat.icon}
                      </Avatar>
                    </Box>
                    <Box>
                      <Typography variant="h4" sx={styles.statValue}>{stat.value}</Typography>
                      <Typography variant="body2" color="textSecondary" fontWeight="600">{stat.label}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* 3. Activity Status Card - FIXED: Auto Height & Reduced Padding */}
            <Paper sx={{ ...styles.card, height: "auto" }}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Typography variant="h5" fontWeight="bold">Activity Status</Typography>
              </Box>
              <Typography variant="body2" color="textSecondary" mb={2}>
                Activity is tracked weekly. You must send a message or participate in an event to remain active.
              </Typography>

              <Grid container spacing={2}>
                {/* This Week */}
                <Grid item xs={12} sm={6}>
                  <Box sx={{ p: 1.5, borderRadius: 2, border: "1px solid #eee", textAlign: "center" }}>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>THIS WEEK</Typography>
                    <Chip 
                      icon={<CancelIcon />} 
                      label="Inactive" 
                      color="error" 
                      variant="outlined" 
                      size="small"
                      sx={{ fontWeight: "bold", px: 1 }}
                    />
                  </Box>
                </Grid>
                {/* Last 16 Weeks */}
                <Grid item xs={12} sm={6}>
                  <Box sx={{ p: 1.5, borderRadius: 2, border: "1px solid #eee", textAlign: "center" }}>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>LAST 16 WEEKS</Typography>
                    <Chip 
                      icon={<CancelIcon />} 
                      label="Inactive" 
                      color="error" 
                      variant="outlined" 
                      size="small"
                      sx={{ fontWeight: "bold", px: 1 }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* 4. Activation Checklist - FIXED: Auto Height */}
            <Paper sx={{ ...styles.card, height: "auto", mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography variant="h6" fontWeight="bold">Complete Activation</Typography>
                <Typography variant="body2" color="textSecondary">Steps remaining to unlock full membership.</Typography>
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

          {/* RIGHT COLUMN: Resources & Socials */}
          <Grid item xs={12} lg={4}>
            
            {/* 5. Mission Statement (Dark Card) */}
            <Paper sx={{ p: 4, borderRadius: 4, bgcolor: "#121212", color: "white", mb: 3, boxShadow: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: "#FDB913" }}>
                OUR MISSION
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7, opacity: 0.9 }}>
                To <strong style={{ color: "#FDB913" }}>increase</strong> the number of culturally responsible Black Engineers who excel academically, succeed professionally, and positively impact the community.
              </Typography>
            </Paper>

            {/* 6. Important Resources */}
            <Paper sx={styles.card}>
              <Typography variant="h6" fontWeight="bold" mb={3}>Quick Links 🔗</Typography>
              
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { name: "NSBE National", desc: "The heartbeat of our community.", url: "https://www.nsbe.org/" },
                  { name: "Region V Bylaws", desc: "Regional rules and regulations.", url: "#" },
                  { name: "Code of Conduct", desc: "Community standards.", url: "#" }
                ].map((item, i) => (
                  <Box component="li" key={i}>
                    <a href={item.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="primary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                        {item.name}
                      </Typography>
                    </a>
                    <Typography variant="body2" color="textSecondary">{item.desc}</Typography>
                    {i !== 2 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </Box>
            </Paper>

            {/* 7. Social Media */}
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="subtitle2" color="textSecondary" mb={1}>STAY CONNECTED</Typography>
              <Box display="flex" justifyContent="center" gap={3}>
                <IconButton sx={styles.socialIcon} href="https://linkedin.com"><LinkedInIcon fontSize="inherit" /></IconButton>
                <IconButton sx={styles.socialIcon} href="https://instagram.com"><InstagramIcon fontSize="inherit" /></IconButton>
                <IconButton sx={styles.socialIcon} href="mailto:contact@nsbe.org"><EmailIcon fontSize="inherit" /></IconButton>
              </Box>
            </Box>

          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;