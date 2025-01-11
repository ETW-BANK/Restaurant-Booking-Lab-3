import React, { useEffect } from "react";
import Sidepic from "../assets/bg-hero.jpg";
import { Link } from "react-router-dom";

const Login = () => {
    useEffect(() => {
        document.title = "Login";

        const user = localStorage.getItem("user");
        if (user) {
            document.location = "/";
        }
    }, []);

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
                        <form action="#" onSubmit={LoginHandler}>
                            <div className="formbold-mb-5">
                                <label htmlFor="email" className="formbold-form-label">Email</label>
                                <input
                                    type="email"
                                    name="Email"
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
                                    name="Password"
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
                                <button type="submit" className="formbold-btn">Log In</button>
                            </div>
                        </form>

                        <div className="message" style={{ color: 'red', textAlign: 'center' }}></div>

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

async function LoginHandler(e) {
    e.preventDefault();
    const form_ = e.target;
    const formData = new FormData(form_);
    const dataTosend = {};

    for (const [key, value] of formData.entries()) {
        dataTosend[key] = value;
    }

    if (dataTosend.Remember === "on") {
        dataTosend.Remember = true;
    }

    const response = await fetch("https://localhost:7090/api/Account/login", {
        method: "POST",
        body: JSON.stringify(dataTosend),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("user", dataTosend.Email);
        document.location = "/";
    }

    const messageEl = document.querySelector(".message");
    if (messageEl) {
        if (data.message) {
            messageEl.innerHTML = data.message;
        } else {
            messageEl.innerHTML = "Something Went Wrong Please Try Again";
        }
    }

    console.log("Login Error", data);
}

export default Login;
