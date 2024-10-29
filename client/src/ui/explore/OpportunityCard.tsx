"use client";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  faAnglesUp,
  faAnglesDown,
  faComment,
  faReply,
  faBookmark,
  faChartColumn,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { OpportunityStackedBarGraph } from "./OpportunityStackedBarGraph";
import Link from "next/link";
import { OpportunityStatsModal } from "./OpportunityStatsModal";

export interface OpportunityCardProps {
  id: string;
  conversation_id: string;
  title: string;
  jobPosition: string;
  jobType: string;
  jobAvatar: string;
  hiringStatus: boolean;
  appliedStatus: boolean;
  totalApplied: number;
  rejected: number;
  oa: number;
  interviewing: number;
  offered: number;
  recentMessages: number;
  bookmarked: boolean;
}

interface jobStats {
  status: string;
  color: string;
  quantity: number;
}

export function OpportunityCard({
  title,
  jobPosition,
  jobType,
  jobAvatar,
  hiringStatus,
  appliedStatus,
  totalApplied,
  rejected,
  oa,
  interviewing,
  offered,
  recentMessages,
  conversation_id,
  bookmarked: initialBookmarked,
}: OpportunityCardProps) {
  // To be replaced with actuall book mark update from DB
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  // Array for mapping the job stats
  const stats: jobStats[] = [
    {
      status: "Rejected:",
      color: "red",
      quantity: rejected,
    },
    {
      status: "OA:",
      color: "orange",
      quantity: oa,
    },
    {
      status: "Interviewing:",
      color: "gold",
      quantity: interviewing,
    },
    {
      status: "Offered:",
      color: "green",
      quantity: offered,
    },
  ];

  const handleBookmark = () => {
    setBookmarked((prev) => !prev); // Toggle the bookmark state
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: `Check out this job opportunity for ${jobPosition} at ${title}.`,
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
        <CardHeader
          style={{ margin: 0, padding: ".5rem", height: "2rem" }}
          avatar={<Avatar src={jobAvatar} style={{ margin: 0 }}></Avatar>}
          title={<Typography variant="h5">{title}</Typography>}
          subheader={
            // Job Postion and Job Type in header
            <Typography variant="h6">
              {jobPosition}, {jobType}
            </Typography>
          }
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
              <FontAwesomeIcon icon={faComment} />
              <Typography style={{ color: "white", marginLeft: ".5rem" }}>
                {recentMessages}
              </Typography>
            </Button>
          </Link>

          <OpportunityStatsModal/>

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
          <IconButton
            onClick={handleBookmark}
            sx={{ "&:hover": { background: "none" } }}
          >
            <FontAwesomeIcon
              icon={bookmarked ? faBookmark : regularBookmark}
              style={{ fontSize: "2rem" }}
              color="#496FFF"
            />
          </IconButton>
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
              color: appliedStatus ? "green" : "red",
              borderColor: appliedStatus ? "green" : "red",
              margin: 0,
            }}
          />

          <Chip
            icon={
              <FontAwesomeIcon
                style={{
                  marginLeft: ".5rem",
                  color: hiringStatus ? "green" : "red",
                }}
                icon={hiringStatus ? faAnglesUp : faAnglesDown}
              />
            }
            label={hiringStatus ? "Actively Hiring" : "Not Hiring"}
            variant="outlined"
            style={{
              color: hiringStatus ? "green" : "red",
              borderColor: hiringStatus ? "green" : "red",
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
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Total Applied: {totalApplied}
        </Typography>
      </CardContent>
    </Card>
  );
}
