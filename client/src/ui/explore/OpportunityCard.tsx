"use client";

import { Database } from "@/lib/types/database.types";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  Button,
  Avatar,
} from "@mui/material";
import {
  faAnglesUp,
  faAnglesDown,
  faComment,
  faReply,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OpportunityStackedBarGraph } from "./OpportunityStackedBarGraph";
import Link from "next/link";
import { useFetchCompanyLogo } from "@/lib/hooks/useFetchCompanyLogo";
import { OpportunityStatsModal } from "./OpportunityStatsModal";
import { OpportunityBookmark } from "../message/OpportunityBookmark";
import { ApplicationStage, useTrack, Application } from "@/lib/store/track";
import { useProfile } from "@/lib/store/profile";
import { convertToYYYYMMDD } from "@/lib/utils/dateUtils";
import { useAlert } from "@/lib/store/alert";
import { useState } from "react";
import { useEffect } from "react";

interface jobStats {
  status: string;
  color: string;
  quantity: number | null;
}

export interface Aggregate {
  rejected: number | null;
  interviewing: number | null;
  offered: number | null;
  totalApplied: number | null;
  oa: number | null;
  month?: number | null;
}

export interface OpportunityCardProps {
  conversation_id: string;
  opportunity: Database["public"]["Tables"]["opportunity"]["Row"] & {
    opportunity_tracking:
      | Database["public"]["Tables"]["opportunity_tracking"]["Row"][]
      | null;
  };
  aggregate: Aggregate;
}

