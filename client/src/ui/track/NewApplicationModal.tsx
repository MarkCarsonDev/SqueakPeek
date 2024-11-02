"use client";
import React, { useState } from "react";
import { Modal, Typography, Button } from "@mui/material";
import { InputField } from "@/ui/InputField";
import { SearchDropdown } from "@/ui/track/SearchDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import UpdateStatus from "@/ui/track/UpdateStatus";
import { ApplicationStage, useTrack, Application } from "@/lib/store/track";
import { useProfile } from "@/lib/store/profile";
import { createSupabaseClient } from "@/lib/supabase/client";
import { InsertApplication } from "@/lib/utils/InsertApplication";

interface NewApplicationModalProps {
  open: boolean;
  handleClose: () => void;
  applicationStatus: ApplicationStage;
  setApplicationStatus: React.Dispatch<React.SetStateAction<ApplicationStage>>;
  existingApplication?: Application;
}

const jobTypeOptions = ["Internship", "New Grad", "Co-Op", "Full-time", "Part-Time", "Contract"];
const companyOptions = ["Google", "Netflix", "Amazon", "Facebook", "Apple"];
const testProviderOptions = [
  "HackerRank",
  "Codility",
  "LeetCode",
  "HackerEarth",
]; // This is also temporary

export default function NewApplicationModal({
  open,
  handleClose,
  applicationStatus,
  setApplicationStatus,
  existingApplication,
}: NewApplicationModalProps) {
  const [formFields, setFormFields] = useState({
    role_title: existingApplication?.role_title || "",
    location: existingApplication?.location || "",
    type: existingApplication?.type || "",
    company_name: existingApplication?.company_name || "",
    dateApplied: existingApplication?.created_at || "",
    jobLink: existingApplication?.link || "",
    testProvider: existingApplication?.test_provider || "",
    currentScore: existingApplication?.currentScore || "",
    outOfScore: existingApplication?.outOfScore || "",
    interviewingRound: existingApplication?.interviewing_round || "",
  });

  const { role_title, location, type, company_name, dateApplied, jobLink, testProvider, currentScore, outOfScore, interviewingRound } = formFields;

  // Conditions for extra fields
  const showOAFields = ["Online Assessment", "Interviewing", "Offer"].includes(applicationStatus as string);
  const showInterviewingFields = ["Interviewing", "Offer"].includes(applicationStatus as string);
  const { updateApplication, addApplication } = useTrack();
  const { profile } = useProfile(); // Retrieve profile data

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

    const supabase = createSupabaseClient();

    const updatedFields: Partial<Application> = {
      role_title: role_title, // Ensure non-null value for required fields
      location: location,
      type: type,
      company_name: company_name,
      created_at: dateApplied,
      link: jobLink,
      status: applicationStatus as "Applied" | "Rejected" | "Online Assessment" | "Interviewing" | "Offer",
      currentScore: currentScore ? Number(currentScore) : undefined,
      outOfScore: outOfScore ? Number(outOfScore) : undefined,
      interviewing_round: interviewingRound,
      test_provider: testProvider,
      profile_id: profile.profile_id, // Ensure profile_id is set
    };

    if (existingApplication) {
      // Call updateApplication with application ID and partial updates
      updateApplication(existingApplication.application_id, updatedFields);
    } else {
      // If it's a new application, call InsertApplication directly
      addApplication(applicationStatus as ApplicationStage, updatedFields as Application);
      try {
        await InsertApplication(supabase, profile, updatedFields as Application);
      } catch (error) {
        console.error("Error adding application:", error);
      }
    }

    handleClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
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
        onSubmit={handleAddApplication} // Ensure form submission is handled
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
                name="role_title"
                value={role_title}
                required
                fullWidth
                onChange={handleInputChange}
                sx={{ marginBottom: "10px" }}
              />
              <InputField
                label="Location"
                placeholder="Location"
                name="location"
                value={location}
                fullWidth
                onChange={handleInputChange}
                sx={{ marginBottom: "10px" }}
              />
              <InputField
                label="Date Applied"
                placeholder="mm/dd/yyyy"
                name="dateApplied"
                value={dateApplied}
                fullWidth
                onChange={handleInputChange}
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
                    name="testProvider"
                    options={testProviderOptions}
                    value={testProvider}
                    onValueChange={(newValue) =>
                      setFormFields((prevFields) => ({
                        ...prevFields,
                        testProvider: newValue || "",
                      }))
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
                name="company_name" // Bind value to company state
                options={companyOptions}
                value={company_name}
                onValueChange={(newValue) =>
                  setFormFields((prevFields) => ({
                    ...prevFields,
                    company_name: newValue || "",
                  }))
                }
                required
                fullWidth
                style={{ marginBottom: "10px" }}
              />
              <SearchDropdown
                label="Job Type"
                placeholder="Type"
                name="type" // Bind value to jobType state
                options={jobTypeOptions}
                value={type}
                onValueChange={(newValue) =>
                  setFormFields((prevFields) => ({
                    ...prevFields,
                    type: newValue || "",
                  }))
                }
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
                onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      style={{ marginBottom: "10px" }}
                    />
                    <InputField
                      label="Out of "
                      placeholder=" Out of"
                      name="outOfScore"
                      value={outOfScore}
                      onChange={handleInputChange}
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
                name="interviewingRound"
                options={["1", "2", "3", "4+"]}
                value={interviewingRound}
                onValueChange={(newValue) =>
                  setFormFields((prevFields) => ({
                    ...prevFields,
                    interviewingRound: newValue || "",
                  }))
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