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
  const [userID, setUserID] = useState();
  const { authTokens } = useContext(AuthContext);
  const [pointsData, setPointsData] = useState({
    total_points: 0,
    events_attended: 0,
    member_posts: [],
    top_members: [],
  });

  // Fetch points data
  const fetchPoints = async () => {
    try {
      const response = await axios.get(`${baseURL}/points/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      setPointsData(response.data);
    } catch (error) {
      console.error("Error fetching points data:", error);
    }
  };

  // Set userID
  useEffect(() => {
    if (authTokens) {
      const decoded = jwtDecode(authTokens.access);
      setUserID(decoded.user_id);
    }
  }, [authTokens]);

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${baseURL}/events/`, {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });

        if (response.status === 200) {
          setEvents(response.data);
          setFilteredEvents(response.data);

          // Initialize registration
          const registrationStatus = {};
          for (const event of response.data) {
            // Set the status based on whether the user is an attendee
            registrationStatus[event.slug] = userID
              ? event.attendees.includes(userID)
              : false;
          }

          setIsUserRegistered(registrationStatus);
          console.log(registrationStatus);
        } else {
          console.log("Events not found");
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [authTokens, userID]);

  // Filter events: Upcoming vs Past
  useEffect(() => {
    if (authTokens) {
      const decoded = jwtDecode(authTokens.access);
      setUserID(decoded.user_id);
    }

    if (isUpcoming) {
      setFilteredEvents(
        events.filter((event) => new Date(event.end_time) >= new Date()),
      );
    } else {
      setFilteredEvents(
        events.filter((event) => new Date(event.end_time) < new Date()),
      );
    }
  }, [authTokens, events, isUpcoming]);

  // Register a user to an event
  const handleRegistration = async (event_slug) => {
    try {
      const response = await axios.post(
        `${baseURL}/events/${event_slug}/register/`,
        null,
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        },
      );

      if (response.status === 200) {
        console.log(response.data.message);
        toast.success(response.data.message);
        setIsUserRegistered((prev) => ({ ...prev, [event_slug]: true }));
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("User is already registered.");
        toast.error("You are already registered to this event.");
      } else {
        console.error("Error during registration:", error.message);
        toast.error("Registration failed.");
      }
    }
  };

  // Unregister a user to an event
  const handleUnregistration = async (event_slug) => {
    try {
      const response = await axios.post(
        `${baseURL}/events/${event_slug}/unregister/`,
        null,
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        },
      );

      if (response.status === 200) {
        console.log(response.data.message);
        toast.success(response.data.message);
        setIsUserRegistered((prev) => ({ ...prev, [event_slug]: false }));
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("User is not registered.");
        toast.error("You are not registered to this event.");
      } else {
        console.error("Error during unregistration:", error.message);
        toast.error("Unregistration failed.");
      }
    }
  };

  // Fetch a single event
  const [eventDetail, setEventDetail] = useState(null);
  const fetchEvent = async (event_slug) => {
    try {
      const response = await axios.get(`${baseURL}/events/${event_slug}/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      if (response.status === 200) {
        setEventDetail(response.data);
      } else {
        console.log("Event not found");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const contextData = {
    events,
    filteredEvents,
    isUpcoming,
    setIsUpcoming,
    handleRegistration,
    handleUnregistration,
    isUserRegistered,
    eventDetail,
    fetchEvent,
    pointsData,
    fetchPoints,
  };

  return (
    <EventContext.Provider value={contextData}>
      {loading ? <div>Loading...</div> : children}
    </EventContext.Provider>
  );
};
