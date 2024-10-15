import { Typography } from "@mui/material";
import "./tracking.css";

export default function Page() {
  const num_applications = "<Dummy Holder>"; // dummy data for number of applications
  const stages = [
    { name: "Initial Screen", color: "#769FCD" },
    { name: "Rejected", color: "#C7253E" },
    { name: "Online Assessment", color: "#EB5B00" },
    { name: "Interviewing", color: "#F0A202" },
    { name: "Offer", color: "#2E7E33" },
  ];

  return (
    <div className="main">
      <Typography variant="h6">Submitted Applications</Typography>
      <Typography variant="subtitle1">
        Total Applications: {num_applications}
      </Typography>

      {/* this is for the new application button and search box */}
      <div></div>

      {/* this is for the application stages */}
      <div className="application-stages">
        {stages.map((stage, index) => (
          <div key={index} className="stage-column">
            <Typography
              variant="subtitle2"
              sx={{
                margin: "15px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  backgroundColor: stage.color, 
                  display: "inline-block",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
              ></span>
              {stage.name} (num_applications)
            </Typography>
            <div className="application-box">+</div>
          </div>
        ))}
      </div>
    </div>
  );
}
