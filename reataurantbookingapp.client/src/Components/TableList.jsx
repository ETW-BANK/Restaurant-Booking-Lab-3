import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, Table, Box, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // Import Trash icon for the delete button
import './BookingList.css';

const TableList = () => {
  const [data, setData] = useState([]);

  // Fetch all tables on component mount
  useEffect(() => {
    const GetData = async () => {
      try {
        const result = await axios.get('https://localhost:7090/api/Table/GetAllTables');
        console.log('API Response:', result.data);
        setData(result.data); // Set the fetched data into state
      } catch (error) {
        console.error('Error fetching Tables:', error);
      }
    };

    GetData();
  }, []);

  // Handle deleting a table
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://localhost:7090/api/Table/DeleteTable/${id}`);
      console.log(response.data);

      setData((prevData) => prevData.filter(table => table.id !== id));

      alert('Table Deleted Successfully');
    } catch (error) {
      console.error('Error deleting table:', error);
      alert('Failed to delete table');
    }
  };

  return (
    <Box className="booking-list-container">
      <Card className="booking-card">
        <CardHeader
          title="Table List"
          className="booking-card-header"
          action={
            <Link to="/create-table" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '16px' }}
              >
                Create Table
              </Button>
            </Link>
          }
        />

        <CardContent>
          <div className="booking-table-container">
            <Table className="booking-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Table ID</th>
                  <th>Table Number</th>
                  <th>Seats</th>
                  <th>Available</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((table, index) => (
                    <tr key={table.id}>
                      <td data-label="#"> {index + 1} </td>
                      <td data-label="Table ID"> {table.id} </td>
                      <td data-label="Table Number"> {table.tableNumber} </td>
                      <td data-label="Seats"> {table.numberOfSeats} </td>
                      <td data-label="Available"> {table.isAvailable ? 'Yes' : 'No'} </td>
                      <td data-label="Actions">
                        <IconButton
                          color="secondary"
                          onClick={() => handleDelete(table.id)}
                        >
                          <FaTrash />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No tables available
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

export default TableList;
