import React, { useState, useEffect } from 'react';
import Sidepic from '../assets/bg-hero.jpg'; 

const Register = () => {
    const [loading, setLoading] = useState(false);

    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        streetAddress: '',
        city: '',
        postalCode: '',
        state: '',
        id: '0', 
    });

    
    useEffect(() => {
        localStorage.clear();
        sessionStorage.clear();
    }, []);

  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const RegisterHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log(formData); 

        try {
            const response = await fetch("https://localhost:7090/api/Account/register", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                
                
                localStorage.setItem("user", JSON.stringify(data.user)); 
                localStorage.setItem("token", data.token); 

                
                window.location.href = "/home"; 
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
                        <form onSubmit={RegisterHandler} autoComplete="off">
                            <div className="flex">
                                <div className="formbold-mb-5 sm:w-half">
                                    <label htmlFor="name" className="formbold-form-label">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        placeholder="Enter Your Name"
                                        className="formbold-form-input"
                                        required
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                </div>

                                <div className="formbold-mb-5 sm:w-half">
                                    <label htmlFor="email" className="formbold-form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        placeholder="Enter Your Email"
                                        className="formbold-form-input"
                                        required
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            <div className="flex">
                                <div className="formbold-mb-5 sm:w-half">
                                    <label htmlFor="password" className="formbold-form-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        placeholder="Enter Your Password"
                                        className="formbold-form-input"
                                        required
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                    />
                                </div>

                                <div className="formbold-mb-5 sm:w-half">
                                    <label htmlFor="phoneNumber" className="formbold-form-label">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        value={formData.phoneNumber}
                                        placeholder="Enter Your Phone Number"
                                        className="formbold-form-input"
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            <div className="flex">
                                <div className="formbold-mb-5 sm:w-half">
                                    <label htmlFor="streetAddress" className="formbold-form-label">Address</label>
                                    <input
                                        type="text"
                                        name="streetAddress"
                                        id="streetAddress"
                                        value={formData.streetAddress}
                                        placeholder="Enter Your Street Address"
                                        className="formbold-form-input"
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                </div>

                                <div className="formbold-mb-5 sm:w-half">
                                    <label htmlFor="city" className="formbold-form-label">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        value={formData.city}
                                        placeholder="Enter Your City"
                                        className="formbold-form-input"
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            <div className="flex">
                                <div className="formbold-mb-5 sm:w-half">
                                    <label htmlFor="postalCode" className="formbold-form-label">Postal Code</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        id="postalCode"
                                        value={formData.postalCode}
                                        placeholder="Enter Your Postal Code"
                                        className="formbold-form-input"
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                </div>

                                <div className="formbold-mb-5 sm:w-half">
                                    <label htmlFor="state" className="formbold-form-label">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        id="state"
                                        value={formData.state}
                                        placeholder="Enter Your State"
                                        className="formbold-form-input"
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                </div>
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
