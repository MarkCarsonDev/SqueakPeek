"use client";
import { Chrono } from "react-chrono";
import "@/ui/explore/OpportunityTimeline.css";
import { Typography } from "@mui/material";
import { useEffect, useState } from 'react';

interface oppornityDataProps {
  id: number;
}

interface rangeStats {
  interviewing: number
  rejected: number
}

interface timelinePoints {
  dateRangeStart: string
  dateRangeEnd: string
}
export function OpportunityTimeline({ id }: oppornityDataProps) {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server side
  }
  //future function for fetching timeline data
  const fetchTimelineData = (oppId: number) => {
    return console.log(oppId);
  };

  fetchTimelineData(id);

  const rstats: rangeStats [] = [
    {
      interviewing: 25,
      rejected: 25
    },
    {
      interviewing: 25,
      rejected: 25
    },
    {
      interviewing: 25,
      rejected: 25
    },
    {
      interviewing: 25,
      rejected: 25
    },
    {
      interviewing: 25,
      rejected: 25
    },
  ]

  const tPoints: timelinePoints [] = [
    {
      dateRangeStart: "4/29/24",
      dateRangeEnd: "5/7/24"
    },
    {
      dateRangeStart: "4/29/24",
      dateRangeEnd: "5/7/24"
    },
    {
      dateRangeStart: "4/29/24",
      dateRangeEnd: "5/7/24"
    },
    {
      dateRangeStart: "4/29/24",
      dateRangeEnd: "5/7/24"
    },
    {
      dateRangeStart: "4/29/24",
      dateRangeEnd: "5/7/24"
    },
  ]
  // Hard coded values for content card
  const customContent = 
    rstats.map((rstats, index) => (
      <div key={index} style={{ textAlign: "center" }}>
      <Typography>Job Stats</Typography>
      <Typography>Interviewing: {rstats.interviewing}</Typography>
      <Typography>Rejected: {rstats.rejected}</Typography>
    </div>
    ))
    

  //Hard coded Point titles
  const items = tPoints.map((tPoints, index) => ({
    title: <Typography key={index} color="white">{tPoints.dateRangeStart} - {tPoints.dateRangeEnd}</Typography>,
  }));
    
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
        disableToolbar
      >
        {customContent}
      </Chrono>
    </div>
  );
}
