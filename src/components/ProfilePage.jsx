import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState({ email: '', username: '', password: '' });
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const fetchUserData = async () => {
            const userEmail = location.state?.useremail; // Get user email from the state
            if (!userEmail) {
                console.error("No user email provided");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8081/api/user/${userEmail}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [location]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            alert("before update")
            const response = await axios.put(`http://localhost:8081/api/user/${user.email}`, user);
            alert("Profile updated successfully: " + response.data.username);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mt-5">
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                        readOnly
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Profile</button>
            </form>
        </div>
    );
};

export default ProfilePage;
