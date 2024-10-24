"use client";
import {ButtonProps, Button} from "@mui/material";

/**
 * A custom version of the TextField component with the label design differently
 * @param props ButtonProps
 */

export function JobCard(props: ButtonProps) {
    return (
        <Button
        variant="contained"
        sx={{
            mt: 2,
            width: "80%",
            height: "45px",
            boxShadow: "none",
            backgroundColor: "#F6F8FF",
            border: "1px solid #E0E4F2",
        }}>
        </Button>
    )
}