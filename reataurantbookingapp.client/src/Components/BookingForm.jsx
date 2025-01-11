import React, { useState, useEffect } from "react";
import Axios from "axios";

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

    
    console.log("Booking data:", bookingData);

    try {
      
      const response = await Axios.post("https://localhost:7090/api/Booking/Create", bookingData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Booking created successfully:", response.data);
    } catch (error) {
      console.error("Error creating booking:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading user data...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Guests"
            value={guest}
            onChange={(e) => setGuest(e.target.value)}
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Table ID"
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={!userId}>Book</button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
