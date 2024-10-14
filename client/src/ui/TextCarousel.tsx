"use client";
import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";

const textItems = [
  "How many other people are applying?",
  "Is this job really entry-level?",
  "How long is the interview process?",
  "What kind of questions do they ask?",
  "Are there skills I should highlight?",
  // Other items...
];

export const TextCarousel = () => {
  const itemHeight = 50;
  const numVisibleItems = 5;
  const transitionDuration = 500; 
  const intervalDuration = 4000;

  const [displayItems, setDisplayItems] = useState(
    textItems.slice(0, Math.min(numVisibleItems, textItems.length))
  );
  const [currentIndex, setCurrentIndex] = useState(numVisibleItems % textItems.length);
  const [translateY, setTranslateY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Prepare for transition by adding next item to displayItems
      setDisplayItems((prevItems) => {
        const nextItem = textItems[currentIndex];
        return [...prevItems, nextItem];
      });

      // Start the transition
      setIsTransitioning(true);
      setTranslateY(-itemHeight);

      // After the scroll transition ends...
      setTimeout(() => {
        // Reset transition
        setIsTransitioning(false);
        setTranslateY(0);

        // Remove the first item
        setDisplayItems((prevItems) => {
          const newItems = prevItems.slice(1);
          return newItems;
        });

        // Update currentIndex
        setCurrentIndex((prevIndex) => (prevIndex + 1) % textItems.length);
      }, transitionDuration);
    }, intervalDuration);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        height: `${itemHeight * numVisibleItems}px`,
        width: "700px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          transform: `translateY(${translateY}px)`,
          transition: isTransitioning ? `transform ${transitionDuration}ms` : "none",
        }}
      >
        {displayItems.map((item, index) => (
          <Typography
            key={`${item}-${index}`}
            variant="h4"
            align="center"
            sx={{
              height: `${itemHeight}px`,
              lineHeight: `${itemHeight}px`,
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>
      {/* Gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          background: `linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.75) 35%, rgba(255, 255, 255, 0) 45%, rgba(255, 255, 255, 0) 55%, rgba(255, 255, 255, 0.75) 65%, rgba(255, 255, 255, 1))`,
        }}
      />
    </Box>
  );
};
