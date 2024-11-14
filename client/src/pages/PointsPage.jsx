import React, { useEffect, useContext } from 'react';
import EventContext from '../context/EventContext';
import './point_page.css';
import PersonIcon from '@mui/icons-material/Person';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const PointsPage = () => {
    const { pointsData, fetchPoints } = useContext(EventContext);

    useEffect(() => {
        fetchPoints();
    }, [fetchPoints]);

    return (
        <div>
            <h1>Points <EmojiEventsIcon sx ={{fontSize: '2rem' }}></EmojiEventsIcon></h1>
            <div className="allbox">
                <div className="box1">
                    <h2>Total Points Expected</h2>
                    <div className="number">
                        <p style={{ color: 'green' }}>{pointsData.total_points}</p>
                    </div>
                </div>
                <div className="box2">
                    <h2>Total Events Registered</h2>
                    <div className="number">
                        <p style={{ color: 'green' }}>{pointsData.events_attended}</p>
                    </div>
                </div>
            </div>
            <div className="activity">
                <div className="history">
                    <h1 style={{ fontSize: 'larger', textDecoration: 'solid' }}>Event History <span><i className='bx bx-history'></i></span></h1>
                    <div className="containevent">
                        {pointsData.member_posts.map((event, index) => (
                            <div key={index} className="event1">
                                <h2 style={{ color: 'green', fontSize: '35px' }}>+{event.points}</h2>
                                <h2 style={{ color: 'black', fontSize: '15px' }}>
                                    {new Date(event.start_time).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}<br />
                                    You attended {event.title}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="subBody">
                    <div className="table">
                        <section className="table_header">
                            <h1 style={{ fontSize: 'large', textDecoration: 'solid', color: 'green', transform: 'translateY(70%)' }}>Points Ranking</h1>
                        </section>
                        <section className="table_body">
                            <table>
                                <tbody>
                                    {pointsData.top_members.map((member, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <PersonIcon></PersonIcon> {member.first_name} {member.last_name}
                                            </td>
                                            <td style={{ fontSize: 'large', textDecoration: 'solid', color: 'green' }}>{member.pointsum}</td>
                                        </tr>
                                    ))}
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
