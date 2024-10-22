"use client";
import { Chrono } from "react-chrono";
import "@/ui/explore/OpportunityTimeline.css";
import { Typography } from "@mui/material";

interface oppornityDataProps {
  id: number;
}
export function OpportunityTimeline({ id }: oppornityDataProps) {
  //future function for fetching timeline data
  const fetchTimelineData = (oppId: number) => {
    return console.log(oppId);
  };

  fetchTimelineData(id);

  // Hard coded values for content card
  const customContent = [
    <div key={1} style={{ textAlign: "center" }}>
      <Typography>Job Stats</Typography>
      <Typography>Interviewing: 50</Typography>
      <Typography>Rejected: 50</Typography>
    </div>,
    <div key={2} style={{ textAlign: "center" }}>
      <Typography>Job Stats</Typography>
      <Typography>Interviewing: 25</Typography>
      <Typography>Rejected: 25</Typography>
    </div>,
    <div key={3} style={{ textAlign: "center" }}>
      <Typography>Job Stats</Typography>
      <Typography>Interviewing: 25</Typography>
      <Typography>Rejected: 25</Typography>
    </div>,
    <div key={4} style={{ textAlign: "center" }}>
      <Typography>Job Stats</Typography>
      <Typography>Interviewing: 25</Typography>
      <Typography>Rejected: 25</Typography>
    </div>,
    <div key={5} style={{ textAlign: "center" }}>
      <Typography>Job Stats</Typography>
      <Typography>Interviewing: 25</Typography>
      <Typography>Rejected: 25</Typography>
    </div>,
  ];

  //Hard coded Point titles
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
        disableToolbar
      >
        {customContent}
      </Chrono>
    </div>
  );
}
