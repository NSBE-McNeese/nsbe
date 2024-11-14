import React, { useContext } from 'react'; 
import AuthContext from '../context/AuthContext';
import { Link } from '@mui/material';

const ProfilePage = () => {
    
    const { user } = useContext(AuthContext);
    return (
        <div>
            <h1>Profile Page 👥</h1><br />
            <form method="post" className="form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        defaultValue={user.email}
                        className="form-control"
                        style={{ width: '250px' }}
                        id="email"
                        placeholder="Enter email"
                        name="email"
                    />
                    <br />
                    <button type="submit" className="btn btn-primary">Update Email</button>
                </div>
                <br />

                <div className="form-group">
                    <label htmlFor="email">Class Standing</label>
                    <input
                        type="text"
                        defaultValue={user.class_standing}
                        className="form-control"
                        style={{ width: '250px' }}
                        placeholder="Enter Class"
                    />
                    <br />
                    <button type="submit" className="btn btn-primary">Update Class Standing</button>
                </div>
                <br />

                <div className="form-group">
                    <label htmlFor="text">Major</label>
                    <input
                        type="text"
                        defaultValue={user.major}
                        className="form-control"
                        style={{ width: '250px' }}
                        placeholder="Enter Class"
                    />
                    <br />
                    <button type="submit" className="btn btn-primary">Update Major</button>
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="text">Password</label>
                  <br />
                  <Link
                    href="/password-reset-request"
                    className="btn btn-primary"
                  >
                      Update Password
                  </Link>
                </div>
                <br />
                <br />
            </form>
        </div>
    );
};

export default ProfilePage;
