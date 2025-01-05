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
import "./App.css";


const App = () => {

  const routes = useRoutes([
    
    { path: "/", element: <Home /> },
    { path: "/booking", element: <Booking /> },
    { path: "/booking-list", element: <BookingList /> },
    { path: "/user-list", element: <UserList /> },
    { path: "/table-list", element: <Tablelist /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/admin", element: <Admin /> },
  ]);

  return routes;
};

export default App;
