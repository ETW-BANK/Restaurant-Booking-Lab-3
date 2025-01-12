import React, { useEffect, useState } from 'react';
import Sidepic from '../assets/bg-hero.jpg';
import { Link } from 'react-router-dom';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Login";

        try {
            const user = localStorage.getItem("user");
            if (user) {
                document.location = "/";
            }
        } catch (error) {
            console.error("localStorage access denied:", error);
        }
    }, []);


    const LoginHandler = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const dataTosend = {};

        formData.forEach((value, key) => {
            if (key === "email") {
                dataTosend["Email"] = value;
            } else {
                dataTosend[key] = value;
            }
        });

        if (dataTosend.Remember === "on") {
            dataTosend.Remember = true;
        }

        setLoading(true);

        try {
            const response = await fetch("https://localhost:7090/api/Account/login", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(dataTosend),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                try {
                    localStorage.setItem("user", dataTosend.Email);
                } catch (error) {
                    console.error("Failed to set user in localStorage:", error);
                }
                document.location = "/";
            } else {
                setError(data.message || "Something went wrong, please try again.");
            }
        } catch (error) {
            setLoading(false);
            setError("Something went wrong, please try again.");
            console.error("Login Error:", error);
        }
    };

    return (
        <div className="formbold-main-wrapper">
            <div className="formbold-form-wrapper">
                <div className="formbold-content">
                    <div className="formbold-image-column">
                        <img src={Sidepic} alt="Restaurant" className="formbold-image" />
                    </div>

                    <div className="formbold-form-column">
                        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#4CAF50" }}>
                            Log in Here
                        </h2>
                        <form onSubmit={LoginHandler}>
                            <div className="formbold-mb-5">
                                <label htmlFor="email" className="formbold-form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter Your Email"
                                    className="formbold-form-input"
                                    required
                                />
                            </div>

                            <div className="formbold-mb-5">
                                <label htmlFor="password" className="formbold-form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter Your Password"
                                    className="formbold-form-input"
                                    required
                                />
                            </div>

                            <div className="formbold-mb-5">
                                <label htmlFor="remember" className="formbold-form-label">Remember Password</label>
                                <input
                                    type="checkbox"
                                    name="Remember"
                                    id="remember"
                                    className="formbold-form-input"
                                />
                            </div>

                            <div>
                                <button type="submit" className="formbold-btn" disabled={loading}>
                                    {loading ? "Logging in..." : "Log In"}
                                </button>
                            </div>
                        </form>

                        {error && (
                            <div className="message" style={{ color: 'red', textAlign: 'center' }}>
                                {error}
                            </div>
                        )}

                        <div style={{ marginTop: "20px", textAlign: "center" }}>
                            Don't Have An Account?{" "}
                            <Link to="/register" style={{ color: "#4CAF50", textDecoration: "underline" }}>
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
