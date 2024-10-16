import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { AvatarTypes, ProfileAvatar } from "../ProfileAvatar";
import { memo } from "react";
import { useProfile } from "../../../lib/store/profile";
export interface MessageCardProps {
  avatar: AvatarTypes;
  sender_username: string;
  timestamp: string;
  message: string;
  upVotes?: number;
  downVotes?: number;
  messageId: string;
}

/**
 * UI that contains the metadata of a message
 */
export const MessageCard = memo(function MessageCard({
  avatar,
  sender_username,
  timestamp,
  message,
  upVotes,
  downVotes,
}: MessageCardProps) {
  // TODO: Make CardHeader match the UI in figma file
  // TODO: Add upVotes and downVotes component
  const { profile } = useProfile();
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
        titleTypographyProps={{
          color: profile?.username === sender_username ? "#496FFF" : "#3C435C",
        }}
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
});