export function OpportunityCard({
  conversation_id,
  opportunity,
  aggregate,
}: OpportunityCardProps) {
  // TODO: Replace this with real status from props
  const appliedStatus = false;
  const hiringStatus = false;

  const { setAlert } = useAlert();
  const { addApplication, checkExistApplication } = useTrack();
  const { profile } = useProfile();

  

  // Array for mapping the job stats
  const stats: jobStats[] = [
    {
      status: "Rejected:",
      color: "#C7253E",
      quantity: aggregate.rejected,
    },
    {
      status: "OA:",
      color: "#EB5B00",
      quantity: aggregate.oa,
    },
    {
      status: "Interviewing:",
      color: "#F0A202",
      quantity: aggregate.interviewing,
    },
    {
      status: "Offered:",
      color: "#2E7E33",
      quantity: aggregate.offered,
    },
  ];

  const { company_name, role_title, type, opportunity_id } = opportunity;
  const { rejected, interviewing, offered, totalApplied, oa, month } = aggregate;
  const isAppliedColor = appliedStatus ? "green" : "red";
  const isHiringColor = hiringStatus ? "green" : "red";

  const logoUrl = useFetchCompanyLogo(company_name);

  const [addApp, setAddApp] = useState(() =>
    checkExistApplication(opportunity_id)
  );

  

  useEffect(() => {
    setAddApp(checkExistApplication(opportunity_id));
  }, [opportunity_id, checkExistApplication]);

  const added = addApp ? "Added" : "Add";

  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  const updatedFields: Partial<Application> = {
    created_at: convertToYYYYMMDD(formattedDate),
    role_title: role_title,
    type: type,
    company_name: company_name,
    status: "Applied",
    profile_id: profile?.profile_id,
  };

  // TODO: You should run checkExistApplication(opportunity.opportunity_id) before adding application
  // if it returns false, then can make the button visiable to add application then convert grey out button
  // if it return true, then make the button grey out and not visiable
  //

  if (!profile) {
    return null; // Return `null` explicitly for clarity
  }

  const handleaddapplication = () => {
    if (checkExistApplication(opportunity_id) === false) {
      addApplication(
        "Applied" as ApplicationStage,
        updatedFields as Application,
        profile
      );
      setAlert({ message: "Application added to your tracker", type: "success" });
    } else {
      setAlert({ message: "Application already exists in your tracker", type: "error" });
    }
    // addApplication("Applied" as ApplicationStage, updatedFields as Application, profile);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: role_title,
          text: `Check out this job opportunity for ${role_title} at ${company_name}.`,
          url: window.location.href,
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  return (
    <Card
      style={{
        border: "solid 3px #e0e4f2",
        margin: "1.5rem 0",
        borderRadius: "20px",
        padding: ".75rem 2rem",
      }}
    >
      {/* Card Header in a div with Bookmark */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 0,
          padding: ".5rem 0rem",
        }}
      >
        {/* TODO: Add real header */}
        <CardHeader
          style={{
            margin: 0,
            padding: ".5rem",
            height: "2rem",
          }}
          avatar={<Avatar src={logoUrl} />}
          title={company_name}
          subheader={
            // Job Postion and Job Type in header

            role_title + " " + type
          }
          // sx={{ backgroundColor: "#F6F8FF" }}
        />

        {/* Button to threads and button to share Still in progress */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            padding: "0 .5rem",
            margin: 0,
          }}
        >
          <Link href={`/message/company/${conversation_id}`}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#496FFF",
                height: "40px",
                width: "auto",
                borderRadius: "20px",
                boxShadow: "none",
              }}
            >
              <FontAwesomeIcon
                icon={faComment}
                style={{ fontSize: "1.2rem" }}
              />
            </Button>
          </Link>

          <OpportunityStatsModal />

          <Button
            variant="contained"
            style={{
              backgroundColor: "#496FFF",
              height: "40px",
              width: "auto",
              borderRadius: "20px",
              boxShadow: "none",
            }}
            onClick={handleShareClick}
          >
            <FontAwesomeIcon icon={faReply} />
            <Typography
              variant="subtitle1"
              style={{ color: "white", marginLeft: ".5rem" }}
            >
              Share
            </Typography>
          </Button>

          {/* Bookmark button */}
          <OpportunityBookmark conversationId={conversation_id} size="2rem" />
        </div>
      </div>

      <CardContent
        style={{
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Opporunity status and user relative opportunity status */}
        <div
          style={{
            display: "flex",
            margin: 0,
            padding: ".5rem 0rem",
            gap: "1rem",
            width: "100%",
            justifyContent: "flex-start",
          }}
        >
          <Chip
            label={appliedStatus ? "Applied" : "Not Applied"}
            variant="outlined"
            style={{
              color: isAppliedColor,
              borderColor: isAppliedColor,
              margin: 0,
            }}
          />

          <Chip
            icon={
              <FontAwesomeIcon
                style={{
                  marginLeft: ".5rem",
                  color: isHiringColor,
                }}
                icon={hiringStatus ? faAnglesUp : faAnglesDown}
              />
            }
            label={hiringStatus ? "Actively Hiring" : "Not Hiring"}
            variant="outlined"
            style={{
              color: isHiringColor,
              borderColor: isHiringColor,
              margin: 0,
            }}
          />
        </div>

        {/* Opportunity stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "1rem 3rem ",
            gap: "1rem",
            margin: "0",
          }}
        >
          {stats.map((stats) => (
            <Chip
              key={stats.status}
              label={`${stats.status} ${stats.quantity}`}
              variant="outlined"
              style={{
                color: stats.color,
                borderColor: stats.color,
                margin: 0,
                width: "150px",
              }}
            />
          ))}
        </div>

        {/* Stacked Bar Graph For Stat Visual */}
        <div
          style={{
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            width: "80%",
          }}
        >
          <OpportunityStackedBarGraph
            rejected={rejected}
            oa={oa}
            interviewing={interviewing}
            offered={offered}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div></div>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Total Applied: {totalApplied}
          </Typography>

          <Button
            onClick={handleaddapplication}
            disabled={addApp}
            variant="contained"
            style={{
              height: "40px",
              width: "auto",
              borderRadius: "20px",
              boxShadow: "none",
              backgroundColor: addApp ? "gray" : "#496FFF",
            }}
          >
            <FontAwesomeIcon icon={faPlus} style={{ color: "white", marginRight: "5px", fontSize: "1.5rem" }} />
            <Typography style={{color: "white"}}>{added}</Typography>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
