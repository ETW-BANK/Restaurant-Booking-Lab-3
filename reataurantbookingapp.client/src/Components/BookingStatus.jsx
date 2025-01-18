import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Card, CardContent, CardHeader, Table, Box, Button } from "@mui/material";

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

    const cancelBooking = (bookingId) => {
        Axios.post(`https://localhost:7090/api/Booking/UpdateBooking/${bookingId}`)
            .then((response) => {
                alert("Booking cancelled successfully!");
                fetchBookings(userId);
                setBookings((prevBookings) => prevBookings.filter((b) => b.bookingId !== bookingId));
            })
            .catch((err) => {
                console.error("Error cancelling booking:", err);
                if (err.response && err.response.status === 404) {
                    alert("Booking not found. It may have already been cancelled.");
                } else {
                    alert("An error occurred while cancelling the booking. Please try again.");
                }
            });
    };

    return (
        <Box className="booking-list-container">
            <Card className="booking-card">
                <CardHeader
                    title="My Bookings"
                    className="booking-card-header" />
                <CardContent>
                    {isLoading ? (
                        <p>Loading your bookings...</p>
                    ) : bookings.length === 0 ? (
                        <p style={{ textAlign: "center", color: "red" }}>
                            No bookings found for your account.
                        </p>
                    ) : (
                        <Table className="booking-table">
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Guests</th>
                                    <th>Table No.</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings
                                    .filter((booking) => booking.bookingStatus !== 0)
                                    .map((booking) => (
                                        <tr key={booking.bookingId}>
                                            <td>{booking.bookingId}</td>
                                            <td>{booking.bookingDate}</td>
                                            <td>{booking.bookingTime}</td>
                                            <td>{booking.numberOfGuests}</td>
                                            <td>{booking.tableNumber}</td>
                                            <td>
                                                {booking.bookingStatus === 0 ? "Cancelled" : "Active"}
                                            </td>
                                            <td>
                                                {booking.bookingStatus !== 0 && (
                                                    <Button
                                                        onClick={() => cancelBooking(booking.bookingId)}
                                                        variant="contained"
                                                        color="secondary"
                                                    >
                                                        Cancel
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default BookingStatus;
