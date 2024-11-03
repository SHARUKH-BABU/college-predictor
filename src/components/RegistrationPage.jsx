import React, { useState } from 'react';
import axios from 'axios';
import { Slide, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../styles/RegistrationPage.css';

const RegistrationPage = () => {
    const [selectedRole, setSelectedRole] = useState('user');
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [collegeCode, setCollegeCode] = useState("");
    const [collegeName, setCollegeName] = useState("");
    const [collegepassword, setCollegepassword] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [collegeType, setCollegeType] = useState("");
    const [courses, setCourses] = useState("");
    const [coursesFee, setCoursesFee] = useState("");
    const navigate = useNavigate();

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
            const requestData = selectedRole === 'user'
                ? { email, username, password }
                : {
                    collegeCode,
                    collegeName,
                    email,
                    collegepassword,
                    phone: parseInt(phone),
                    city,
                    collegeType,
                    courses: courses.split(','),
                    coursesFee: coursesFee.split(',').map(Number)
                };

            const endpoint = selectedRole === 'user' 
                ? "http://localhost:8081/api/user/register" 
                : "http://localhost:8081/api/admin/register";

            await axios.post(endpoint, requestData);
            notify("Registered Successfully", "success");
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.status === 409) {
                notify("User already exists with this email", "warning");
            } else {
                notify("Error while registering...", "error");
            }
        }
    };

    return (
        <div className="registration-bg d-flex align-items-center justify-content-center">
            <div className="card shadow-lg p-4 rounded registration-card wide-card">
                <h1 className="text-center mb-4 text-primary">REGISTER</h1>
                <div className="d-flex justify-content-center mb-3">
                    <button
                        type="button"
                        className={`btn ${selectedRole === 'user' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                        onClick={() => {
                            setSelectedRole('user');
                            setCollegeCode("");
                            setCollegeName("");
                            setCollegepassword("");
                            setPhone("");
                            setCity("");
                            setCollegeType("");
                            setCourses("");
                            setCoursesFee("");
                        }}
                    >
                        USERS
                    </button>
                    <button
                        type="button"
                        className={`btn ${selectedRole === 'admin' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => {
                            setSelectedRole('admin');
                            setEmail("");
                            setUsername("");
                            setPassword("");
                        }}
                    >
                        ADMINS
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    {selectedRole === 'user' ? (
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
                            <div className="form-group mb-3">
                                <label htmlFor="usernameInput" className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="usernameInput"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
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
                    ) : (
                        <div className="row">
                            <div className="col-md-4 form-group mb-3">
                                <label htmlFor="collegeCodeInput" className="form-label">College Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="collegeCodeInput"
                                    value={collegeCode}
                                    onChange={(e) => setCollegeCode(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label htmlFor="collegeNameInput" className="form-label">College Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="collegeNameInput"
                                    value={collegeName}
                                    onChange={(e) => setCollegeName(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label htmlFor="adminEmailInput" className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="adminEmailInput"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label htmlFor="collegePasswordInput" className="form-label">College Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="collegePasswordInput"
                                    value={collegepassword}
                                    onChange={(e) => setCollegepassword(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label htmlFor="phoneInput" className="form-label">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phoneInput"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label htmlFor="cityInput" className="form-label">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cityInput"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label htmlFor="collegeTypeInput" className="form-label">College Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="collegeTypeInput"
                                    value={collegeType}
                                    onChange={(e) => setCollegeType(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label htmlFor="coursesInput" className="form-label">Courses (comma-separated)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="coursesInput"
                                    value={courses}
                                    onChange={(e) => setCourses(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4 form-group mb-4">
                                <label htmlFor="coursesFeeInput" className="form-label">Courses Fee (comma-separated)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="coursesFeeInput"
                                    value={coursesFee}
                                    onChange={(e) => setCoursesFee(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                    <button type="submit" className="btn btn-success w-100 mb-3">Register</button>
                    <div className="text-center">
                        <button
                            type="button"
                            className="btn btn-link text-decoration-none"
                            onClick={() => navigate("/login")}
                        >
                            Already have an account? Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;
