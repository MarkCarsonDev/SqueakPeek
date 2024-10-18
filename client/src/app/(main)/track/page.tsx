"use client";
import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import NewApplicationModal from "@/ui/track/newApplicationModal"; 
import "./tracking.css";

export default function Page() {
  const [openModal, setOpenModal] = useState(false); // State to manage modal visibility

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
      <Typography variant="h3">Submitted Applications</Typography>
      <Typography variant="subtitle1">Total Applications: {num_applications}</Typography>

        <Button
          variant="contained"
          // color="primary"
          endIcon={<FontAwesomeIcon icon={faFileCirclePlus} />}
          sx={{
            mt: 2,
            width: "200px",
            boxShadow: "none",
            backgroundColor: "#496FFF",
            borderRadius: "8px",
            ":hover": {
              backgroundColor: "#3B5AC6",
              boxShadow: "none",
            },
          }}
          onClick={handleOpenModal}
        >
          New Application
        </Button>

      {/* The New Application Modal */}
      <NewApplicationModal open={openModal} handleClose={handleCloseModal}/>

    </div>
  );
}



// Will comeback to this later
{/* <div className="application-stages">
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
      </div> */}