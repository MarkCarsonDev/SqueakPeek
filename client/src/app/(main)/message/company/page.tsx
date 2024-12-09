import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@mui/material";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

/**
 * Company Threads section in the messages page
 */
export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <FontAwesomeIcon
        style={{
          border: "3px solid #E0E4F2",
          padding: "25px",
          borderRadius: "100px",
          marginBottom: "20px",
        }}
        size="3x"
        icon={faMagnifyingGlass}
      />
      <Typography variant="h4">Company Threads</Typography>
      <Typography variant="h6">
        Chat with other applicants in the pipeline
      </Typography>
      <Link
        href={"/explore"}
        color="primary"
        style={{
          width: "300px",
          boxShadow: "none",
          backgroundColor: "#496FFF",
          textDecoration: "none",
          textAlign: "center",
          marginTop: "15px",
          padding: "5px",
          borderRadius: "3px",
        }}
      >
        <Typography
          style={{
            color: "white",
          }}
        >
          Search Company Threads
        </Typography>
      </Link>
    </div>
  );
}
