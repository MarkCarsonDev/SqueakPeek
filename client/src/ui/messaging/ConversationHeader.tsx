import { AvatarProps } from "@mui/material";
import { AvatarTypes } from "../ProfileAvatar";
import { CardHeader } from "@mui/material";
import Image from "next/image";

interface ConversationHeaderProps {
  icon: AvatarProps | AvatarTypes;
}

export function ConversationHeader({ icon }: ConversationHeaderProps) {
  return (
    <CardHeader
      sx={{
        backgroundColor: "yellow",
      }}
    />
  );
}
