import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import "../styles/HomePage.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider'; // Import useAuth to access user information

const HomePage = () => {
    const [colleges, setColleges] = useState([]);
    const [filteredColleges, setFilteredColleges] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('null');
    const [selectedCourse, setSelectedCourse] = useState('null');
    const [selectedCollegeType, setSelectedCollegeType] = useState('null');
    const navigate = useNavigate();
    const { user } = useAuth(); // Access user information from AuthProvider

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/admin/colleges');
                setColleges(response.data);
                setFilteredColleges(response.data);
            } catch (error) {
                console.error("Error retrieving colleges data:", error);
            }
        };
        fetchColleges();
    }, []);

    const handleCollegeClick = (college) => {
        navigate("/college-details", { state: { college } });
    };

    const handleProfileClick = () => {
        navigate("/profile", { state: { useremail: user.email } }); // Correctly pass user email in state
    };
    

    const handleLocationChange = (event) => {
        const value = event.target.value;
        setSelectedLocation(value);
        filterColleges(value, selectedCourse, selectedCollegeType);
    };

    const handleCourseChange = (event) => {
        const value = event.target.value;
        setSelectedCourse(value);
        filterColleges(selectedLocation, value, selectedCollegeType);
    };

    const handleCollegeTypeChange = (event) => {
        const value = event.target.value;
        setSelectedCollegeType(value);
        filterColleges(selectedLocation, selectedCourse, value);
    };

    const filterColleges = (location, course, collegeType) => {
        let filtered = colleges;
        if (location !== 'null') {
            filtered = filtered.filter(college => college.city === location);
        }
        if (course !== 'null') {
            filtered = filtered.filter(college => college.courses.includes(course));
        }
        if (collegeType !== 'null') {
            filtered = filtered.filter(college => college.collegeType === collegeType);
        }
        setFilteredColleges(filtered);
    };

    const removeFilters = () => {
        setSelectedLocation('null');
        setSelectedCourse('null');
        setSelectedCollegeType('null');
        setFilteredColleges(colleges);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid p-2">
                    <a className="navbar-brand mx-5" href="#">College Finder</a>
                    <form className="d-flex mx-auto">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search for colleges"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-primary" type="submit">Search</button>
                    </form>
                    <div className="profile-icon mx-5" onClick={handleProfileClick}>
                        <FaUserCircle size={30} />
                        {user && <span className="mx-2">{user.email}</span>}{/* Display user's email ID */}
                    </div>
                </div>
            </nav>
            <div className="container mt-5">
                <h1 className="mb-4">Colleges</h1>
                <div className="row">
                    <div className="col-md-3">
                        <div className="sidebar p-4 bg-light">
                            <h5>Filters</h5>
                            <div className="form-group mt-3">
                                <label>Location</label>
                                <select 
                                    name="location" 
                                    id="location" 
                                    className="form-control"
                                    value={selectedLocation}
                                    onChange={handleLocationChange}
                                >
                                    <option value="null">Select</option>
                                    {[...new Set(colleges.map((college) => college.city))].map((city, index) => (
                                        <option key={index} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group mt-3">
                                <label>College Type</label>
                                <select 
                                    name="collegeType" 
                                    id="collegeType" 
                                    className="form-control"
                                    value={selectedCollegeType}
                                    onChange={handleCollegeTypeChange}
                                >
                                    <option value="null">Select</option>
                                    {[...new Set(colleges.map((college) => college.collegeType))].map((type, index) => (
                                        <option key={index} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group mt-3">
                                <label>Course</label>
                                <select 
                                    name="course" 
                                    id="course" 
                                    className="form-control"
                                    value={selectedCourse}
                                    onChange={handleCourseChange}
                                >
                                    <option value="null">Select</option>
                                    {selectedLocation !== 'null' &&
                                        [...new Set(colleges.filter(college => college.city === selectedLocation).flatMap((college) => college.courses))].map((course, index) => (
                                            <option key={index} value={course}>
                                                {course}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <button className="btn btn-danger w-100 mt-3" onClick={removeFilters}>Remove Filters</button>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="college-list">
                            {filteredColleges.map((college) => (
                                <div
                                    key={college.collegeCode}
                                    className="college-card mb-3 p-3 shadow-sm border rounded"
                                    onClick={() => handleCollegeClick(college)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <h3>{college.collegeName}</h3>
                                    <p><strong>City:</strong> {college.city}</p>
                                    <p><strong>Type:</strong> {college.collegeType}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
