import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { AvatarTypes, ProfileAvatar } from "../ProfileAvatar";
export interface MessageBodyProps {
  avatar: AvatarTypes;
  sender_username: string;
  timestamp: string;
  message: string;
  upVotes?: number;
  downVotes?: number;
  messageId: number;
}

/**
 * UI that contains the metadata of a message
 */
export function MessageCard({
  avatar,
  sender_username,
  timestamp,
  message,
  upVotes,
  downVotes,
}: MessageBodyProps) {
  // TODO: Make CardHeader match the UI in figma file
  // TODO: Add upVotes and downVotes component

  console.log(upVotes, downVotes);
  return (
    <Card
      sx={{
        boxShadow: "none",
      }}
    >
      <CardHeader
        avatar={<ProfileAvatar avatar={avatar} />}
        title={sender_username}
        subheader={timestamp}
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