import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, Table, Box } from '@mui/material';
import './BookingList.css';

const UserList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const GetData = async () => {
      try {
        const result = await axios.get('https://localhost:7090/api/User/GetUsers');
        console.log('API Response:', result.data);
        setData(result.data.data); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    GetData();
  }, []);

  return (
    <Box className="booking-list-container">
      <Card className="booking-card">
        <CardHeader title="User List" className="booking-card-header" />
        <CardContent>
          <div className="booking-table-container">
            <Table className="booking-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User ID</th>
                  <th>NAME</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>ROLE</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((user, index) => (
                    <tr key={user.id}>
                      <td data-label="#"> {index + 1} </td>
                      <td data-label="User ID"> {user.id} </td>
                      <td data-label="Name"> {user.name} </td>
                      <td data-label="Email"> {user.email} </td>
                      <td data-label="Phone"> {user.phone || 'N/A'} </td>
                      <td data-label="Address"> {user.streetAddress || 'N/A'} </td>
                      <td data-label="Role"> {user.role} </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No users available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserList;
