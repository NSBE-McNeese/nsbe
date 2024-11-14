import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import EventContext from '../context/EventContext';
import './HomePage.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const { pointsData } = useContext(EventContext);

  return (
    <div className="homepage-wrapper">
      {user ? (
        <>
          <h1>Hey, {user.first_name} 👋</h1>
          <div className="content_container">
            <div className="content_left">
              <div>
                <h3 style={{ fontSize: 'larger', textDecoration: 'solid', color: 'rgb(10, 1, 18)' }}>Active Status</h3>
                <p style={{ color: 'rgb(157, 157, 157)' }}>
                  You are considered active in a week if you have either sent a message or participated in NSBE
                  concessions or activities.
                </p>

                <div className="content_left_top_bottom">
                  <div>
                    <p style={{ fontSize: 'medium', textDecoration: 'solid', color: 'rgb(10, 1, 18)' }}>
                      This Week 
                    </p>
                    <ul>
                      <li style={{ color: 'rgba(255, 0, 0, 0.795)' }}>
                        <p style={{ fontSize: 'large', textDecoration: 'solid' }}>Inactive</p>
                      </li>
                    </ul>
                  </div>

                  <div style={{ borderLeft: '1px solid rgb(157, 157, 157)' }}>
                    <p style={{ fontSize: 'medium', textDecoration: 'solid', color: 'rgb(10, 1, 18)' }}>Last 16 Weeks 📅</p>
                    <ul>
                      <li style={{ color: 'rgba(255, 0, 0, 0.795)' }}>
                        <p style={{ fontSize: 'large', textDecoration: 'solid' }}>Inactive</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <span className="content_left_mid">
                <div>
                  <h3 style={{ fontSize: '20px', textDecoration: 'solid', color: 'rgb(10, 1, 18)' }}>Member ID</h3>
                  <h1 style={{ color: 'rgb(10, 1, 18)' }}>0003780</h1>
                </div>

                <div>
                  <h3 style={{ fontSize: '20px', textDecoration: 'solid', color: 'rgb(10, 1, 18)' }}>Total Members</h3>
                  <h1 style={{ color: 'rgb(10, 1, 18)' }}>900</h1>
                </div>
              </span>

              <span className="content_left_mid">
                <div>
                  <h3 style={{ fontSize: '20px', textDecoration: 'solid', color: 'rgb(10, 1, 18)' }}>Events Attended</h3>
                  <h1 style={{ color: 'rgb(10, 1, 18)' }}>{pointsData.events_attended}</h1>
                </div>

                <div>
                  <h3 style={{ fontSize: '20px', textDecoration: 'solid', color: 'rgb(10, 1, 18)' }}>Points Earned</h3>
                  <h1 style={{ color: 'rgb(10, 1, 18)' }}>{pointsData.total_points}</h1>
                </div>
              </span>

              <div className="content_left_mid_bottom">
                <h3 style={{ fontSize: 'medium', textDecoration: 'solid', color: 'rgb(10, 1, 18)' }}>Activation</h3>
                <p style={{ color: 'rgb(157, 157, 157)' }}>
                  You are considered activated when you have completed the following checklists.
                </p>
                <ul>
                  <li>
                    <p style={{ fontSize: 'large', textDecoration: 'solid' }}>Inactive</p>
                  </li>
                </ul>
                <a href="/profile">View Profile</a>
              </div>
            </div>

            <div className="content_right">
              <div className="content_right_top">
                <h3 style={{ fontSize: 'larger', textDecoration: 'solid', color: 'rgb(10, 1, 18)' }}>Important Resources</h3>
                <a href="https://www.nsbe.org/" target="_blank" rel="noopener noreferrer">NSBE</a>
                <p style={{ color: 'rgb(157, 157, 157)' }}>The heartbeat of our community.</p>
                
                <a href="/path/to/nationalbylaws" target="_blank">NSBE National Bye-Laws</a>
                <p style={{ color: 'rgb(157, 157, 157)' }}>A collection of resources.</p>
                
                <a href="/path/to/regionvbylaws" target="_blank">RegionV Chapter Bye-Laws</a>
                <p style={{ color: 'rgb(157, 157, 157)' }}>A collection of resources.</p>

                <a href="#">Code of Conduct</a>
                <p style={{ color: 'rgb(157, 157, 157)' }}>Abide to our Code of Conduct.</p>
              </div>

              <div className="content_right_socials">
                <h3 style={{ fontSize: 'larger', textDecoration: 'solid', color: 'rgb(10, 1, 18)' }}>Social Media</h3>
                <LinkedInIcon />
                <InstagramIcon />
                <EmailIcon />
              </div>

              <div style={{ height: '30%' }}>
                <h1 style={{ marginBottom: '15px', fontWeight: '500' }}>Mission Statement</h1>
                <p style={{ fontSize: 'large', textDecoration: 'solid', color: 'black', fontWeight: '400' }}>
                  The mission of the National Society of Black Engineers is to{' '}
                  <span style={{ color: 'black' }}>increase</span> the number of culturally responsible Black Engineers
                  who excel academically, succeed professionally, and positively impact the community.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Not signed in.</p>
      )}
    </div>
  );
};

export default HomePage;
