import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { Link, useNavigate } from "react-router-dom";
import choices from "../utils/choices.json";
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Container, 
  Paper, 
  Avatar,
  Divider,
  Grid,
  CircularProgress,
  Autocomplete,
  LinearProgress,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle // Required for Dialog
} from "@mui/material";

// ... (Keep all your Icon imports) ...
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import PublicIcon from '@mui/icons-material/Public';
import CategoryIcon from '@mui/icons-material/Category';
import WcIcon from '@mui/icons-material/Wc';
import LockResetIcon from '@mui/icons-material/LockReset';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { toast } from "react-toastify";

// ... (Keep EditField Component EXACTLY as it was) ...
const EditField = ({ label, name, value, icon, onSave, options = null, readOnly = false }) => {
  const [localValue, setLocalValue] = useState(value || "");
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  const isDirty = localValue !== (value || "");

  const handleSaveClick = async () => {
    setLoading(true);
    await onSave(name, localValue);
    setLoading(false);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, mb: 3 }}>
      <Box sx={{ color: "action.active", mr: 1, my: 0.5 }}>
        {icon}
      </Box>
      
      {readOnly ? (
         <TextField
           fullWidth label={label} variant="standard" value={localValue}
           InputProps={{ readOnly: true, sx: { fontSize: '1.1rem', color: 'text.secondary' } }}
           InputLabelProps={{ sx: { fontWeight: 'bold', color: '#00205B' } }}
           helperText="This field cannot be changed."
         />
      ) : options ? (
        <Autocomplete
          fullWidth options={options} value={localValue}
          onChange={(event, newValue) => setLocalValue(newValue)}
          renderInput={(params) => (
            <TextField {...params} label={label} variant="standard" InputLabelProps={{ sx: { fontWeight: 'bold', color: '#00205B' } }} />
          )}
        />
      ) : (
        <TextField
          fullWidth label={label} variant="standard" value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          InputProps={{ sx: { fontSize: '1.1rem' } }}
          InputLabelProps={{ sx: { fontWeight: 'bold', color: '#00205B' } }}
        />
      )}
      
      {!readOnly && (
        <Button 
            variant={isDirty ? "contained" : "text"} color="primary" disabled={!isDirty || loading}
            onClick={handleSaveClick} size="small"
            sx={{ minWidth: 90, borderRadius: 2, height: 36, textTransform: "none", fontWeight: "bold", opacity: isDirty ? 1 : 0 }}
        >
            {loading ? <CircularProgress size={20} color="inherit" /> : "Save"}
        </Button>
      )}
    </Box>
  );
};

