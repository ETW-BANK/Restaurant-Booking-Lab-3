import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        let user = null;
        try {
            user = localStorage.getItem("user"); // Safely access localStorage
        } catch (e) {
            console.error("Error accessing localStorage:", e);
            setError("Unable to access localStorage. Please check your browser settings.");
            return;
        }

        if (!user) {
            navigate("/login"); // Redirect to login if no user found
            return;
        }

        fetch(`https://localhost:7090/api/Account/home/${user}`, {
            method: "GET",
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user info");
                }
                return response.json();
            })
            .then((data) => {
                setUserInfo(data.result);
                console.log("User info:", data.result);
            })
            .catch((error) => {
                console.error("Error fetching user info:", error);
                setError("Failed to load user info. Please try again later.");
            });
    }, [navigate]);

    const handleBookingClick = () => {
        navigate("/booking");
    };

    return (
        <div className="home-container">
            <div className="home-banner-container">
                <div className="home-text-section">
                    <h1 className="primary-heading">
                        Welcome to
                        <br />
                        <span>Green Restaurant</span>
                    </h1>
                    <button className="secondary-button" onClick={handleBookingClick}>
                        Book Your Table Now
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Home;
