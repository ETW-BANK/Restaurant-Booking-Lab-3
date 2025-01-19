import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "./Components/Home";
import Booking from "./Components/Booking";
import BookingList from './Components/BookingList';
import UserList from './Components/UserList';
import Tablelist from './Components/TableList';
import Login from './Components/Login';
import Register from './Components/Regisetr';
import Admin from './Components/Admin';
import BookingStatus from "./Components/BookingStatus";
import CreateTable from "./Components/CreateTable";
import Logout from './Components/Logout';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import "./App.css";

const App = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/booking", element: <Booking /> },
    { path: "/booking-list", element: <BookingList /> },
    { path: "/user-list", element: <UserList /> },
    { path: "/table-list", element: <Tablelist /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/admin", element: <Admin /> },
    { path: "/booking-status", element: <BookingStatus /> },
    { path: "/create-table", element: <CreateTable /> },
    { path: "/logout", element: <Logout /> }
  ]);

  return (
    <div className="App">
      <Navbar />
      <div className="main-content">{routes}</div>
      <Footer />
    </div>
  );
};

export default App;
