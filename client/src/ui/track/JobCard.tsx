"use client";
import {Card, Typography} from "@mui/material";

interface JobCardProps {
    Company: string;
    Role: string;
}

export function JobCard({Company, Role} : JobCardProps ) {
    return (
        <Card sx={{
            margin: "8px",
            borderRadius: "8px",
            backgroundColor: "white",
            height: "100px",
            width: "90px",
        }}>
            <Typography variant="subtitle1">{Company}</Typography>
            <Typography variant="subtitle2">{Role}</Typography>
        </Card>
    )
}