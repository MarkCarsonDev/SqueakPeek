import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";

export function OpportunityCard({
  title = "Amazon",
  dateRangeStart = "2023",
  dateRangeEnd = "2024",
  jobPostion = "Software Development Engineer",
  jobType = "Internship",
  positionStatus = "Actively Hiring",
  userPositionStatus = "Applied"
}) {
  return (
    <Card sx={{ border: "solid 3px #e0e4f2" }}>
      <CardHeader
        sx={{ height: "25px" }}
        avatar={<Avatar>R</Avatar>}
        title={<Typography>{title}</Typography>}
        subheader={
          <Typography>
            {dateRangeStart} - {dateRangeEnd}
          </Typography>
        }
      />
      <Typography variant="h5" sx={{ marginInline: "20px" }}>
        {jobPostion}, {jobType}
      </Typography>
      <Typography>{userPositionStatus}</Typography>

      <CardContent>

      </CardContent>
    </Card>
  );
}
