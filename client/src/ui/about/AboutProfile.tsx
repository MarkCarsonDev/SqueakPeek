import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
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
      />
      <CardContent>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions>
        <IconButton
          sx={{
            backgroundColor: "transparent", // makes hover transparent
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          aria-label="LinkedIn"
          href={linkedInURl}
          target="_blank" // creates a new tab when LinkedIn icon is clicked
        >
          <FontAwesomeIcon size="2x" color="#0b66c2" icon={faLinkedin} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
