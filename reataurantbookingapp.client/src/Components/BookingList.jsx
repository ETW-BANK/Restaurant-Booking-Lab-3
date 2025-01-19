import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, Table, Box } from '@mui/material';
import './BookingList.css';


const BookingList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const GetData = async () => {
      try {
        const result = await axios.get('https://localhost:7090/api/Booking/GetBookings');
        console.log('API Response:', result.data);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    GetData();
  }, []);

  return (
    <Box className="booking-list-container">
      <Card className="booking-card">
        <CardHeader title="Booking List" className="booking-card-header" />
        <CardContent>
          <Table className="booking-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Booking Date</th>
                <th>Booking Time</th>
                <th>Number of Guests</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Table Number</th>
                <th>Booking Status</th>
              </tr>
            </thead>
            <tbody>
  {data.length > 0 ? (
    data.map((booking, index) => (
      <tr key={booking.bookingId}>
        <td data-label="#"> {index + 1} </td>
        <td data-label="Booking Date"> {booking.bookingDate} </td>
        <td data-label="Booking Time"> {booking.bookingTime} </td>
        <td data-label="Guests"> {booking.numberOfGuests} </td>
        <td data-label="Customer Name"> {booking.name} </td>
        <td data-label="Email"> {booking.email} </td>
        <td data-label="Phone"> {booking.phone || 'N/A'} </td>
        <td data-label="Table Number"> {booking.tableNumber} </td>
        <td data-label="Status"> {booking.bookingStatus === 0 ? "Cancelled" : "Active"} </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="9" className="text-center">
        No bookings available
      </td>
    </tr>
  )}
</tbody>

          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookingList;
