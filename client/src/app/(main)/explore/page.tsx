import { OpportunityCard } from "@/ui/explore/OpportunityCard";
import { Typography } from "@mui/material";
import {Card} from "@mui/material";
import "@/app/(main)/explore/explore.css";

export default function Page() {
  return (
    <>
      <div className="header-search-container">

        
      </div>
      <div className="card-filter-container">
        <div className="opportunity-column">
          <OpportunityCard />
        </div>

        <Typography>Hello</Typography>
      </div>
    </>
  );
}
