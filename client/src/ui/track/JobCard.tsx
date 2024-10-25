"use client";
import {Card, Typography, Button} from "@mui/material";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { faChartColumn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import UpdateStatus from "@/ui/track/UpdateStatus";
import { ApplicationStage } from "@/lib/store/track";

interface JobCardProps {
    Company: string;
    Role: string;
    Status: ApplicationStage;
    setStatus: React.Dispatch<React.SetStateAction<ApplicationStage>>;
}


export function JobCard({Company, Role, Status, setStatus} : JobCardProps ) {
    return (
        <Card >
            <UpdateStatus
              required
              name="status"
              options={["Applied", "OA", "Interviewing", "Offer", "Rejected"]}
              applicationStatus={Status}
              setApplicationStage={setStatus}
            />
            <Typography variant="subtitle1">{Company}</Typography>
            <Typography variant="subtitle2">{Role}</Typography>
            <Button><FontAwesomeIcon icon={faFacebookMessenger} /></Button>
            <Button><FontAwesomeIcon icon={faChartColumn} /></Button>
            <Button><FontAwesomeIcon icon={faLink} /></Button>
        </Card>
    )
}