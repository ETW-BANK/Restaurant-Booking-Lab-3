import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';
import Pic from '../assets/Logo.svg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const user = localStorage.getItem("user");
    const roles = localStorage.getItem("roles");
    const isLoggedIn = user !== null;
    const isAdmin = roles && roles.split(',').includes('Admin');

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("roles");
        localStorage.removeItem("userId");
        navigate("/home");
    };

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header>
            <img src={Pic} alt="Logo" className="navbar-logo" />
            <nav className={isOpen ? 'responsive_nav' : ''}>
                <Link to="/home">Home</Link>

                {isLoggedIn && isAdmin && (
                    <>
                        <Link to="/user-list">User List</Link>
                        <Link to="/admin">Admin</Link>
                        <Link to="/booking-list">Booking List</Link>
                        <Link to="/create-table">Create Table</Link>
                    </>
                )}

                {isLoggedIn ? (
                    <button className="nav-icon" onClick={handleLogout} style={{ color: 'Red', backgroundColor: "transparent", border: "none", fontSize: "16px" }}>
                        <FaSignOutAlt /> Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="nav-icon">
                            <FaSignInAlt /> Login
                        </Link>
                        <Link to="/register" className="nav-icon">
                            <FaUserPlus /> Register
                        </Link>
                    </>
                )}

                <button className="nav-close-btn" onClick={toggleNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button className="nav-btn" onClick={toggleNavbar}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>
        </header>
    );
};

export default Navbar;
