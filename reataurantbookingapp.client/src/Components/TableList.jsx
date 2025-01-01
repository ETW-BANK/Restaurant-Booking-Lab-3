import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, Table, Box } from '@mui/material';
import './BookingList.css';

const TableList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const GetData = async () => {
      try {
        const result = await axios.get('https://localhost:7090/api/Table/GetAllTables');
        console.log('API Response:', result.data);  
        setData(result.data); 
      } catch (error) {
        console.error('Error fetching Tables:', error);
      }
    };

    GetData();
  }, []);

  return (
    <Box className="booking-list-container">
      <Card className="booking-card">
        <CardHeader title="Table List" className="booking-card-header" />
        <CardContent>
          <Table className="booking-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Table ID</th>
                <th>Table Number</th>
                <th>Seats</th>
                <th>Available</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((table, index) => (
                  <tr key={table.id}>
                    <td>{index + 1}</td>
                    <td>{table.id}</td>
                    <td>{table.tableNumber}</td>
                    <td>{table.numberOfSeats}</td>
                    <td>{table.isAvailable ? 'Yes' : 'No'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No tables available
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

export default TableList;
