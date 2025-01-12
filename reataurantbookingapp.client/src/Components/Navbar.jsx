import { useRef, useState, useEffect } from 'react';
import './Navbar.css';
import { FaBars, FaTimes, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom';
import Pic from '../assets/Logo.svg';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navRef = useRef();
    const navigate = useNavigate();

   
    useEffect(() => {
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user); 
    }, []);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch("https://localhost:7090/api/Account/logout", {
                method: "GET",
                credentials: "include"
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.removeItem("user"); 
                setIsLoggedIn(false); 
                alert(data.message); 
                navigate("/"); 
            } else {
                console.error("Could not log out");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const handleLoginSuccess = (user) => {
       
        localStorage.setItem('user', JSON.stringify(user)); 
        setIsLoggedIn(true); 
        navigate("/"); 
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
                <Link to="/admin">List Of Admins</Link>
                <button className="nav-close-btn" onClick={toggleNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <div className="nav-icons">
                {!isLoggedIn ? (
                    <>
                        <Link to="/login" className="nav-icon">
                            <FaSignInAlt /> Login
                        </Link>
                        <Link to="/register" className="nav-icon">
                            <FaUserPlus /> Register
                        </Link>
                    </>
                ) : (
                    <button className="nav-icon" onClick={handleLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                )}
            </div>
            <button className="nav-btn" onClick={toggleNavbar}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>
        </header>
    );
}

export default Navbar;
