import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, Table, Box } from "@mui/material";

const Admin = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://localhost:7090/api/Account/admin", {
          withCredentials: true,
        });
        console.log("Admin Users:", response.data.users);
        setAdminUsers(response.data.users);
        setError("");
      } catch (err) {
        console.error("Error fetching admin users:", err);
        setError(err.message || "Failed to load admin users.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminUsers();
  }, []);

  return (
    <Box className="booking-list-container">
      <Card className="booking-card">
        <CardHeader title="Admin Users" className="booking-card-header" />
        <CardContent>
          <Table className="booking-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Roles</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="4" className="text-center error-message">
                    {error}
                  </td>
                </tr>
              ) : adminUsers.length > 0 ? (
                adminUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.roles.join(", ")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No admin users found.
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

export default Admin;
