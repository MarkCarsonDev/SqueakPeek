// OpportunityCard.tsx

import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';

interface OpportunityCardProps {
  title: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  jobPosition: string;
  jobType: string;
  positionStatus: string;
  userPositionStatus: string;
  psColor: string,
  upsColor: string,
  psAngles: IconDefinition
}

import { faAnglesUp, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function OpportunityCard({
  title,
  dateRangeStart,
  dateRangeEnd,
  jobPosition,
  jobType,
  positionStatus,
  userPositionStatus,
  psColor = "solid 1px green",
  upsColor = "solid 1px green",
  psAngles = faAnglesUp
}: OpportunityCardProps) {
  return (
    <Card sx={{ border: 'solid 3px #e0e4f2', marginBottom: '16px' }}>
      <CardHeader
        sx={{ height: '25px' }}
        avatar={<Avatar>{title ? title.charAt(0) : "*"}</Avatar>}
        title={<Typography>{title}</Typography>}
        subheader={
          <Typography>
            {dateRangeStart} - {dateRangeEnd}
          </Typography>
        }
      />
      <Typography variant="h5" sx={{ marginInline: "1rem" }}>
        {jobPosition}, {jobType}
      </Typography>
      <CardContent sx={{display: "flex", gap: "1rem"}}>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            padding: ".25rem .50rem",
            border: psColor,
            borderRadius: "10px",
            height: "30px",
            minWidth: "auto",
            textAlign: "center",
          }}
        >
          {userPositionStatus}
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            padding: ".25rem .50rem",
            border: upsColor,
            borderRadius: "10px",
            height: "30px",
            minWidth: "auto",
            textAlign: "center",
          }}
        >
          {positionStatus} <FontAwesomeIcon style={{marginLeft: ".25rem"}} icon={psAngles}/>
        </Typography>
      </CardContent>
      <CardContent></CardContent>
    </Card>
  );
}
