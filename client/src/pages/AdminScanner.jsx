import React, { useState, useContext } from "react";
import { QrReader } from "react-qr-reader";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import {
  Container,
  Box,
  Typography,
  Paper,
  Alert,
  Button,
  TextField,
  Divider,
  CircularProgress,
} from "@mui/material";

const AdminScanner = () => {
  const api = useAxios();
  const { authTokens } = useContext(AuthContext);
  const [scanResult, setScanResult] = useState(null);
  const [manualCode, setManualCode] = useState("");
  const [isScanning, setIsScanning] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async (token) => {
    if (!token) return;
    setIsScanning(false);
    setLoading(true);

    try {
      const response = await api.post("/check-in/", { qr_token: token });

      setScanResult({
        success: true,
        message: response.data.message || "Check-in successful",
        user: response.data.user || "Member",
        points: response.data.points_added || 0,
      });
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Invalid Token or System Error";
      setScanResult({ success: false, message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const onScan = (result, error) => {
    if (result && isScanning) {
      handleCheckIn(result.text);
    }
  };

  const onManualSubmit = (e) => {
    e.preventDefault();
    handleCheckIn(manualCode);
  };

  const resetScanner = () => {
    setScanResult(null);
    setManualCode("");
    setIsScanning(true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom color="#00205B">
        Admin Event Check-In
      </Typography>

      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
        {loading && <CircularProgress sx={{ mb: 2 }} />}

        {scanResult ? (
          <Box sx={{ my: 2 }}>
            <Alert
              severity={scanResult.success ? "success" : "error"}
              variant="filled"
              sx={{ py: 2, borderRadius: 2, "& .MuiAlert-message": { width: "100%" } }}
            >
              <Typography variant="h6" fontWeight="bold">
                {scanResult.success ? "SUCCESSFUL" : "FAILED"}
              </Typography>
              <Typography variant="body1">{scanResult.message}</Typography>
              {scanResult.user && (
                <Typography variant="subtitle2">Member: {scanResult.user}</Typography>
              )}
            </Alert>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={resetScanner}
              sx={{ mt: 4, bgcolor: "#00205B", py: 1.5, fontWeight: "bold" }}
            >
              Scan Next
            </Button>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                width: "100%",
                bgcolor: "#000",
                mb: 3,
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                aspectRatio: "1/1",
              }}
            >
              <QrReader
                onResult={onScan}
                constraints={{ facingMode: "environment" }}
                containerStyle={{ width: "100%" }}
                videoStyle={{ width: "100%", height: "100%" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: "white",
                  py: 1,
                  zIndex: 10,
                }}
              >
                <Typography variant="caption">Align QR Code within frame</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }}>OR MANUAL ENTRY</Divider>

            <Box component="form" onSubmit={onManualSubmit} sx={{ mt: 2, display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                label="Member UUID"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                variant="outlined"
              />
              <Button type="submit" variant="contained" sx={{ bgcolor: "#00205B" }}>
                Go
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default AdminScanner;