const ProfilePage = () => {
  const { logoutUser } = useContext(AuthContext); 
  const api = useAxios();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // --- DELETE STATE ---
  const [openDelete, setOpenDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState(""); // Store password input

  // 1. FETCH DATA
  useEffect(() => {
    const getProfileData = async () => {
        try {
            const response = await api.get("/profile/update/"); 
            if (response.status === 200) {
                setProfile(response.data);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            toast.error("Could not load profile data.");
        } finally {
            setLoading(false);
        }
    };
    getProfileData();
  }, []); 

  // 2. UPDATE HANDLER
  const handleUpdate = async (field, newValue) => {
    try {
      const payload = { [field]: newValue };
      const response = await api.patch("/profile/update/", payload); 

      if (response.status === 200) {
        toast.success(`${field.replace("_", " ")} updated!`);
        setProfile(prev => ({ ...prev, [field]: newValue }));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  };

  // 3. DELETE HANDLER (NOW WITH PASSWORD)
  const handleDeleteAccount = async () => {
    if (!deletePassword) {
        toast.warning("Please enter your password to confirm.");
        return;
    }

    try {
        // Axios delete sends data inside a 'data' object key
        await api.delete("/profile/update/", { 
            data: { password: deletePassword } 
        });
        
        toast.info("Account deleted.");
        logoutUser();
        navigate("/login");
    } catch (error) {
        // Show the error message from backend (e.g. "Incorrect password")
        toast.error(error.response?.data?.error || "Failed to delete account.");
    }
  };

  if (loading) return <LinearProgress />;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      
      <Paper elevation={4} sx={{ borderRadius: 4, overflow: "hidden", bgcolor: "#fff" }}>
        
        {/* HERO */}
        <Box sx={{ height: 140, background: "linear-gradient(135deg, #00205B 0%, #005090 100%)" }} />

        {/* HEADER */}
        <Box sx={{ px: 4, pb: 2, mt: -6, textAlign: "center" }}>
          <Box position="relative" display="inline-block">
            <Avatar 
              sx={{ 
                width: 120, height: 120, bgcolor: '#FFC72C', color: '#00205B',
                border: "4px solid white", fontSize: "3rem", fontWeight: "bold",
                boxShadow: "0 4px 14px rgba(0,0,0,0.2)"
              }}
            >
              {profile?.first_name ? profile.first_name[0].toUpperCase() : <PersonIcon fontSize="inherit" />}
            </Avatar>
          </Box>

          <Typography variant="h4" fontWeight="800" sx={{ mt: 2, color: "#333" }}>
            {profile?.first_name} {profile?.last_name}
          </Typography>
          <Typography variant="body1" color="text.secondary" fontWeight="500">
             {profile?.major || "NSBE Member"}
          </Typography>
        </Box>

        {/* CONTENT */}
        <Box sx={{ p: { xs: 3, md: 5 } }}>
          
          <Typography variant="overline" display="block" color="text.secondary" fontWeight="bold" mb={2}>Identity</Typography>
          <EditField label="First Name" name="first_name" value={profile?.first_name} icon={<AccountCircleIcon />} onSave={handleUpdate} />
          <EditField label="Last Name" name="last_name" value={profile?.last_name} icon={<AccountCircleIcon />} onSave={handleUpdate} />
          <EditField label="Gender" name="gender" value={profile?.gender} options={choices.genders} icon={<WcIcon />} onSave={handleUpdate} />
          <EditField label="Race / Ethnicity" name="race" value={profile?.race} options={choices.races} icon={<CategoryIcon />} onSave={handleUpdate} />
          <EditField label="Nationality" name="nationality" value={profile?.nationality} options={choices.countries} icon={<PublicIcon />} onSave={handleUpdate} />

          <Divider sx={{ my: 4 }} />

          <Typography variant="overline" display="block" color="text.secondary" fontWeight="bold" mb={2}>Academic Info</Typography>
          <EditField label="Class Standing" name="class_standing" value={profile?.class_standing} options={choices.class_standings} icon={<BadgeIcon />} onSave={handleUpdate} />
          <EditField label="Major" name="major" value={profile?.major} options={choices.majors} icon={<SchoolIcon />} onSave={handleUpdate} />

          <Divider sx={{ my: 4 }} />

          <Typography variant="overline" display="block" color="text.secondary" fontWeight="bold" mb={2}>Contact Info</Typography>
          <EditField label="Email Address" name="email" value={profile?.email} icon={<EmailIcon />} readOnly={true} onSave={handleUpdate} />

          {/* DANGER ZONE */}
          <Box sx={{ mt: 6, bgcolor: "#fff5f5", p: 3, borderRadius: 2, border: "1px dashed #ef5350" }}>
            <Typography variant="subtitle1" fontWeight="bold" color="error" gutterBottom>
                Danger Zone
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                    <Button component={Link} to="/password-reset-request" variant="outlined" color="primary" startIcon={<LockResetIcon />} fullWidth>
                        Reset Password
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="error" startIcon={<DeleteForeverIcon />} fullWidth onClick={() => setOpenDelete(true)}>
                        Delete Account
                    </Button>
                </Grid>
            </Grid>
          </Box>

        </Box>
      </Paper>

      {/* --- DELETE CONFIRMATION DIALOG --- */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
            Delete your account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            This action is permanent. All your points, event history, and data will be lost forever.
            Please enter your password to confirm.
          </DialogContentText>
          
          {/* PASSWORD INPUT */}
          <TextField
            autoFocus
            margin="dense"
            label="Enter Password"
            type="password"
            fullWidth
            variant="outlined"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            color="error"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDelete(false)} variant="outlined">Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error" variant="contained">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
};

export default ProfilePage;