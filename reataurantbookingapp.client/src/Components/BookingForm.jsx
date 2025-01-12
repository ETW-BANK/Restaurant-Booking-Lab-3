import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Sidepic from "../assets/bg-hero.jpg"; // Importing the background image for consistency

const BookingForm = () => {
  const [userId, setUserId] = useState(null);
  const [guest, setGuest] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tableId, setTableId] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Axios.get("https://localhost:7090/api/Account/xhtlekd", { withCredentials: true })
      .then((response) => {
        if (response.data) {
          setUserId(response.data);
          localStorage.setItem("user", response.data);
          setIsLoading(false);
        } else {
          console.error("No user data in response");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    const bookingData = {
      ApplicationUserId: userId,
      BookingDate: date,
      BookingTime: time,
      NumberOfGuests: guest,
      TableId: tableId,
      Name: name || null,
      Phone: phone || null,
      Email: email || null,
      BookingStatus: 0,
    };

    try {
      const response = await Axios.post("https://localhost:7090/api/Booking/Create", bookingData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Booking created successfully:", response.data);
      alert("Booking Created Sucessfully")

      window.location.href = "/booking-confirmation";
    } catch (error) {

      if (error.response && error.response.data && error.response.data.includes("No available tables")) {
        alert("Sorry, there are no available tables for the selected date and time. Please try a different time.");
      } else {

        alert("An error occurred while creating your booking. Please try again later.");
        console.error("Error creating booking:", error.response?.data || error.message);
      }
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
              Make a Booking
            </h2>
            {isLoading ? (
              <p>Loading user data...</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="formbold-mb-5">
                  <label htmlFor="guest" className="formbold-form-label">Number of Guests</label>
                  <input
                    type="number"
                    id="guest"
                    placeholder="Enter number of guests"
                    value={guest}
                    onChange={(e) => setGuest(e.target.value)}
                    className="formbold-form-input"
                    required
                  />
                </div>

                <div className="formbold-mb-5">
                  <label htmlFor="date" className="formbold-form-label">Booking Date</label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="formbold-form-input"
                    required
                  />
                </div>

                <div className="formbold-mb-5">
                  <label htmlFor="time" className="formbold-form-label">Booking Time</label>
                  <input
                    type="time"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="formbold-form-input"
                    required
                  />
                </div>

                <div>
                  <button type="submit" className="formbold-btn" disabled={!userId}>
                    Book Now
                  </button>
                </div>
              </form>
            )}

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              Already have a booking?{" "}
              <Link to="/booking-status" style={{ color: "#4CAF50", textDecoration: "underline" }}>
                View Your Bookings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
