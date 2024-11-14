import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Grid, Card, Button, Paper } from '@mui/material';
import EventContext from '../context/EventContext';
import MapComponent from '../components/MapComponent';

const EventDetail = () => {
    const { event_slug } = useParams();
    const navigate = useNavigate(); 
    const {
        eventDetail,
        handleRegistration,
        handleUnregistration,
        fetchEvent,
        isUserRegistered,
    } = useContext(EventContext);


    useEffect(() => {
        fetchEvent(event_slug);
    }, [event_slug, fetchEvent]);

    
    if (!eventDetail) {
        return <Typography></Typography>;
    }

    const userIsRegistered = isUserRegistered[event_slug];
    const currentEventStatus = new Date(eventDetail.start_time) >= new Date();

    return (
        <>
            <Typography variant="h2">{eventDetail.title}</Typography>
            <Card>
                    <Grid item xs={12}>
                        {currentEventStatus && ( 
                            userIsRegistered ? (
                                <Button variant="outlined" color="primary" onClick={() => handleUnregistration(event_slug)}>
                                    Unregister
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" onClick={() => handleRegistration(event_slug)}>
                                    Register
                                </Button>
                            )
                        )}
                    </Grid>
                <Grid container spacing={2} padding={2}>
                    <Grid item xs={12}>
                    <Typography variant="body2">Start: {new Date(eventDetail.start_time).toLocaleString()}</Typography>
                    <Typography variant="body2">Start: {new Date(eventDetail.end_time).toLocaleString()}</Typography>
                    <MapComponent />
                    <Paper
                        elevation={4} 
                        sx={{
                            padding: 2, 
                            borderRadius: 2, 
                            backgroundColor: '#fff', 
                            margin: '20px', 
                            width: '100%', 
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                        }}
                        >
                        <Typography variant="body1" color="textSecondary">
                            {eventDetail.description}
                        </Typography>
                    </Paper>
                    </Grid>
                </Grid>
            </Card>
            <Button
                variant="outlined"
                onClick={() => navigate('/events')} 
                style={{ marginTop: '20px' }} 
            >
                Back to Events
            </Button>
        </>
    );
};

export default EventDetail;
