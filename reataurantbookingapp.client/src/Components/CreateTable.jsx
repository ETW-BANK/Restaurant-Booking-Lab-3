import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import Sidepic from "../assets/bg-hero.jpg"; // Background image

const CreateTable = () => {
  const [numberOfSeats, setNumberOfSeats] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!numberOfSeats || numberOfSeats <= 0) {
      setMessage("Please enter a valid number of seats.");
      return;
    }

    const tableData = {
      numberOfSeats: parseInt(numberOfSeats), // Ensure it's a number
    };

    try {
      const response = await Axios.post("https://localhost:7090/api/Table/CreateNewTable", tableData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage(response.data); // Display the response message
      setNumberOfSeats(""); // Clear the input
    } catch (error) {
      console.error("Error creating table:", error);
      setMessage(error.response?.data || "An error occurred while creating the table.");
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
              Create a New Table
            </h2>
            {message && (
              <p
                style={{
                  textAlign: "center",
                  color: message.includes("Successfully") ? "green" : "red",
                }}
              >
                {message}
              </p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="formbold-mb-5">
                <label htmlFor="numberOfSeats" className="formbold-form-label">
                  Number of Seats
                </label>
                <input
                  type="number"
                  id="numberOfSeats"
                  placeholder="Enter number of seats"
                  value={numberOfSeats}
                  onChange={(e) => setNumberOfSeats(e.target.value)}
                  className="formbold-form-input"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="formbold-btn"
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Create Table
                </button>
              </div>
            </form>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Link to="/" style={{ color: "#4CAF50", textDecoration: "underline" }}>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTable;
