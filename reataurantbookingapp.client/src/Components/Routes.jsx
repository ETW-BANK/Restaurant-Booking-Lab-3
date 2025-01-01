import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./Components/Home";
import Booking from "./Components/Booking";

import "./App.css";


const App = () => {

  
    return (
       
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          
        </Routes>
    
      
      );
};

export default App;
 