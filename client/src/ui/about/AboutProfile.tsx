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

/**
 * Renders a user profile of a team member of SqueakPeek
 */
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
        borderRadius: "5px",
        boxShadow: "none",
      }}
    >
      <CardHeader
        avatar={
          <Image
            style={{
              borderRadius: 12,
            }}
            width={85}
            height={85}
            src={profilePic}
            alt={`Profile picture of ${name}`}
          />
        }
        title={
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            {name}
          </Typography>
        }
        subheader={<Typography variant="h5">{role}</Typography>}
      />
      <CardContent
        sx={{
          height: "130px",
        }}
      >
        <Typography variant="h5">{description}</Typography>
      </CardContent>
      <CardActions>
        <IconButton
          sx={{
            backgroundColor: "transparent", // makes hover transparent
            "&:hover": {
              backgroundColor: "transparent",
            },
            borderRadius: "45",
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
