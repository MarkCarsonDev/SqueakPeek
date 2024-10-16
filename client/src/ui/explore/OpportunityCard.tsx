import {
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';
import { faAnglesUp, faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';

interface OpportunityCardProps {
  id: number;
  title: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  jobPosition: string;
  jobType: string;
  positionStatus: string;
  userPositionStatus: string;
  // Add other necessary props
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  title,
  dateRangeStart,
  dateRangeEnd,
  jobPosition,
  jobType,
  positionStatus,
  userPositionStatus,
}) => {
  const isPositionActive = positionStatus.toLowerCase() === 'actively hiring';
  const hasApplied = userPositionStatus.toLowerCase() === 'applied';

  return (
    <Card sx={{ border: 'solid 3px #e0e4f2', margin: '1rem', borderRadius: "20px" }}>
      <CardHeader
        avatar={
          <Image
            src={`/company-logos/${title.toLowerCase()}.png`}
            alt={`${title} Logo`}
            width={50}
            height={50}
          />
        }
        title={<Typography variant="h6">{title}</Typography>}
        subheader={
          <Typography variant="body2">
            {dateRangeStart} - {dateRangeEnd}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="h5">
          {jobPosition}, {jobType}
        </Typography>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.25rem 0.5rem',
              border: hasApplied ? 'solid 2px green' : 'solid 2px red',
              borderRadius: '10px',
            }}
            variant="body2"
          >
            {hasApplied ? 'Applied' : 'Not Applied'}
          </Typography>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.25rem 0.5rem',
              border: isPositionActive ? 'solid 2px green' : 'solid 2px red',
              borderRadius: '10px',
            }}
            variant="body2"
          >
            {positionStatus}{' '}
            <FontAwesomeIcon
              style={{ marginLeft: '0.25rem' }}
              icon={isPositionActive ? faAnglesUp : faAnglesDown}
            />
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
