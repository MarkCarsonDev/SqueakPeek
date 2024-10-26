import Link from "next/link";
import { Card, CardHeader, Avatar, CardActionArea } from "@mui/material";
import { usePathname } from "next/navigation";

export interface MessageNotificationCardProps {
  avatar: string;
  header: string;
  subHeader: string;
  conversation_id: string;
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
}: MessageNotificationCardProps) {
  const pathName = usePathname();
  const currentTab = pathName.split("/")[2]; // tab is either company or private
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
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <CardActionArea>
          <CardHeader
            avatar={<Avatar>R</Avatar>}
            title={header}
            subheader={subHeader}
          />
        </CardActionArea>
      </Card>
    </Link>
  );
}
