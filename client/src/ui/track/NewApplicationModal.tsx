"use client";
import React, { useState } from "react";
import { Modal, Typography, Button } from "@mui/material";
import { InputField } from "@/ui/InputField";
import { SearchDropdown } from "@/ui/track/SearchDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import UpdateStatus from "@/ui/track/UpdateStatus";
import { ApplicationStage, useTrack, Application } from "@/lib/store/track";
import { v4 as uuidv4 } from 'uuid';
import { useProfile } from "@/lib/store/profile";
// TODO: Implement the Company Brand Logo based on the company name on when editing the application
interface NewApplicationModalProps {
  open: boolean;
  handleClose: () => void;
  applicationStatus: ApplicationStage;
  setApplicationStatus: React.Dispatch<React.SetStateAction<ApplicationStage>>;
  existingApplication?: Application;
}

const jobTypeOptions = ["Internship", "New Grad", "Co-Op", "Full-time", "Part-Time", "Contract"]; // This is temporary
const companyOptions = ["Google", "Netflix", "Amazon", "Facebook", "Apple"];
const testProviderOptions = [
  "HackerRank",
  "Codility",
  "LeetCode",
  "HackerEarth",
]; // This is also temoporary

export default function NewApplicationModal({
  open,
  handleClose,
  applicationStatus,
  setApplicationStatus,
  existingApplication,
}: NewApplicationModalProps) {
  const [role_title, setRoleTitle] = useState(existingApplication?.role_title || "");
  const [location, setLocation] = useState(existingApplication?.location || "");
  const [type, setJobType] = useState(existingApplication?.type || "");
  const [company_name, setCompany] = useState(existingApplication?.company_name || "");
  const [dateApplied, setDateApplied] = useState(existingApplication?.created_at || "");
  const [jobLink, setJobLink] = useState(existingApplication?.link || "");

  // Extra fields for the form
  const [testProvider, setTestProvider] = useState(existingApplication?.test_provider || "");
  const [currentScore, setCurrentScore] = useState(existingApplication?.currentScore || "");
  const [outOfScore, setOutOfScore] = useState(existingApplication?.outOfScore || "");
  const [interviewingRound, setInterviewingRound] = useState(existingApplication?.interviewing_round || "");

  // Conditions for extra fields
  const showOAFields = ["Online Assessment", "Interviewing", "Offer"].includes(applicationStatus as string);
  const showInterviewingFields = ["Interviewing", "Offer"].includes(applicationStatus as string);
  const { updateApplication, addApplication } = useTrack();
  const { profile } = useProfile();
  const handleAddApplication = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    console.log("status: ", applicationStatus);
    if (!applicationStatus) {
      alert("Please select a status before submitting");
      return;
    }

    if (!profile) {
      console.error("User must be authenticated to add an application");
      return;
    }

    const updatedFields: Partial<Application> = {
      //application_id: existingApplication ? existingApplication.application_id : uuidv4(),
      role_title: role_title, // Ensure non-null value for required fields
      location: location,
      type: type,
      company_name: company_name,
      created_at: dateApplied,
      link: jobLink,
      status: applicationStatus as "Rejected" | "Interviewing" | "Offer" | "Applied" | "Online Assessment" ,
      currentScore: currentScore ? Number(currentScore) : undefined,
      outOfScore: outOfScore ? Number(outOfScore) : undefined,
      interviewing_round: interviewingRound,
      test_provider: testProvider,
    };

    if (existingApplication) {
      // Call updateApplication with application ID and partial updates
      updateApplication(existingApplication.application_id, updatedFields);
    } else {
      // If it's a new application, call addApplication as before
      try {
        await addApplication(applicationStatus, updatedFields as Application, profile);
      } catch (error) {
        console.error("Error adding application:", error);
      }
    }

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
          gap: "0px 30px",
        }}
        
        onSubmit={handleAddApplication}
      >
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{ marginRight: "10px" }}
          />
          {existingApplication ? "Edit Application" : "Add New Application"}
        </Typography>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ width: "150px" , marginBottom: "10px" }}>
            <UpdateStatus
              required
              name="status"
              options={[
                "Applied",
                "Rejected",
                "Online Assessment",
                "Interviewing",
                "Offer",
              ]}
              applicationStatus={applicationStatus}
              setApplicationStage={setApplicationStatus}
            />
          </div>
          {/* Left side column */}
          <div style={{ display: "flex", gap: "40px" }}>
            <div style={{ flex: 1 }}>
              <InputField
                label="Role Title"
                placeholder="Title"
                name="roleTitle"
                value={role_title}
                required
                fullWidth
                onChange={(e) => setRoleTitle(e.target.value)}
                sx={{ marginBottom: "10px" }}
              />
              <InputField
                label="Location"
                placeholder="Location"
                name="location"
                value={location}
                fullWidth
                onChange={(e) => setLocation(e.target.value)}
                sx={{ marginBottom: "10px" }}
              />
              <InputField
                label="Date Applied"
                placeholder="mm/dd/yyyy"
                name="dateApplied"
                value={dateApplied}
                fullWidth
                onChange={(e) => setDateApplied(e.target.value)}
                sx={{ marginBottom: "10px" }}
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
                    style={{ marginBottom: "10px" }}
                  />
                </>
              )}
            </div>
            {/* Right side column */}
            <div style={{ flex: 1 }}>
              <SearchDropdown
                label="Company"
                placeholder="Company Name"
                name="company"
                options={companyOptions}
                value={company_name} // Bind value to company state
                onValueChange={(newValue) => setCompany(newValue || "")} // Update company
                required
                fullWidth
                style={{ marginBottom: "10px" }}
              />
              <SearchDropdown
                label="Job Type"
                placeholder="Type"
                name="jobType"
                options={jobTypeOptions}
                value={type} // Bind value to jobType state
                onValueChange={(newValue) => setJobType(newValue || "")} // Update jobType
                required
                fullWidth
                style={{ marginBottom: "10px" }}
              />
              <InputField
                label="Link to Job Application"
                placeholder="Link"
                name="jobLink"
                fullWidth
                value={jobLink}
                onChange={(e) => setJobLink(e.target.value)}
                style={{ marginBottom: "10px" }}
              />
              {/* Extra fields for the form right side */}
              {showOAFields && (
                <>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "62px",
                      marginBottom: "0px",
                      width: "100%",
                    }}
                  >
                    {/* Online Assesstment Part */}
                    <InputField
                      label="Current Score"
                      placeholder="Score"
                      name="currentScore"
                      value={currentScore}
                      onChange={(e) => setCurrentScore(e.target.value)}
                      style={{ marginBottom: "10px" }}
                    />
                    <InputField
                      label="Out of "
                      placeholder=" Out of"
                      name="outOfScore"
                      value={outOfScore}
                      onChange={(e) => setOutOfScore(e.target.value)}
                      // style={{ marginBottom: "20px" }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {showInterviewingFields && (
            <>
              <Typography variant="h5" sx={{ marginBottom: "10px" }}>
                Interviewing
              </Typography>
              <SearchDropdown
                label="Interviewing Round"
                placeholder="Interviewing Round"
                name="Interviewing Round"
                options={["1", "2", "3", "4+"]}
                value={interviewingRound}
                onValueChange={(newValue) =>
                  setInterviewingRound(newValue || "")
                }
                style={{ marginBottom: "20px", width: "48.1%" }}
              />
            </>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
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
                width: "48.5%",
                ":hover": {
                  backgroundColor: "white",
                  border: "1px solid #A6B0C3",
                  boxShadow: "none",
                },
              }}
            >
              Cancel
            </Button>

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
                width: "48.5%",
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
      </form>
    </Modal>
  );
}
