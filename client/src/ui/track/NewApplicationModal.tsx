"use client";
import React, { useState } from "react";
import { Modal, Typography, Button, Box } from "@mui/material";
import { InputField } from "@/ui/InputField";
import { SearchDropdown } from "@/ui/track/SearchDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import UpdateStatus from "@/ui/track/UpdateStatus";

import { ApplicationStage, useTrack, Application } from "@/lib/store/track";

interface NewApplicationModalProps {
  open: boolean;
  handleClose: () => void;
  applicationStatus: ApplicationStage;
  setApplicationStatus: React.Dispatch<React.SetStateAction<ApplicationStage>>;
  existingApplication?: Application;
}

const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Internship"];
const companyOptions = ["Google", "Netflix", "Amazon", "Facebook", "Apple"];
const testProviderOptions = [
  "HackerRank",
  "Codility",
  "LeetCode",
  "HackerEarth",
];

export default function NewApplicationModal({
  open,
  handleClose,
  applicationStatus,
  setApplicationStatus,
  existingApplication
}: NewApplicationModalProps) {
  const [roleTitle, setRoleTitle] = useState(existingApplication?.roleTitle || "");
  const [location, setLocation] = useState(existingApplication?.location || "");
  const [jobType, setJobType] = useState(existingApplication?.jobtype || "");
  const [company, setCompany] = useState(existingApplication?.companyName || "");
  const [dateApplied, setDateApplied] = useState(existingApplication?.dateApplied || "");
  const [jobLink, setJobLink] = useState(existingApplication?.applicationURL || "");

  // Extra fields for the form
  const [testProvider, setTestProvider] = useState(existingApplication?.testProvider || "");
  const [currentScore, setCurrentScore] = useState(existingApplication?.currentScore || "");
  const [outOfScore, setOutOfScore] = useState(existingApplication?.outOfScore || "");
  const [interviewingRound, setInterviewingRound] = useState(existingApplication?.interviewingRound || "");

  // Conditions for extra fields
  const showOAFields = ["Online Assesstment", "Interviewing", "Offer"].includes(applicationStatus);
  const showInterviewingFields = ["Interviewing", "Offer"].includes(applicationStatus);
  const { addApplication } = useTrack();


  const handleAddApplication = () => {
    console.log("status: ", applicationStatus);
    if (!applicationStatus) {
      alert("Please select a status before submitting");
      return;
    }

    const newApplication: Application = {
      id:  existingApplication ? existingApplication.id : Date.now().toString(),
      roleTitle,
      location,
      jobtype: jobType, //can't pull the information
      companyName: company, //can't pull the information
      dateApplied,
      applicationURL: jobLink,
      applicationStatus,
      currentScore: applicationStatus === "Online Assesstment" ? currentScore : undefined,
      outOfScore: applicationStatus === "Online Assesstment" ? outOfScore : undefined,
      interviewingRound: applicationStatus === "Interviewing" ? interviewingRound : undefined,
      testProvider: applicationStatus === "Online Assesstment" ? testProvider : undefined,
    };

    addApplication(applicationStatus, newApplication);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        style={{
          width: "70%",
          padding: "30px 40px",
          backgroundColor: "white",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
        onSubmit={handleAddApplication}
      >
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{ marginRight: "10px" }}
          />
          Add New Application
        </Typography>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div style={{ width: "150px" }}>
            <UpdateStatus
              required
              name="status"
              options={[
                "Applied",
                "Rejected",
                "Online Assesstment",
                "Interviewing",
                "Offer",
              ]}
              applicationStatus={applicationStatus}
              setApplicationStage={setApplicationStatus}
            />
          </div>

          <div style={{ display: "flex", gap: "40px" }}>
            <div style={{ flex: 1 }}>
              <InputField
                label="Role Title"
                placeholder="Title"
                name="roleTitle"
                value = {roleTitle}
                required
                fullWidth
                onChange={(e) => setRoleTitle(e.target.value)}
                sx={{ marginBottom: "20px" }}
              />
              <InputField
                label="Location"
                placeholder="Location"
                name="location"
                value = {location}
                fullWidth
                onChange={(e) => setLocation(e.target.value)}
                sx={{ marginBottom: "20px" }}
              />
              <InputField
                label="Date Applied"
                placeholder="mm/dd/yyyy"
                name="dateApplied"
                value = {dateApplied}
                fullWidth
                onChange={(e) => setDateApplied(e.target.value)}
                sx={{ marginBottom: "20px" }}
              />

              {/* Extra fields for the form left side */}
              {showOAFields && (
                <>
                  <Typography variant="h5" sx={{ marginBottom: "10px" }}>
                    Online Assesstment
                  </Typography>
                  <SearchDropdown
                    label="Test Provider"
                    placeholder="Test Provider"
                    name="Test Provider"
                    options={testProviderOptions}
                    value={testProvider}
                    onValueChange={(newValue) =>
                      setTestProvider(newValue || "")
                    }
                    fullWidth
                    style={{ marginBottom: "20px" }}
                  />
                </>
              )}

              {showInterviewingFields && (
                <>
                  <Typography variant="h5" sx={{ marginBottom: "10px" }}>
                    Interviewing
                  </Typography>
                  <SearchDropdown
                    label="Interviewing Round"
                    placeholder="Interviewing Round"
                    name="Interviewing Round"
                    options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                    value={interviewingRound}
                    onValueChange={(newValue) =>
                      setInterviewingRound(newValue || "")
                    }
                    style={{ marginBottom: "20px", width: "33%" }}
                  />
                </>
              )}


              <Button
                variant="contained"
                onClick={handleClose}
                fullWidth
                sx={{
                  marginTop: "20px",
                  color: "#496FFF",
                  backgroundColor: "white",
                  boxShadow: "none",
                  height: "53px",
                  border: "1px solid #E0E3EB",
                  borderRadius: "8px",
                  ":hover": {
                    backgroundColor: "white",
                    border: "1px solid #A6B0C3",
                    boxShadow: "none",
                  },
                }}
              >
                Cancel
              </Button>
            </div>

            <div style={{ flex: 1 }}>
              <SearchDropdown
                label="Company"
                placeholder="Company Name"
                name="company"
                options={companyOptions}
                value={company} // Bind value to company state
                onValueChange={(newValue) => setCompany(newValue || "")} // Update company
                required
                fullWidth
                style={{ marginBottom: "20px" }}
              />
              <SearchDropdown
                label="Job Type"
                placeholder="Type"
                name="jobType"
                options={jobTypeOptions}
                value={jobType} // Bind value to jobType state
                onValueChange={(newValue) => setJobType(newValue || "")} // Update jobType
                required
                fullWidth
                style={{ marginBottom: "20px" }}
              />
              <InputField
                label="Link to Job Application"
                placeholder="Link"
                name="jobLink"
                fullWidth
                value = {jobLink}
                onChange={(e) => setJobLink(e.target.value)}
                style={{ marginBottom: "20px" }}
              />

              {/* Extra fields for the form right side */}
              {showOAFields && (
                <>
                <div style= {{display: "flex", gap: "10px", marginTop:"62px", marginBottom: "140px",width: "100%"}}>
                  {/* Online Assesstment Part */}
                  <InputField
                    label="Current Score"
                    placeholder="Score"
                    name="currentScore"
                    value = {currentScore}
                    onChange={(e) => setCurrentScore(e.target.value)}
                    style={{ marginBottom: "20px" }}
                  />
                  <InputField
                    label="Out of "
                    placeholder=" Out of"
                    name="outOfScore"
                    value = {outOfScore}
                    onChange={(e) => setOutOfScore(e.target.value)}
                    // style={{ marginBottom: "20px" }}
                  />
                </div>
                </>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  marginTop: "20px",
                  height: "53px",
                  boxShadow: "none",
                  borderRadius: "8px",
                  backgroundColor: "#496FFF",
                  ":hover": {
                    backgroundColor: "#3B5AC6",
                    boxShadow: "none",
                  },
                }}
              >
                {existingApplication ? "Save Changes" : "Add"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
