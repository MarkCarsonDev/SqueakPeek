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

  return (
    <div className="custom-timeline">
      <Chrono
        items={items}
        theme={{
          primary: "#496FFF",
          secondary: "#496FFF",
          cardBgColor: "white",
          titleColor: "black",
          titleColorActive: "white",
        }}
        cardHeight={125}
        cardWidth={175}
        mode="HORIZONTAL"
        itemWidth={200}
        showAllCardsHorizontal
        disableToolbar
        contentDetailsHeight={100}
          fontSizes={{
            title: "1rem"
          }}
      >
        {customContent}
      </Chrono>
    </div>
  );
}
