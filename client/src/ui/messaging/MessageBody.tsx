import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export interface MessageBodyProps {
  avatar: string;
  sender_username: string;
  timestamp: Date;
  message: string;
  upVotes: number;
  downVotes: number;
}
export function MessageBody({
  avatar,
  sender_username,
  timestamp,
  message,
  upVotes,
  downVotes,
}: MessageBodyProps) {
  return (
    <Card>
      <CardHeader
        title={sender_username}
        subheader={timestamp.toDateString()}
      />
      <CardContent>
        <Typography>{message}</Typography>
      </CardContent>
    </Card>
  );
}
