import { Typography } from "@mui/material";
import "./tracking.css";

export default function Page() {
  const num_applications = 5; // dummy data for number of applications
  const stages = [
    { name: "Initial Screen", color: "blue" },
    { name: "Rejected", color: "red" },
    { name: "Online Assessment", color: "orange" },
    { name: "Interviewing", color: "yellow" },
    { name: "Offer", color: "green" },
  ];

  return (
    <div className="main">
      <Typography variant="h6">Submitted Applications</Typography>
      <Typography variant="subtitle1">Total Applications: {num_applications}</Typography>

      <div className="application-stages">
        {stages.map((stage, index) => (
          <div key={index} className="stage-column">
            <Typography variant="subtitle2" className="stage-title">
              <span
                className="stage-circle"
                style={{ backgroundColor: stage.color }}
              ></span>
              {stage.name} (0)
            </Typography>
            <div className="application-box">+</div>
          </div>
        ))}
      </div>

      
    </div>
  );
}