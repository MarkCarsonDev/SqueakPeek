// OpportunityCard.tsx

import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';
import { faAnglesUp, IconDefinition, faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';

interface OpportunityCardProps {
  title: string;
  jobAvatar: JSX.Element;
  dateRangeStart: string;
  dateRangeEnd: string;
  jobPosition: string;
  jobType: string;
  positionStatus: boolean;
  userPositionStatus: boolean;
}


export function OpportunityCard({
  title,
  jobAvatar,
  dateRangeStart,
  dateRangeEnd,
  jobPosition,
  jobType,
  positionStatus,
  userPositionStatus
}: OpportunityCardProps) {

  return (
    <Card sx={{ border: 'solid 3px #e0e4f2', marginBottom: '3rem', borderRadius: "20px",}}>
      <CardHeader
        sx={{ height: '25px' }}
        avatar={jobAvatar}
        title={<Typography>{title}</Typography>}
        subheader={
          <Typography>
            {dateRangeStart} - {dateRangeEnd}
          </Typography>
        }
      />
      <Typography variant="h5" sx={{ marginInline: "1.5rem" }}>
        {jobPosition}, {jobType}
      </Typography>
      <CardContent sx={{display: "flex", gap: "1rem"}}>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            padding: ".25rem .50rem",
            border: userPositionStatus ? "solid 2px green": "solid 2px red",
            borderRadius: "10px",
            minWidth: "auto",
            height: "15px",
            textAlign: "center",
          }}
          variant='body2'
        >
          {userPositionStatus? "Applied" : "Not Applied"}
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            padding: ".25rem .50rem",
            border: positionStatus ? "solid 2px green": "solid 2px red",
            borderRadius: "10px",
            height: "15px",
            minWidth: "auto",
            textAlign: "center",
          }}
        >
          {userPositionStatus? "Actively Hiring" : "Not Hiring"} <FontAwesomeIcon style={{marginLeft: ".25rem"}} icon={positionStatus ? faAnglesUp :faAnglesDown }/>
        </Typography>
      </CardContent>
      <CardContent sx={{display: "flex", justifyContent: "center"}}>
        <Image
        src="/explore/opportunityLine.svg"
        alt="Opportunity Line"
        height={40}
        width={800}
        />
      </CardContent>
    </Card>
  );
}
