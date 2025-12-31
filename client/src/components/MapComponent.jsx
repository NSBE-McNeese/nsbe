import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// 1. FIX: Add { lat, lng } inside the parentheses to accept them as props
const MapComponent = ({ lat, lng }) => {
  
  const defaultCenter = { lat: 30.1792816, lng: -93.2142449 };

  // Now 'lat' and 'lng' exist, so this line will work
  const center = (lat && lng) ? { lat: parseFloat(lat), lng: parseFloat(lng) } : defaultCenter;

  const containerStyle = {
    width: "100%", // 2. FIX: changed "1oo%" to "100%"
    height: "300px",
    marginTop: "15px",
    borderRadius: "8px"
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15.5}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;