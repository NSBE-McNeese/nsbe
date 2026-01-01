import React, { useEffect, useContext, useState } from "react";
import EventContext from "../context/EventContext";
import "./point_page.css";

// Material UI Icons
import PersonIcon from "@mui/icons-material/Person";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const PointsPage = () => {
  const { pointsData, fetchPoints } = useContext(EventContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await fetchPoints();
      setIsLoading(false);
    };

    loadData();
  }, [fetchPoints]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading your points...</p>
      </div>
    );
  }

  return (
    <div className="points-container">
      <header className="points-header">
        <h1>
          Points <EmojiEventsIcon sx={{ fontSize: "2.5rem", color: "#FFD700" }} />
        </h1>
      </header>

      {/* Stats Boxes */}
      <div className="stats-box-container">
        <div className="stat-card">
          <h2>Total Points Earned</h2>
          <div className="stat-number">
            <p className="green-text">{pointsData.total_points}</p>
          </div>
        </div>

        <div className="stat-card">
          <h2>Events Attended</h2>
          <div className="stat-number">
            <p className="green-text">{pointsData.events_attended}</p>
          </div>
        </div>
      </div>

      <div className="activity-section">
        {/* Left Column: Event History */}
        <div className="history-column">
          <h2 className="section-title">
            Event History <i className="bx bx-history"></i>
          </h2>

          <div className="event-list">
            {pointsData.member_posts && pointsData.member_posts.length > 0 ? (
              pointsData.member_posts.map((event, index) => (
                <div key={index} className="event-item">
                  <div className="event-points">+{event.points}</div>
                  <div className="event-details">
                    <span className="event-date">
                      {new Date(event.start_time).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <p className="event-title">
                      Attended <strong>{event.title}</strong>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data-box">
                <p>You haven't checked into any events yet.</p>
                <small>Attend events and scan your QR code to earn points!</small>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Leaderboard */}
        <div className="leaderboard-column">
          <div className="table-container">
            <section className="table-header">
              <h2 className="section-title green-text">Top Members</h2>
            </section>

            <section className="table-body">
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Member</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {pointsData.top_members && pointsData.top_members.length > 0 ? (
                    pointsData.top_members.map((member, index) => (
                      <tr key={index} className={index < 3 ? "top-three" : ""}>
                        <td>{index + 1}</td>
                        <td className="member-name">
                          <PersonIcon
                            sx={{ fontSize: "1.2rem", marginRight: "5px", color: "#666" }}
                          />
                          {member.first_name} {member.last_name}
                        </td>
                        <td className="points-cell">{member.pointsum}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        No rankings available yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsPage;
