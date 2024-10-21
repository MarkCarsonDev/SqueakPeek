"use client";
import { Chrono } from "react-chrono";
import "@/ui/explore/OpportunityTimeline.css";
import { Typography } from "@mui/material";
import React, { useRef } from 'react';

interface oppornityDataProps {
  id: number;
}
export function OpportunityTimeline({ id }: oppornityDataProps) {
  const customContent = [
    <div style={{ textAlign: "center" }}>
      <Typography>Job Stats</Typography>
      <Typography>Interviewing: 50</Typography>
      <Typography>Rejected: 50</Typography>
    </div>,
    <div style={{ textAlign: "center" }}>
      <Typography>Job Stats</Typography>
      <Typography>Interviewing: 25</Typography>
      <Typography>Rejected: 25</Typography>
    </div>,
    <div style={{ textAlign: "center" }}>
      <Typography>Job Stats</Typography>
      <Typography>Interviewing: 25</Typography>
      <Typography>Rejected: 25</Typography>
    </div>,
    <div style={{ textAlign: "center" }}>
      <Typography>Job Stats</Typography>
      <Typography>Interviewing: 25</Typography>
      <Typography>Rejected: 25</Typography>
    </div>,
    <div style={{ textAlign: "center" }}>
    <Typography>Job Stats</Typography>
    <Typography>Interviewing: 25</Typography>
    <Typography>Rejected: 25</Typography>
  </div>,
  ];

  const items = [
    {
      title: <Typography color="white">04/29/24 - 05/7/24</Typography>,
    },
    {
      title: <Typography color="white">05/8/24 - 05/15/24</Typography>,
    },
    {
      title: <Typography color="white">05/16/24 - 05/23/24</Typography>,
    },
    {
      title: <Typography color="white">05/24/24 - 05/30/24</Typography>,
    },
    {
      title: <Typography color="white">05/30/24 - 06/06/24</Typography>,
    },
  ];

  const chronoRef = useRef<typeof Chrono | null>(null);

  const handleNext = () => {
    if (chronoRef.current) {
      const activeIndex = (chronoRef.current as any).state?.activeItemIndex;
      if (activeIndex !== undefined) {
        chronoRef.current.scrollToIndex(activeIndex + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (chronoRef.current) {
      const activeIndex = (chronoRef.current as any).state?.activeItemIndex;
      if (activeIndex !== undefined) {
        chronoRef.current.scrollToIndex(activeIndex - 1);
      }
    }
  };

  return (
    <div className="custom-timeline">
      <Chrono
        items={items}
        theme={{
          primary: "#496FFF",
          secondary: "#496FFF",
          cardBgColor: "white",
          cardForeColor: "violet",
          titleColor: "black",
          titleColorActive: "white",
        }}
        cardHeight={125}
        cardWidth={175}
        mode="HORIZONTAL"
        lineLength="auto"
        itemWidth={200}
        disableToolbar
        showAllCardsHorizontal
      >
        {customContent}
      </Chrono>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
