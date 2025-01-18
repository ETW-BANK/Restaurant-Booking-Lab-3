// src/Components/Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the user from localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        localStorage.removeItem("roles");

        // Redirect to login page or home page after logout
        navigate("/login");
    }, [navigate]);

    return null; // No UI to render
};

export default Logout;
