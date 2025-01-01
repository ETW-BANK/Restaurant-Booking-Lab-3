import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "./Components/Home";
import Booking from "./Components/Booking";
import BookingList from './Components/BookingList';
import "./App.css";


const App = () => {

  const routes = useRoutes([
    
    { path: "/", element: <Home /> },
    { path: "/booking", element: <Booking /> },
    { path: "/booking-list", element: <BookingList /> },
  ]);

  return routes;
};

export default App;
