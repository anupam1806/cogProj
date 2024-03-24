// src/components/LogoutButton.js

import React from 'react';
import axios from 'axios'; // Make sure you've imported Axios
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {

    const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Clear the server-side session (assuming you have an API endpoint for logout)
      await axios.get('http://localhost:8000/logout');

      // Clear the client-side session cookie
      document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      navigate('/signin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (

    <button onClick={handleLogout} className="nav-button">Log Out</button>
  );
};

export default LogoutButton;
