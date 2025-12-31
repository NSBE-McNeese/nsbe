import React, { createContext, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AuthContext from "./AuthContext";
import { jwtDecode } from "jwt-decode";

const EventContext = createContext();
export default EventContext;

const baseURL = "http://127.0.0.1:8000/api";

export const EventProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [isUpcoming, setIsUpcoming] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState([]);
  
  const [isUserRegistered, setIsUserRegistered] = useState({});
  const [attendanceStatus, setAttendanceStatus] = useState({}); 

  const [userID, setUserID] = useState();
  const { authTokens } = useContext(AuthContext);
  
  const [pointsData, setPointsData] = useState({
    total_points: 0,
    events_attended: 0,
    member_posts: [],
    top_members: [],
  });

  // Setup & Utils
  useEffect(() => {
    if (authTokens) {
      const decoded = jwtDecode(authTokens.access);
      setUserID(decoded.user_id);
    }
  }, [authTokens]);

  const fetchPoints = async () => {
    try {
      const response = await axios.get(`${baseURL}/points/`, {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });
      setPointsData(response.data);
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  };

  // Fetch Events List
  useEffect(() => {
    fetchEvents();
  }, [authTokens, userID]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${baseURL}/events/`, {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });

      if (response.status === 200) {
        setEvents(response.data);
        setFilteredEvents(response.data);

        // Map registration status using SLUG
        const registrationMap = {};
        for (const event of response.data) {
          registrationMap[event.slug] = userID ? event.attendees.includes(userID) : false;
        }
        setIsUserRegistered(registrationMap);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter Logic
  useEffect(() => {
    if (isUpcoming) {
      setFilteredEvents(events.filter((event) => new Date(event.end_time) >= new Date()));
    } else {
      setFilteredEvents(events.filter((event) => new Date(event.end_time) < new Date()));
    }
  }, [events, isUpcoming]);


  // Check Status
  const checkAttendanceStatus = async (slug) => {
  try {
    const res = await axios.get(`${baseURL}/events/${slug}/attendance/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    });
    
    setAttendanceStatus((prev) => ({ 
      ...prev, 
      [slug]: {
        is_registered: res.data.is_registered || false,
        qr_token: res.data.qr_token || null,
        is_approved: res.data.is_approved || false, 
        status: res.data.status || 'pending' 
      }
    }));
  } catch (error) {
    if (error.response && error.response.status === 404) {
      setAttendanceStatus((prev) => ({ 
        ...prev, 
        [slug]: { 
          is_registered: false, 
          qr_token: null, 
          is_approved: false,
          status: 'not_registered'
        } 
      }));
    }
  }
};
  // Register
  const handleRegistration = async (slug) => {
    try {
      const response = await axios.post(`${baseURL}/events/${slug}/attendance/`, {}, {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Registration Successful!");
        setAttendanceStatus((prev) => ({
          ...prev,
          [slug]: { is_registered: true, qr_token: response.data.qr_token }
        }));
        setIsUserRegistered((prev) => ({ ...prev, [slug]: true }));
      }
    } catch (error) {
      toast.error("Registration failed.");
    }
  };

  // Unregister
  const handleUnregistration = async (slug) => {
    try {
      const response = await axios.delete(`${baseURL}/events/${slug}/attendance/`, {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });

      if (response.status === 200) {
        toast.info("Unregistered successfully.");
        setAttendanceStatus((prev) => ({
          ...prev,
          [slug]: { is_registered: false, qr_token: null }
        }));
        setIsUserRegistered((prev) => ({ ...prev, [slug]: false }));
      }
    } catch (error) {
      toast.error("Unregistration failed.");
    }
  };

  // Single Event Fetch
  const [eventDetail, setEventDetail] = useState(null);
  
  const fetchEvent = async (event_slug) => {
    try {
      const response = await axios.get(`${baseURL}/events/${event_slug}/`, {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });

      if (response.status === 200) {
        setEventDetail(response.data);
        // Use the slug we just fetched (or the one passed in)
        if(response.data?.slug) {
          checkAttendanceStatus(response.data.slug);
        }
      }
    } catch (error) {
      console.log("Event fetch error:", error.message);
    }
  };

  const contextData = {
    loading,
    events,
    filteredEvents,
    isUpcoming,
    setIsUpcoming,
    eventDetail,
    fetchEvent,
    isUserRegistered,
    attendanceStatus,
    handleRegistration,
    handleUnregistration,
    pointsData,
    fetchPoints,
  };

  return (
    <EventContext.Provider value={contextData}>
      {loading ? <div>Loading...</div> : children}
    </EventContext.Provider>
  );
};