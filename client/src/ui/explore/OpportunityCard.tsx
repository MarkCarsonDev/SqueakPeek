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
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OpportunityTimeline } from "./OpportunityTimeline";
import { useState } from "react";

interface OpportunityCardProps {
  id: number;
  title: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  jobPosition: string;
  jobType: string;
  jobAvatar: string;
  positionStatus: boolean;
  userPositionStatus: boolean;
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
  dateRangeStart,
  dateRangeEnd,
  jobPosition,
  jobType,
  jobAvatar,
  positionStatus,
  userPositionStatus,
  totalApplied,
  rejected,
  oa,
  interviewing,
  offered,
  recentMessages,
  bookmarked : initialBookmarked,
}: OpportunityCardProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const stats: jobStats[] = [
    {
      status: "Total Applied:",
      color: "black",
      quantity: totalApplied,
    },
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

  return (
    <Card
      style={{
        border: "solid 3px #e0e4f2",
        margin: "1.5rem 0",
        borderRadius: "20px",
        padding: ".5rem 2rem",
      }}
    >
      {/* Card Header in a div with Bookmark */}
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", margin: 0}}>
      <CardHeader
        style={{ margin: 0, padding: ".5rem", height: "2rem" }}
        avatar={<Avatar src={jobAvatar}></Avatar>}
        title={<Typography variant="h5">{title}</Typography>}
        subheader={
          <Typography variant="body2">
            {dateRangeStart} - {dateRangeEnd}
          </Typography>
        }
      />

      <IconButton onClick={handleBookmark}>
      <FontAwesomeIcon icon={bookmarked? faBookmark: regularBookmark } size="2x" color="#496FFF"/>
      </IconButton>

      </div>

      {/* Job postion and job type */}
      <Typography variant="h5" sx={{ padding: ".5rem .5rem" }}>
        {jobPosition}, {jobType}
      </Typography>

      {/* Opporunity status and user relative opportunity status */}
      <CardContent
        style={{
          display: "flex",
          margin: 0,
          padding: ".5rem .5rem",
          gap: "1rem",
        }}
      >
        <Chip
          label={userPositionStatus ? "Applied" : "Not Applied"}
          variant="outlined"
          style={{
            color: userPositionStatus ? "green" : "red",
            borderColor: userPositionStatus ? "green" : "red",
            margin: 0,
          }}
        />

        <Chip
          icon={
            <FontAwesomeIcon
              style={{
                marginLeft: ".5rem",
                color: positionStatus ? "green" : "red",
              }}
              icon={positionStatus ? faAnglesUp : faAnglesDown}
            />
          }
          label={positionStatus ? "Actively Hiring" : "Not Hiring"}
          variant="outlined"
          style={{
            color: positionStatus ? "green" : "red",
            borderColor: positionStatus ? "green" : "red",
            margin: 0,
          }}
        />

      </CardContent>

      {/* Opportunity stats */}
      <CardContent
        style={{
          display: "flex",
          justifyContent: "end",
          padding: ".5rem 3rem ",
          gap: "1rem",
          margin: "0",
        }}
      >
        {stats.map((stats) => (
          <Chip
            key={stats.status}
            label={`${stats.status} ${stats.quantity}`}
            variant="outlined"
            sx={{ color: stats.color, borderColor: stats.color }}
          />
        ))}
      </CardContent>

      {/* Timeline section, displays stats of opportunity within date range */}

      <CardContent style={{ display: "flex", justifyContent: "center", margin: 0 }}>
        <OpportunityTimeline id={1}/>
      </CardContent>

      <CardContent style={{display: "flex", gap: "1rem", justifyContent: "flex-start", padding: "0 .5rem"}}>
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
          <FontAwesomeIcon icon={faReply} />
          <Typography
            variant="subtitle1"
            style={{ color: "white", marginLeft: ".5rem" }}
          >
            Share
          </Typography>
        </Button>
      </CardContent>
    </Card>
  );
}
