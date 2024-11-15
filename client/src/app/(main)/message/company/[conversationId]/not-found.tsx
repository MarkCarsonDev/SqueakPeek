import { Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-regular-svg-icons";
export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5">Company Thread Not Found</Typography>
      <FontAwesomeIcon
        style={{
          marginTop: "10px",
        }}
        size="2x"
        icon={faFaceSadTear}
      />
    </div>
  );
}
