// App.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import HomePage from './components/HomePage';
import PageNotFound from './components/PageNotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './Auth/AuthProvider';
import CollegeDetailsPage from './components/CollegeDetailsPage';
import ProfilePage from './components/ProfilePage';

function App() {
    const { isLoggedIn } = useAuth();

    return (
        <>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/home"
                    element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
                />
                {/* <Route path='/home' element={<HomePage />} /> */}
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/college-details" element={<CollegeDetailsPage />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
}

export default App;
