import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { AvatarTypes, ProfileAvatar } from "../ProfileAvatar";
export interface MessageBodyProps {
  avatar: AvatarTypes;
  sender_username: string;
  timestamp: Date;
  message: string;
  upVotes: number;
  downVotes: number;
}

/**
 * UI that contains the metadata of a message
 */

// TODO: Make CardHeader match the UI in figma file
export function MessageCard({
  avatar,
  sender_username,
  timestamp,
  message,
  upVotes,
  downVotes,
}: MessageBodyProps) {
  return (
    <Card
      sx={{
        boxShadow: "none",
      }}
    >
      <CardHeader
        avatar={<ProfileAvatar avatar={avatar} />}
        title={sender_username}
        subheader={timestamp.toDateString()}
      />
      <CardContent
        sx={{
          marginTop: "-20px",
        }}
      >
        <Typography>{message}</Typography>
      </CardContent>
    </Card>
  );
}
