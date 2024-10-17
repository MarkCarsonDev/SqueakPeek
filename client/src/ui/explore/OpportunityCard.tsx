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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

interface OpportunityCardProps {
  id: number;
  title: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  jobPosition: string;
  jobType: string;
  jobAvatar: string
  positionStatus: boolean;
  userPositionStatus: boolean;
  totalApplied: number;
  rejected: number;
  oa: number;
  interviewing: number;
  offered: number;
  recentMessages: number;
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
}: OpportunityCardProps) {
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

  return (
    <Card
      style={{
        border: "solid 3px #e0e4f2",
        margin: "1.5rem 0",
        borderRadius: "20px",
        padding: "1rem",
      }}
    >
      <CardHeader
        style={{ height: "25px", margin: 0 }}
        avatar={<Avatar src={jobAvatar}></Avatar>}
        title={<Typography>{title}</Typography>}
        subheader={
          <Typography variant="body2">
            {dateRangeStart} - {dateRangeEnd}
          </Typography>
        }
      />
      <Typography variant="h5" sx={{ marginLeft: "1.90rem" }}>
        {jobPosition}, {jobType}
      </Typography>
      <CardContent
        style={{ display: "flex", margin: 0, padding: 0, marginLeft: "1.5rem" }}
      >
        <Chip
          label={userPositionStatus ? "Applied" : "Not Applied"}
          variant="outlined"
          sx={{
            color: userPositionStatus ? "green" : "red",
            borderColor: userPositionStatus ? "green" : "red",
          }}
        />

        <Chip
          icon={
            <FontAwesomeIcon
              style={{
                marginLeft: ".25rem",
                color: positionStatus ? "green" : "red",
              }}
              icon={positionStatus ? faAnglesUp : faAnglesDown}
            />
          }
          label={positionStatus ? "Actively Hiring" : "Not Hiring"}
          variant="outlined"
          sx={{
            color: positionStatus ? "green" : "red",
            borderColor: positionStatus ? "green" : "red",
          }}
        />
      </CardContent>
      <CardContent
        style={{
          display: "flex",
          justifyContent: "end",
          marginRight: "3rem",
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
      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        {/* Portion for timeline TODO */}
        <Image
          src="/explore/opportunityLine.svg"
          alt="Opportunity Line"
          height={100}
          width={1100}
        />
      </CardContent>

      <Button
        variant="contained"
        style={{
          backgroundColor: "#496FFF",
          height: "40px",
          width: "auto",
          borderRadius: "20px",
          marginLeft: "1.75rem"
        }}
      >
        <FontAwesomeIcon icon={faComment} /><Typography style={{color: "white", marginLeft: ".5rem"}}>{recentMessages}</Typography>
      </Button>
      <Button variant="contained" style={{
          backgroundColor: "#496FFF",
          height: "40px",
          width: "auto",
          borderRadius: "20px",
          marginLeft: "1rem"
        }}>
            <FontAwesomeIcon icon={faReply}/>
            <Typography  variant="subtitle1"style={{color: "white", marginLeft: ".5rem"}}>Share</Typography>
        </Button>
    </Card>
  );
};
