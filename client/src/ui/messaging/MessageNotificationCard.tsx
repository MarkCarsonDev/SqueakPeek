import Link from "next/link";
import {
  Card,
  CardHeader,
  Avatar,
  CardActionArea,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";

export interface MessageNotificationCardProps {
  avatar: string;
  header: string;
  subHeader: string;
  conversation_id: string;
  isSelected?: boolean;
}

/**
 * Card component that shows messages that the current user is involved with.
 * @param avatar - Media that renders the picture of the MessageNotificationCard
 * @param header - Header text
 * @param subheader - Subheader text
 * @param conversation_id - The ID used to navigate the user to the conversation
 */
export function MessageNotificationCard({
  header,
  subHeader,
  conversation_id,
  isSelected,
}: MessageNotificationCardProps) {
  const pathName = usePathname();
  const currentTab = pathName.split("/")[2]; // tab is either company or private
  const textColor = isSelected ? "white" : "#3C435C";
  return (
    <Link
      style={{
        textDecoration: "none",
      }}
      replace
      href={`/message/${currentTab}/${conversation_id}`}
    >
      <Card
        sx={{
          backgroundColor: isSelected ? "#496FFF" : "transparent",
          boxShadow: "none",
        }}
      >
        <CardActionArea>
          <CardHeader
            avatar={<Avatar>R</Avatar>}
            title={
              <Typography
                sx={{
                  color: textColor,
                }}
              >
                {header}
              </Typography>
            }
            subheader={
              <Typography
                sx={{
                  color: textColor,
                }}
                variant="caption"
              >
                {subHeader}
              </Typography>
            }
          />
        </CardActionArea>
      </Card>
    </Link>
  );
}
