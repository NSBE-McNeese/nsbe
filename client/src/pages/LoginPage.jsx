import React, { useContext, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Link, Button, TextField, MenuItem, Typography, Card, InputLabel, Select, FormControl, Grid } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AuthContext from '../context/AuthContext';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;

    if (email.length > 0 && !isError) {
      loginUser(email, password);
    }
  };

  const isError = email.length > 0 && 
                  email.indexOf('@') > -1 && 
                  email.indexOf('.') > -1 && 
                  !email.endsWith('@mcneese.edu');

  return (
    <Card 
      sx={{
        width: '100%',
        height: '100%',
        maxWidth: '600px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '3px',
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        margin: 'auto',
        marginTop: '10vh',
        opacity: 0.95
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Log In <ExitToAppIcon />
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid item>
          <Box mb={2} sx={{ display: 'flex', position: 'relative' }}>
            <TextField
              required
              fullWidth
              name="email"
              label="McNeese Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              error={isError}
              helperText={isError ? "Email must end in @mcneese.edu!" : ""}
            />
            <IconButton sx={{ position: 'absolute', right: 0, top: 0 }}>
              <PersonIcon />
            </IconButton>
          </Box>
        </Grid>

        <Grid item>
          <Box sx={{ display: 'flex', position: 'relative' }}>
            <TextField
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              name="password"
              autoComplete="new-password"
            />
            <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ position: 'absolute', right: 0, top: 0 }}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: '100%',
            height: '45px',
            marginTop: '20px',
            borderRadius: '40px',
            backgroundColor: '#ffd700',
            cursor: 'pointer',
            fontWeight: 600,
            border: 'none',
            outline: 'none',
            boxShadow: '0 0 10px rgba(0, 0, 0, .1)',
            fontSize: '16px',
            color: 'black',
            '&:hover': {
              backgroundColor: '#FFD700',
            },
          }}
        >
          Login
        </Button>

        <Typography
          variant="body2"
          align="center"
          sx={{
            marginTop: '15px',
          }}
        >
          Create new account?{' '}
          <Link href="/register" underline="hover">
            Sign Up
          </Link>
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{
            marginTop: '15px',
          }}
        >
          Forgot Password?{' '}
          <Link href="/password-reset-request" underline="hover">
            Edit Password
          </Link>
        </Typography>
      </form>
    </Card>
  );
};

export default LoginPage;
