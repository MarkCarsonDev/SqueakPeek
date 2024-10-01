"use client";
import Link from "next/link";
import Image from "next/image";
import {Typography, Divider} from "@mui/material";


/*
This Page Footer will be responisble for rendering the footer of all pages in the project
Except for the Login Page and Sign Up Page
*/

export const PageFooter = () => {
    return (
        <footer>
            {/* Left Section */}
            <div>
                <Link href="#">
                    <Typography>Explore</Typography>
                </Link>
                <Link href="#">
                    <Typography>About Us</Typography>
                </Link>
                <Link href="#">
                    <Typography>Contact</Typography>
                </Link>
            </div>
        </footer>
    )
};
