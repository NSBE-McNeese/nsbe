import React, {useContext, useState} from 'react';
import { Box, Link, Autocomplete, Button, TextField, Typography, Card, Grid } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import choices from '../utils/choices.json';
import AuthContext from '../context/AuthContext';
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import PersonIcon from '@mui/icons-material/Person';

const {majors, class_standings} = choices;

const RegisterPage = () => {

    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [major, setMajor] = useState("")
    const [class_standing, setClassStanding] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const {registerUser} = useContext(AuthContext)

    const handleSubmit = async e => {
      e.preventDefault()
      registerUser(first_name, last_name, major, class_standing, email, password, password2)

    }

    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)

    const isError = email.length > 0 && 
                  email.indexOf('@') > -1 && 
                  email.indexOf('.') > -1 && 
                  !email.endsWith('@mcneese.edu');

  return (
    <Card 
      sx={{
        width: '100%',
        maxWidth: '600px',
        padding: '20px',
        borderRadius: '3px',
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        marginTop: '10vh',
        opacity: 0.95
      }}
    >
      <Typography 
        variant="h1" 
        align="center"
        fontSize='36px' 
        gutterBottom
        >
        Sign Up 
        <HowToRegIcon />
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <TextField
                required
                fullWidth
                name="first_name"
                label="First Name"
                onChange={e => setFirstName(e.target.value)}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <TextField
                required
                fullWidth
                name="last_name"
                label="Last Name"
                onChange={e => setLastName(e.target.value)}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <Autocomplete
                options={class_standings}
                name="class_standing"
                required
                autoComplete
                renderInput={(params) => <TextField {...params} label="Class Standing" />}
                inputValue={class_standing}
                onInputChange={(e,v) => setClassStanding(v)}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <Autocomplete
                options={majors}
                name="major"
                autoComplete
                required
                // autoSelect
                renderInput={(params) => <TextField {...params} label="Major" />}
                inputValue={major}
                onInputChange={(e,v) => setMajor(v)}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box mb={2} sx={{ display: 'flex', position: 'relative' }}>
              <TextField
                required
                fullWidth
                label="McNeese Email"
                name="email"
                type="email"
                onChange={e => setEmail(e.target.value)}
                error={isError}
                helperText={ isError ? "Email Must End in @mcneese.edu!" : ""}
              />
              <IconButton sx={{ position: 'absolute', right: 0, top: 0 }}>
                <PersonIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
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
          Sign Up
        </Button>

        <Typography
          variant="body2"
          align="center"
          sx={{
            marginTop: '15px',
          }}
        >
          Already have an account?{' '}
          <Link href="/login" underline="hover">
            Login
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
            New Password
          </Link>
        </Typography>
      </form>
    </Card>
  );
};

export default RegisterPage;
