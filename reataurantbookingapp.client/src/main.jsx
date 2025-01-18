import React from 'react';
import { createRoot } from 'react-dom/client'; // Use createRoot for React 18+
import { HashRouter } from 'react-router-dom';
import App from './App'; // Import App component
import Footer from "./Components/Footer";
import './App.css';

const container = document.getElementById('root');

// Create the root and render the components
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App /> {/* Only render App here */}
      <Footer /> {/* Render Footer here */}
    </HashRouter>
  </React.StrictMode>
);
