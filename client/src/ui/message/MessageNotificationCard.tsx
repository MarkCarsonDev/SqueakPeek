import Link from "next/link";
import {
  Card,
  CardHeader,
  Avatar,
  CardActionArea,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { ProfileAvatar, AvatarTypes } from "../ProfileAvatar";
import { useFetchCompanyLogo } from "@/lib/hooks/useFetchCompanyLogo";

export interface MessageNotificationCardProps {
  avatar: string;
  header: string;
  subHeader: string;
  conversation_id: string;
  isSelected?: boolean;
  isRead: boolean;
}

/**
 * Card component that shows messages that the current user is involved with.
 * @param avatar - Media that renders the picture of the MessageNotificationCard
 * @param header - Header text
 * @param subheader - Subheader text
 * @param conversation_id - The ID used to navigate the user to the conversation
 */
export function MessageNotificationCard({
  avatar,
  header,
  subHeader,
  conversation_id,
  isSelected,
  isRead,
}: MessageNotificationCardProps) {
  const pathName = usePathname();
  const currentTab = pathName.split("/")[2]; // tab is either company or private
  const textColor = isSelected ? "white" : "#3C435C";
  const isTabPrivateConversation = currentTab === "private";

  const companyLogoURL = useFetchCompanyLogo(header);

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
          display: "flex",
        }}
      >
        <CardActionArea
          style={{
            display: "grid",
            gridTemplateColumns: "92% 8%",
          }}
        >
          <CardHeader
            avatar={
              isTabPrivateConversation ? (
                <ProfileAvatar
                  width="40px"
                  height="40px"
                  avatar={avatar as AvatarTypes}
                />
              ) : (
                <Avatar src={companyLogoURL} />
              )
            }
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
              <div
                style={{
                  width: "80%", // TODO Make this resonsive for smaller screens
                }}
              >
                <Typography
                  component={"p"}
                  noWrap
                  sx={{
                    color: textColor,
                  }}
                  variant="caption"
                >
                  {subHeader}
                </Typography>
              </div>
            }
          />

          {/** Status on whether the conversation has been read or not */}
          {/** This only applies to private conversations. Company Threads are by defualt read */}

          <div>
            {!isRead && (
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "10px",
                  backgroundColor: "#496FFF",
                }}
              />
            )}
          </div>
        </CardActionArea>
      </Card>
    </Link>
  );
}
