"use client"
import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './lpTextCarousel.css';

const textItems = [
  "How many other people are applying?",
  "Is this job really entry-level?",
  "How long is the interview process?",
  "What kind of questions do they ask?",
  "Are there skills I should highlight?"
];

const TextCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === textItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  return (
    <div>
      <TransitionGroup>
        <CSSTransition
          key={currentIndex}
          timeout={500}
          classNames="fade"
        >
            
          <Typography
            variant="h4"
            align="justify"
          >
            {textItems[currentIndex]}
          </Typography>
        </CSSTransition>
      </TransitionGroup>
      </div>
  );
};

export default TextCarousel;
