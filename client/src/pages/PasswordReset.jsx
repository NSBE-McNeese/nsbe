import React, {useContext, useState, useEffect } from 'react';
import { Box, Link, Autocomplete, Button, TextField, MenuItem, Typography, Card, InputLabel, Select, FormControl, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { HowToReg } from '@mui/icons-material';
import choices from '../utils/choices.json';
import AuthContext from '../context/AuthContext';
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { toast } from 'react-toastify'; 

const PasswordReset = () => {

  const { passwordReset, verifiedEmail } = useContext(AuthContext);
  const [email, setEmail ] = useState("")
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    passwordReset(password, password2)
  }

  return (
    <Card
      sx={{
        width: '100%',
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
        Reset Password 
      </Typography>
      <form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <Box mb={2}
                sx={{ display: 'flex', position: 'relative' }}>
                <TextField
                    required
                    autoComplete="new-password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    onChange={e => setPassword(e.target.value)}
                    error={password && password.length < 8} 
                    helperText={password && password.length < 8 ? "Password must be at least 8 characters." : ""}
                />
                <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ position: 'absolute', right: 0, top: 0 }}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </Box>
          </Grid>

        <Grid item xs={12}>
          <Box
              sx={{ display: 'flex', position: 'relative' }}>
              <TextField
                  required
                  autoComplete="new-password" 
                  label="Confirm Password"
                  type={showPassword2 ? 'text' : 'password'}
                  fullWidth
                  onChange={e => setPassword2(e.target.value)}
                  error={password2.length > 0 && password !== password2} 
                  helperText={password2.length > 0 && password !== password2 ? "Passwords do not match." : ""}
              />
              <IconButton onClick={() => setShowPassword2(!showPassword2)} sx={{ position: 'absolute', right: 0, top: 0 }}>
                {showPassword2 ? <VisibilityOff /> : <Visibility />}
              </IconButton>
          </Box>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: '100%',
            height: '40px',
            marginTop: '20px',
            borderRadius: '50px',
            backgroundColor: 'rgb(253, 233, 15)',
            color: 'black',
            '&:hover': {
              backgroundColor: '#FFD700',
            },
          }}
        >
          Reset Password
        </Button>
      </form>
    </Card>
  )
}

export default PasswordReset