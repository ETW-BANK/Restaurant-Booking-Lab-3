import React, { useEffect, useState } from 'react';
import Sidepic from '../assets/bg-hero.jpg';

const Register = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            
           
            localStorage.clear();

            const user = localStorage.getItem("user");
            if (user) {
                document.location = "/";
            }
        } catch (error) {
            console.error("LocalStorage access denied:", error);
        }
    }, []);

    const RegisterHandler = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const dataTosend = {};

        formData.forEach((value, key) => {
            dataTosend[key] = value;
        });

        // Clean up the user's name
        const formattedName = dataTosend.name.trim().replace(/\s+/g, "");
        dataTosend.name = formattedName;

        // Add a default ID if not provided
        if (!dataTosend.id) {
            dataTosend.id = "0";
        }

        setLoading(true);
        try {
            const response = await fetch("https://localhost:7090/api/Account/register", {
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
                document.location = "/login";
            } else {
                const messageEl = document.querySelector(".message");
                messageEl.innerHTML = data.message || "Something went wrong, please try again.";
                console.error("Registration Failed:", data);
            }
        } catch (error) {
            setLoading(false);
            console.error("Error during registration:", error);
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
                            Register Here
                        </h2>
                        <form onSubmit={RegisterHandler}>
                            <input type="hidden" name="id" id="id" value="0" />

                            <div className="formbold-mb-5">
                                <label htmlFor="name" className="formbold-form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Your Name"
                                    className="formbold-form-input"
                                    required
                                />
                            </div>

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
                                <label htmlFor="streetAddress" className="formbold-form-label">Address</label>
                                <input
                                    type="text"
                                    name="streetAddress"
                                    id="streetAddress"
                                    placeholder="Enter Your Street Address"
                                    className="formbold-form-input"
                                />
                            </div>

                            <div className="formbold-mb-5">
                                <label htmlFor="city" className="formbold-form-label">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    placeholder="Enter Your City"
                                    className="formbold-form-input"
                                />
                            </div>

                            <div className="formbold-mb-5">
                                <label htmlFor="postalCode" className="formbold-form-label">Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    id="postalCode"
                                    placeholder="Enter Your Postal Code"
                                    className="formbold-form-input"
                                />
                            </div>

                            <div className="formbold-mb-5">
                                <label htmlFor="phoneNumber" className="formbold-form-label">Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    placeholder="Enter Your Phone Number"
                                    className="formbold-form-input"
                                />
                            </div>

                            <div>
                                <button type="submit" className="formbold-btn">
                                    {loading ? "Registering..." : "Register"}
                                </button>
                            </div>
                        </form>

                        <div className="message" style={{ color: 'red', textAlign: 'center' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
