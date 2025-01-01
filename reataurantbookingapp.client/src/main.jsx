import React from 'react';
import { createRoot } from 'react-dom/client'; // Use createRoot for React 18+
import App from './App';
import { HashRouter } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import './App.css';

const container = document.getElementById('root');

// Create the root and render the components
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Navbar />
      <App />
      <Footer />
    </HashRouter>
  </React.StrictMode>
);
