import React, { useState, useContext } from "react";
import { QrReader } from 'react-qr-reader';
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { 
  Container, Box, Typography, Paper, Alert, Button, TextField, Divider 
} from "@mui/material";
import { api } from "../api";

const AdminScanner = () => {
  const { authTokens } = useContext(AuthContext);
  const [scanResult, setScanResult] = useState(null); 
  const [manualCode, setManualCode] = useState("");
  const [isScanning, setIsScanning] = useState(true);

  
  const handleCheckIn = async (token) => {
    // Stop scanning temporarily so we don't spam the API
    setIsScanning(false);

    try {
      const response = await api.post(
        "/check-in/",
        { qr_token: token },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      );
      
      // SUCCESS
      setScanResult({ 
        success: true, 
        message: response.data.message, 
        user: response.data.user,
        points: response.data.points_added 
      });

    } catch (error) {
      // ERROR
      const errorMsg = error.response?.data?.error || "Scan Failed";
      setScanResult({ success: false, message: errorMsg });
    }
  };

  // Handler for Camera Scan
  const onScan = (result, error) => {
    if (!!result && isScanning) {
      handleCheckIn(result?.text);
    }
  };

  // Handler for Manual Input
  const onManualSubmit = (e) => {
    e.preventDefault();
    if(manualCode) handleCheckIn(manualCode);
  };

  const resetScanner = () => {
    setScanResult(null);
    setManualCode("");
    setIsScanning(true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        Event Check-In
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
        
        {/* RESULT AREA */}
        {scanResult ? (
          <Box sx={{ my: 4 }}>
            {scanResult.success ? (
              <Alert severity="success" variant="filled" sx={{ justifyContent: 'center' }}>
                <Typography variant="h6">CHECK-IN SUCCESSFUL</Typography>
                <Typography variant="body1">Welcome, {scanResult.user}!</Typography>
                {scanResult.points > 0 && <Typography variant="caption">Points Added: {scanResult.points}</Typography>}
              </Alert>
            ) : (
              <Alert severity="error" variant="filled" sx={{ justifyContent: 'center' }}>
                <Typography variant="h6">ACCESS DENIED</Typography>
                <Typography variant="body1">{scanResult.message}</Typography>
              </Alert>
            )}

            <Button 
              variant="contained" 
              size="large" 
              onClick={resetScanner} 
              sx={{ mt: 3, bgcolor: '#00205B' }}
            >
              Scan Next Person
            </Button>
          </Box>
        ) : (
          /* SCANNING AREA */
          <>
            <Box sx={{ height: 300, bgcolor: "#000", mb: 3, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
               <QrReader
                  onResult={onScan}
                  constraints={{ facingMode: 'environment' }}
                  style={{ width: '100%' }}
               />
               <Typography sx={{ position: 'absolute', bottom: 10, left: 0, right: 0, color: 'white', zIndex: 10 }}>
                 Point Camera at QR Code
               </Typography>
            </Box>

            <Divider>OR</Divider>
            
            {/* Manual Entry (For testing without camera) */}
            <Box component="form" onSubmit={onManualSubmit} sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <TextField 
                fullWidth 
                label="Enter UUID Manually" 
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                size="small"
              />
              <Button type="submit" variant="outlined">Check In</Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default AdminScanner;