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
import { Database } from "@/lib/types/database.types";

interface NewApplicationModalProps {
  open: boolean;
  handleClose: () => void;
  applicationStatus: ApplicationStage;
  setApplicationStatus: React.Dispatch<React.SetStateAction<ApplicationStage>>;
  existingApplication?: Application;
  onSuccess: (message: string, severity: "success" | "error" | "info" | "warning") => void; // Updated onSuccess prop
}

const jobTypeOptions: Database["public"]["Enums"]["OpportunityType"][] = [
  "Internship",
  "New Grad",
  "Co-Op",
  "Full-time",
  "Part-Time",
  "Contract",
];

const companyOptions = ["Google", "Netflix", "Amazon", "Facebook", "Apple", "Walmart"];
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
  existingApplication,
  onSuccess,
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

  const {
    role_title,
    location,
    type,
    company_name,
    dateApplied,
    jobLink,
    testProvider,
    currentScore,
    outOfScore,
    interviewingRound,
  } = formFields;

  const { updateApplication, addApplication } = useTrack();
  const { profile } = useProfile();

  const handleAddApplication = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile) {
      onSuccess("User must be authenticated to add an application.", "error");
      return;
    }

    const updatedFields: Partial<Application> = {
      application_id: existingApplication?.application_id,
      role_title: role_title,
      location: location,
      type: type,
      company_name: company_name,
      link: jobLink,
      status: applicationStatus,
      currentScore: currentScore ? Number(currentScore) : undefined,
      outOfScore: outOfScore ? Number(outOfScore) : undefined,
      interviewing_round: interviewingRound,
      test_provider: testProvider,
      profile_id: profile.profile_id,
    };

    const result = existingApplication
      ? await updateApplication(existingApplication.application_id, updatedFields as Application, profile)
      : await addApplication(applicationStatus, updatedFields as Application, profile);

    if (result.success) {
      onSuccess(result.message, "success"); // Call onSuccess with the success message
      handleClose(); // Close the modal
    } else {
      onSuccess(result.message, "error"); // Show error message on main page if needed
    }
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
          <div style={{ width: "150px", marginBottom: "10px" }}>
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
                disabled={!!existingApplication}
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

              {["Online Assessment", "Interviewing", "Offer"].includes(
                applicationStatus
              ) && (
                <>
                  <Typography variant="h5" sx={{ marginBottom: "10px" }}>
                    Online Assessment
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

            <div style={{ flex: 1 }}>
              <SearchDropdown
                label="Company"
                placeholder="Company Name"
                name="company_name"
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
                disabled={!!existingApplication}
              />
              <SearchDropdown
                label="Job Type"
                placeholder="Type"
                name="type"
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
                disabled={!!existingApplication}
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

              {["Online Assessment", "Interviewing", "Offer"].includes(
                applicationStatus
              ) && (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "62px",
                    marginBottom: "0px",
                    width: "100%",
                  }}
                >
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
                  />
                </div>
              )}
            </div>
          </div>

          {["Interviewing", "Offer"].includes(applicationStatus) && (
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