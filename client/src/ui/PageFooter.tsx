"use client";
import Link from "next/link";
import Image from "next/image";
import "./styling/PageFooter.css";
import { Typography } from "@mui/material";

export const PageFooter = () => {
    return (
        <footer className="footer container">
            {/* Left Section */}
            <div className="footer-links">
                <Link href="#" className="footer-link">
                    <Typography>Explore</Typography>
                </Link>
                <Link href="#" className="footer-link">
                    <Typography>About Us</Typography>
                </Link>
                <Link href="#" className="footer-link">
                    <Typography>Contact</Typography>
                </Link>
            </div>

            {/* Center Section */}
            <div className="footer-center">
                <Divider className="footer-divider" />
                <Typography className="footer-logo" variant="h4">SqueakPeek</Typography>
                <Divider className="footer-divider" />
            </div>

            {/* Right Section */}
            <div className="footer-icons">
                <Link href="#">
                    <Image src="/x-logo/X-logo-black.png" alt="X" width={24} height={24} />
                </Link>
                <Link href="#">
                    <Image src="/Instagram-logo/Instagram_Glyph_Black.svg" alt="Instagram" width={24} height={24} />
                </Link>
                <Link href="#">
                    <Image src="/Twitter-logo/Twitter_Logo_WhiteOnImage.svg" alt="Twitter" width={24} height={24} />
                </Link>
                <Link href="#">
                    <Image className="meta-logo" src="/Meta-logo/Meta.svg" alt="Meta" width={24} height={24} />
                </Link>
            </div>

            {/* Copyright Section */}
            <Typography className="footer-bottom">© 2024 SQUEAKPEEK</Typography>
        </footer>
    );
};

