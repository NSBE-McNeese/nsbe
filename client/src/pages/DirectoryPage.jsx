import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  Box,
  Chip,
  LinearProgress,
  Tooltip,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SchoolIcon from "@mui/icons-material/School";

const DirectoryPage = () => {
  const { authTokens, user } = useContext(AuthContext);
  const api = useAxios();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return null;
    if (avatarPath.startsWith("http")) return avatarPath;
    const baseUrl = window.API_URL?.replace("/api", "") || process.env.REACT_APP_API_URL?.replace("/api", "") || "";
    return `${baseUrl}${avatarPath}`;
  };

  useEffect(() => {
    const fetchMembers = async () => {
      if (!authTokens) return;

      try {
        const response = await api.get("directory/");

        const data = response.data;

        if (Array.isArray(data)) {
          setMembers(data);
        } else if (data.results && Array.isArray(data.results)) {
          setMembers(data.results);
        } else {
          setMembers([]);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [authTokens, api]);

  const filteredMembers = members.filter((member) => {
    if (user && member.id === user.user_id) return false;

    const firstName = member.first_name || (member.user && member.user.first_name) || "";
    const lastName = member.last_name || (member.user && member.user.last_name) || "";
    const major = member.major || "";

    const fullName = `${firstName} ${lastName}`.toLowerCase();
    const term = searchTerm.toLowerCase();

    return fullName.includes(term) || major.toLowerCase().includes(term);
  });

  if (loading) return <LinearProgress />;

  const iconButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    textDecoration: "none",
    transition: "background-color 0.2s",
    cursor: "pointer",
    position: "relative",
    zIndex: 10,
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", pb: 8 }}>
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #005090 0%, #003366 100%)",
          py: 6,
          px: 2,
          mb: 4,
          textAlign: "center",
          color: "white",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Member Directory
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4, fontWeight: 300 }}>
            Connect with {filteredMembers.length} NSBE engineers.
          </Typography>

          <TextField
            fullWidth
            placeholder="Search by name or major..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "transparent" } },
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Container>
      </Box>

      {/* Grid */}
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {filteredMembers.map((member) => {
            const emailAddress = member.email || (member.user && member.user.email);
            const linkedInUrl = member.linkedin || (member.user && member.user.linkedin);

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={member.id || Math.random()}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    position: "relative",
                    zIndex: 1,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: "center", pt: 4 }}>
                    <Avatar
                      src={getAvatarUrl(member.avatar)}
                      sx={{
                        width: 80,
                        height: 80,
                        margin: "0 auto",
                        mb: 2,
                        bgcolor: "#e3f2fd",
                        color: "#1565c0",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        border: "3px solid white",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    >
                      {member.first_name ? member.first_name[0] : ""}
                      {member.last_name ? member.last_name[0] : ""}
                    </Avatar>

                    <Typography variant="h6" fontWeight="bold" color="primary.main" gutterBottom>
                      {member.first_name} {member.last_name}
                    </Typography>

                    <Box mb={2} display="flex" justifyContent="center" gap={1} flexWrap="wrap">
                      {member.major && (
                        <Chip
                          icon={<SchoolIcon fontSize="small" />}
                          label={member.major}
                          size="small"
                          sx={{ bgcolor: "#f1f3f4", fontWeight: 500 }}
                        />
                      )}
                      {member.class_standing && (
                        <Chip
                          label={member.class_standing}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      )}
                    </Box>

                    {/* ACTION BUTTONS: Native HTML Links */}
                    <Box
                      sx={{
                        borderTop: "1px solid #f0f0f0",
                        mt: 2,
                        pt: 2,
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                      }}
                    >
                      {emailAddress && (
                        <Tooltip title="Send Email">
                          <a
                            href={`mailto:${emailAddress}`}
                            style={{
                              ...iconButtonStyle,
                              backgroundColor: "#fce8e6",
                              color: "#ea4335",
                            }}
                          >
                            <EmailIcon fontSize="small" />
                          </a>
                        </Tooltip>
                      )}

                      {linkedInUrl && (
                        <Tooltip title="Connect on LinkedIn">
                          <a
                            href={linkedInUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              ...iconButtonStyle,
                              backgroundColor: "#e1f5fe",
                              color: "#0077b5",
                            }}
                          >
                            <LinkedInIcon fontSize="small" />
                          </a>
                        </Tooltip>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default DirectoryPage;
