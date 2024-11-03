import React, { useState } from 'react';
import axios from 'axios';
import { Slide, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "../styles/LoginPage.css";
import { useAuth } from "../Auth/AuthProvider";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [collegeCode, setCollegeCode] = useState("");
    const [collegepassword, setCollegepassword] = useState("");
    const [selectedRole, setSelectedRole] = useState("user"); 

    const navigate = useNavigate();
    const { setIsLoggedIn, setUser } = useAuth(); // Added setUser here

    const notify = (message, type) => {
        const options = {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: Slide,
        };
        type === "success" ? toast.success(message, options) :
        type === "warning" ? toast.warning(message, options) :
        toast.error(message, options);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedRole === 'user') {
                const response = await axios.post("http://localhost:8081/api/user/login", { email, password });
                if (response.status === 200) {
                    notify("Login successful", "success");
                    setIsLoggedIn(true);
                    setUser({ email }); // Set the user email here
                    navigate("/home");
                } else {
                    notify("Invalid credentials", "warning");
                }
            } else {
                const response = await axios.post("http://localhost:8081/api/admin/login", { collegeCode, collegepassword });
                if (response.status === 200) {
                    notify("Login successful", "success");
                    setIsLoggedIn(true);
                    setUser({ email: collegeCode }); // Set admin email or identifier here
                    navigate("/home");
                } else {
                    notify("Invalid credentials", "warning");
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                notify("User not found", "warning");
            } else if (error.response && error.response.status === 401) {
                notify("Invalid credentials", "warning");
            } else {
                notify("Error while logging in...", "error");
            }
        }
    };

    return (
        <div className="login-bg d-flex align-items-center justify-content-center">
            <div className="card shadow-lg p-4 rounded login-card">
                <h1 className="text-center mb-4 text-primary">LOGIN</h1>
                <div className="d-flex justify-content-center mb-3">
                    <button
                        type="button"
                        className={`btn ${selectedRole === 'user' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                        onClick={() => {
                            setSelectedRole('user');
                            setEmail("");
                            setPassword("");
                            setCollegeCode("");
                            setCollegepassword("");
                        }}
                    >
                        USERS
                    </button>
                    <button
                        type="button"
                        className={`btn ${selectedRole === 'admin' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => {
                            setSelectedRole('admin');
                            setCollegeCode("");
                            setCollegepassword("");
                        }}
                    >
                        ADMINS
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    {selectedRole === 'admin' ? (
                        <>
                            <div className="form-group mb-3">
                                <label htmlFor="collegeCodeInput" className="form-label">College Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="collegeCodeInput"
                                    value={collegeCode}
                                    onChange={(e) => setCollegeCode(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="collegePasswordInput" className="form-label">College Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="collegePasswordInput"
                                    value={collegepassword}
                                    onChange={(e) => setCollegepassword(e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="form-group mb-3">
                                <label htmlFor="emailInput" className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="emailInput"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="passwordInput" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="passwordInput"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </>
                    )}
                    <button type="submit" className="btn btn-success w-100 mb-3">Log In</button>
                    <div className="text-center">
                        <button
                            type="button"
                            className="btn btn-link text-decoration-none"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>
                        <span> | </span>
                        <button
                            type="button"
                            className="btn btn-link text-decoration-none"
                            onClick={() => navigate("/forgot-password")}
                        >
                            Forgot Password?
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
