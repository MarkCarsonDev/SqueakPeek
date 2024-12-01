"use client";
import React from "react";
import "./404.css";  // Import the CSS file

const NotFound = () => {
  return (
    <div className="main-container">
      <div className="error-content">
        <h1 className="error-title">404</h1>
        <p className="error-message">Oops! The page you are looking for doesn't exist.</p>
        <a href="/" className="back-link">
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
