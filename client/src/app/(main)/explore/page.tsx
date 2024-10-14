import { OpportunityCard } from "@/ui/explore/OpportunityCard";
import { Typography } from "@mui/material";
import {Card} from "@mui/material";
import "@/app/(main)/explore/explore.css";

export default function Page() {
  return (
    <div className="page-container">
      <div className="header-search-container">
        <div className="header-text">
          <Typography sx={{margin: "20px 0"}}><span style={{ fontWeight: "bold" }}>Explore</span> 321 Results</Typography>
          <Typography>Explore entry-level roles, discover the application pipeline,</Typography>
          <Typography>and talk to other applicants in the <span style={{ fontWeight: "bold"}}>company threads</span>.</Typography>
        </div>

      </div>
      <div className="card-filter-container">
        <div className="opportunity-column">
          <OpportunityCard />
        </div>

        <Typography>Hello</Typography>
      </div>
    </div>
  );
}
