import React, { createContext, useEffect, useState, useContext, useCallback } from "react";
import { toast } from "react-toastify";
import AuthContext from "./AuthContext";
import useAxios from "../utils/useAxios";

const EventContext = createContext();
export default EventContext;

export const EventProvider = ({ children }) => {
  const api = useAxios();
  const { user, authTokens } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [eventDetail, setEventDetail] = useState(null);
  const [isUpcoming, setIsUpcoming] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});

  const [pointsData, setPointsData] = useState({
    total_points: 0,
    events_attended: 0,
    member_posts: [],
    top_members: [],
  });

  const fetchPoints = async () => {
    try {
      const response = await api.get(`/dashboard/`);
      setPointsData(response.data);
    } catch (error) {
      console.error("Points fetch error:", error);
    }
  };

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

  const fetchEvent = useCallback(async (slug) => {
    try {
      const response = await api.get(`/events/${slug}/`);
      if (response.status === 200) {
        setEventDetail(response.data);
      }
    } catch (error) {
      console.error("Event detail fetch error:", error);
      throw error;
    }
  }, [api]);

  useEffect(() => {
    if (authTokens) {
      fetchEvents();
      fetchPoints();
    }
  }, [authTokens]);

  useEffect(() => {
    const now = new Date();
    const filtered = events.filter((event) => {
      const endTime = new Date(event.end_time);
      return isUpcoming ? endTime >= now : endTime < now;
    });
    setFilteredEvents(filtered);
  }, [events, isUpcoming]);

  const checkAttendanceStatus = useCallback(async (slug) => {
    try {
      const res = await api.get(`/events/${slug}/attendance/`);
      setAttendanceStatus((prev) => ({
        ...prev,
        [slug]: {
          is_registered: res.data.is_registered || false,
          qr_token: res.data.qr_token || null,
          is_approved: res.data.is_approved || res.data.checked_in || false,
          status: res.data.status
            ? res.data.status
            : res.data.checked_in
              ? "checked_in"
              : res.data.is_registered
                ? "pending"
                : "not_registered",
        },
      }));
    } catch (error) {
      if (error.response?.status === 404) {
        setAttendanceStatus((prev) => ({
          ...prev,
          [slug]: { is_registered: false, status: "not_registered" },
        }));
      }
    }
  }, [api]);

  const handleRegistration = useCallback(async (slug) => {
    try {
      const response = await api.post(`/events/${slug}/attendance/`, {});
      if (response.status === 200 || response.status === 201) {
        toast.success("Registration Successful!");
        await checkAttendanceStatus(slug);
      }
    } catch (error) {
      toast.error("Registration failed.");
    }
  }, [api, checkAttendanceStatus]);

  const handleUnregistration = useCallback(async (slug) => {
    try {
      const current = attendanceStatus[slug];
      if (current?.is_approved || current?.status === "checked_in") {
        toast.error("Cannot cancel after approval/check-in.");
        return;
      }

      const response = await api.delete(`/events/${slug}/attendance/`);
      if (response.status === 200) {
        toast.info("Unregistered successfully.");
        setAttendanceStatus((prev) => ({
          ...prev,
          [slug]: { is_registered: false, qr_token: null },
        }));
      }
    } catch (error) {
      toast.error("Unregistration failed.");
    }
  }, [api]);

  const contextData = {
    loading,
    events,
    eventDetail,
    filteredEvents,
    isUpcoming,
    setIsUpcoming,
    attendanceStatus,
    fetchEvent,
    fetchEvents,
    checkAttendanceStatus,
    handleRegistration,
    handleUnregistration,
    pointsData,
    fetchPoints,
  };

  return <EventContext.Provider value={contextData}>{children}</EventContext.Provider>;
};
