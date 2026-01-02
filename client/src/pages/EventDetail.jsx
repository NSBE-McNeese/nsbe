import React, { createContext, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "./AuthContext";
import useAxios from "../utils/useAxios"; 

const EventContext = createContext();
export default EventContext;

export const EventProvider = ({ children }) => {
  const api = useAxios(); 
  const { authTokens } = useContext(AuthContext); // Removed 'user' to reduce re-renders
  
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [isUpcoming, setIsUpcoming] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({}); 

  const [pointsData, setPointsData] = useState({
    total_points: 0,
    events_attended: 0,
    member_posts: [],
    top_members: [],
  });

  const [eventDetail, setEventDetail] = useState(null); // Added state for single event

  // 1. PUBLIC: Fetch Events (Runs once on load, doesn't need auth)
  const fetchEvents = async () => {
    try {
      const response = await api.get(`/events/`);
      if (response.status === 200) {
        setEvents(response.data);
        setFilteredEvents(response.data);
      }
    } catch (error) {
      console.error("Events fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. PRIVATE: Fetch Points (Only runs if logged in)
  const fetchPoints = async () => {
    if (!authTokens) return;
    try {
      const response = await api.get(`/dashboard/`);
      setPointsData(response.data);
    } catch (error) {
      console.error("Points fetch error:", error);
    }
  };

  // 3. SINGLE EVENT: Fetch details by slug
  const fetchEvent = async (slug) => {
    try {
      const response = await api.get(`/events/${slug}/`);
      if (response.status === 200) {
        setEventDetail(response.data);
      }
    } catch (error) {
      console.error("Single event fetch error:", error);
      throw error; // Let the component handle the error UI
    }
  };

  // INITIAL LOAD
  useEffect(() => {
    fetchEvents();
  }, []); // Empty dependency array = runs on mount

  // AUTH STATE CHANGES
  useEffect(() => {
    if (authTokens) {
      fetchPoints();
    }
  }, [authTokens]); // Runs whenever user logs in/out

  // FILTER LOGIC
  useEffect(() => {
    const now = new Date();
    const filtered = events.filter((event) => {
      const endTime = new Date(event.end_time);
      return isUpcoming ? endTime >= now : endTime < now;
    });
    setFilteredEvents(filtered);
  }, [events, isUpcoming]);

  // ATTENDANCE & REGISTRATION LOGIC
  const checkAttendanceStatus = async (slug) => {
    if (!authTokens) return; // Guests can't check status
    try {
      const res = await api.get(`/events/${slug}/attendance/`);
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
      // If 404, just means not registered yet
      setAttendanceStatus((prev) => ({ 
        ...prev, 
        [slug]: { is_registered: false, status: 'not_registered' } 
      }));
    }
  };

  const handleRegistration = async (slug) => {
    if (!authTokens) {
      toast.error("Please log in to register.");
      return;
    }
    try {
      const response = await api.post(`/events/${slug}/attendance/`, {});
      if (response.status === 200 || response.status === 201) {
        toast.success("Registration Successful!");
        await checkAttendanceStatus(slug);
      }
    } catch (error) {
      toast.error("Registration failed.");
    }
  };

  const handleUnregistration = async (slug) => {
    try {
      const response = await api.delete(`/events/${slug}/attendance/`);
      if (response.status === 200) {
        toast.info("Unregistered successfully.");
        setAttendanceStatus((prev) => ({
          ...prev,
          [slug]: { is_registered: false, qr_token: null }
        }));
      }
    } catch (error) {
      toast.error("Unregistration failed.");
    }
  };

  const contextData = {
    loading,
    events,
    filteredEvents,
    isUpcoming,
    setIsUpcoming,
    eventDetail, // Exported state
    fetchEvent,  // Exported function
    checkAttendanceStatus,
    handleRegistration,
    handleUnregistration,
    pointsData,
    fetchPoints,
    attendanceStatus, // Exported status
  };

  return (
    <EventContext.Provider value={contextData}>
      {children}
    </EventContext.Provider>
  );
};