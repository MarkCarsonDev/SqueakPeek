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
}

export function OpportunityCard({
  title,
  dateRangeStart,
  dateRangeEnd,
  jobPosition,
  jobType,
  positionStatus,
  userPositionStatus,
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
      <Typography variant="h5" sx={{ marginInline: '20px' }}>
        {jobPosition}, {jobType}
      </Typography>
      <Typography sx={{ marginInline: '20px' }}>
        Position Status: {positionStatus}
      </Typography>
      <Typography sx={{ marginInline: '20px' }}>
        Application Status: {userPositionStatus}
      </Typography>

      <CardContent>{/* Additional content if needed */}</CardContent>
    </Card>
  );
}
