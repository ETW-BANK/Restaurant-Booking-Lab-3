import { useRef, useState } from 'react';
import './Navbar.css';
import { FaBars, FaTimes, FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // Correctly importing the icons
import { Link } from 'react-router-dom';
import Pic from '../assets/Logo.svg';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header>
            <img src={Pic} alt="Logo" className="navbar-logo" />
            <nav ref={navRef} className={isOpen ? 'responsive_nav' : ''}>
                <Link to="/">Home</Link>
                <Link to="/booking">Booking</Link>
                <Link to="/user-list">User List</Link>
                <Link to="/booking-list">Booking List</Link>
                <Link to="/table-list">Table List</Link>
                <Link to="/admin">List Of admins</Link>
                <button className="nav-close-btn" onClick={toggleNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <div className="nav-icons">
                <Link to="/login" className="nav-icon">
                    <FaSignInAlt /> Login
                </Link>
                <Link to="/register" className="nav-icon">
                    <FaUserPlus /> Register
                </Link>
            </div>
            <button className="nav-btn" onClick={toggleNavbar}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>
        </header>
    );
}

export default Navbar;
