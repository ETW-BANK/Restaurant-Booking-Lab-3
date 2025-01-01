import React, { useState } from "react";
import Sidepic from '../assets/bg-hero.jpg'; // Ensure path is correct

const BookingForm = () => {
  const [formData, setFormData] = useState({
    guest: "",
    date: "",
    time: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="formbold-main-wrapper">
      <div className="formbold-form-wrapper">
        <div className="formbold-content">
          {/* Left Column (Image) */}
          <div className="formbold-image-column">
            <img src={Sidepic} alt="Restaurant" className="formbold-image" />
          </div>

          {/* Right Column (Form) */}
          <div className="formbold-form-column">
            <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#4CAF50" }}>
              Book Your Table
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="formbold-mb-5">
                <label htmlFor="guest" className="formbold-form-label">
                  Number of Guests
                </label>
                <input
                  type="number"
                  name="guest"
                  id="guest"
                  placeholder="Enter number of guests"
                  className="formbold-form-input"
                  value={formData.guest}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formbold-mb-5">
                <label htmlFor="date" className="formbold-form-label">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="formbold-form-input"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formbold-mb-5">
                <label htmlFor="time" className="formbold-form-label">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  className="formbold-form-input"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <button type="submit" className="formbold-btn">
                 Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
