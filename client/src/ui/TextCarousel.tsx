"use client"
import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "@/ui/styling/TextCarousel.css";

const textItems = [
  "How many other people are applying?",
  "Is this job really entry-level?",
  "How long is the interview process?",
  "What kind of questions do they ask?",
  "Are there skills I should highlight?"
];

export const TextCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === textItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
    >
      <TransitionGroup>
        <CSSTransition
          key={currentIndex}
          timeout={500}
          classNames="fade"
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              position: 'absolute',
            }}
          >
            {textItems[currentIndex]}
          </Typography>
        </CSSTransition>
        
      </TransitionGroup>
    </Box>
  );
};

