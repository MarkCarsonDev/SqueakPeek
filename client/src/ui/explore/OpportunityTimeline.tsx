"use client";
import { Chrono } from "react-chrono";
import "@/ui/explore/OpportunityTimeline.css";
import { Typography } from "@mui/material";

interface oppornityDataProps {
    id: number;
  }
export function OpportunityTimeline({
    id,
    
}: oppornityDataProps) {
  



    const customContent = [
        <div>
          <Typography>Custom Card 1</Typography>
          <Typography></Typography>
        </div>,
      ];
      
      const items = [
        {
          title: <Typography color="white">04/29/24 - 05/7/24</Typography>,
          cardTitle: "Card 1",
          cardSubtitle: "Subtitle 1",
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
          cardForeColor: "violet",
          titleColor: "black",
          titleColorActive: "white",
        }}
        cardHeight={100}
        cardWidth={300}
        mode="HORIZONTAL"
        disableToolbar={true}
        lineLength="auto"
      >{customContent}</Chrono>
    </div>
  );
}
