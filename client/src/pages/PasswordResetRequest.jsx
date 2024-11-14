import React, { useContext, useState, useEffect } from 'react';
import { Button, Typography, Card, TextField, Box, Grid } from '@mui/material';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify'; 

const PasswordResetRequest = () => {
    const { user, passwordResetRequest, setVerifiedUserEmail } = useContext(AuthContext);
    const [email, setEmail] = useState(user ? user.email : "");

    useEffect(() => {
        if (user) {
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await passwordResetRequest(email);
        setVerifiedUserEmail(email);
    };

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
                Request a Password Change
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid item xs={12}>
                    <Box mb={2}>
                        <TextField
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
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
                    Request Password Change
                </Button>
            </form>
        </Card>
    );
}

export default PasswordResetRequest;
