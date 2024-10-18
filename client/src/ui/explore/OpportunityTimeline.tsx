"use client";
import { Chrono } from "react-chrono";
import "@/ui/explore/OpportunityTimeline.css";

export function OpportunityTimeline() {
  interface oppornityData {
    id: number;
    

  }



  const data = [
    {
      title: "May 1940",
      cardTitle: "Dunkirk",
      cardSubtitle:
        "Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.",
    },
    {
      title: "May 1940",
      cardTitle: "Dunkirk",
      cardSubtitle:
        "Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.",
    },
    {
      title: "May 1940",
      cardTitle: "Dunkirk",
      cardSubtitle:
        "Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.",
    },
    {
      title: "May 1940",
      cardTitle: "Dunkirk",
      cardSubtitle:
        "Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.",
    },
  ];
  return (
    <div className="custom-timeline">
      <Chrono
        items={data}
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
      />
    </div>
  );
}
