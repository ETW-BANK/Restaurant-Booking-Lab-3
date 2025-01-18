import React, { useState, useEffect } from "react";
import Axios from "axios";
import './BookingList.css';
const BookingStatus = () => {
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   
    Axios.get("https://localhost:7090/api/Account/xhtlekd", { withCredentials: true })
      .then((response) => {
        if (response.data) {
          setUserId(response.data);
          fetchBookings(response.data); 
        } else {
          console.error("No user data found in response");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching user ID:", err);
        setIsLoading(false);
      });
  }, []);

  const fetchBookings = (userId) => {
    Axios.get(`https://localhost:7090/api/Booking/GetBookingsByUserId/GetBookingsByUserId/${userId}`)
      .then((response) => {
        setBookings(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setIsLoading(false);
      });
  };

  return (
    <div className="booking-status">
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#4CAF50" }}>My Bookings</h1>
      {isLoading ? (
        <p>Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <p style={{ textAlign: "center", color: "red" }}>No bookings found for your account.</p>
      ) : (
        <div className="booking-table">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f4f4f4", borderBottom: "2px solid #ccc" }}>
                <th style={{ padding: "10px", textAlign: "left" }}>Booking ID</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Date</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Time</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Guests</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Table No.</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.bookingId} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>{booking.bookingId}</td>
                  <td style={{ padding: "10px" }}>{booking.bookingDate}</td>
                  <td style={{ padding: "10px" }}>{booking.bookingTime}</td>
                  <td style={{ padding: "10px" }}>{booking.numberOfGuests}</td>
                  <td style={{ padding: "10px" }}>{booking.tableNumber}</td>
                  <td style={{ padding: "10px" }}>
                  <td>{booking.bookingStatus === 0 ? "Cancelled" : "Active"}</td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingStatus;
