import { Card, CardHeader, Typography } from "@mui/material";
import Image from "next/image";
export interface IAboutProfile {
  name: string;
  role: string;
  description: string;
  linkedInURl: string;
  profilePic: string;
}
export function AboutProfile({
  name,
  role,
  description,
  linkedInURl,
  profilePic,
}: IAboutProfile) {
  return (
    <Card
      className="borderline"
      sx={{
        maxWidth: 345,
      }}
    >
      <CardHeader
        avatar={
          <Image
            style={{
              borderRadius: 12,
            }}
            width={75}
            height={75}
            src={profilePic}
            alt={`Profile picture of ${name}`}
          />
        }
        title={
          <Typography sx={{ fontWeight: "bold" }} variant="body1">
            Mekhi Hart Dela Cruz
          </Typography>
        }
        subheader={<Typography variant="subtitle1">{role}</Typography>}
      ></CardHeader>
    </Card>
  );
}
