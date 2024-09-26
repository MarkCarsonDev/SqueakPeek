"use client"
import React from 'react';
import './styling/button.css';  

interface ButtonProps {
  text: string;
  onClick?: () => void;  
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className="simple-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;