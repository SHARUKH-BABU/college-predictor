// CollegeDetailsPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const CollegeDetailsPage = () => {
    const location = useLocation();
    const college = location.state?.college;

    if (!college) return <p>No college details available.</p>;

    return (
        <div className="container mt-5">
            <h1 className='text-center'>{college.collegeName}</h1>
            <p><strong>City:</strong> {college.city}</p>
            <p><strong>Type:</strong> {college.collegeType}</p>

            <h3>Courses Offered and Fees</h3>
            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Fee</th>
                    </tr>
                </thead>
                <tbody>
                    {college.courses && college.courses.length > 0 ? (
                        college.courses.map((course, index) => (
                            <tr key={index}>
                                <td>{course}</td>
                                <td>{college.coursesFee[index] || "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No courses available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CollegeDetailsPage;
