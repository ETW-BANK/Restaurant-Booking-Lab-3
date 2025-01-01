import { useRef, useState } from 'react';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
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
           <img src={Pic} alt="" />
            <nav ref={navRef} className={isOpen ? 'responsive_nav' : ''}>
           
                <Link to="/">Home</Link>
                <Link to="/booking">Booing</Link>
                <Link to="/user-list">User List</Link>
                <Link to="/booking-list">Booing List</Link>
                <Link to="/table-list">Table List</Link>

                <button className='nav-close-btn' onClick={toggleNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button className='nav-btn' onClick={toggleNavbar}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>
        </header>
    );
}

export default Navbar;