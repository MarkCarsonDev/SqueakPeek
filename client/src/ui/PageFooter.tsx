"use client";
import Link from "next/link";
import Image from "next/image";
import "./styling/PageFooter.css";
import { Typography } from "@mui/material";

const PageFooter = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Left Section */}
                <div className="footer-section left">
                    <div className="footer-links">
                        <Link href="#" className="footer-link"><Typography>Explore</Typography></Link>
                        <Link href="#" className="footer-link"><Typography>About Us</Typography></Link>
                        <Link href="#" className="footer-link"><Typography>Contact</Typography></Link>
                    </div>
                </div>

                {/* Center Section */}
                <div className="footer-section center">
                    <div className="footer-divider"></div>
                    <Typography className="footer-logo" variant="h4">SqueekPeek</Typography>
                    <div className="footer-divider"></div>
                </div>

                {/* Right Section */}
                <div className="footer-section right">
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
                            <Image src="/Meta-logo/Meta.png" alt="Meta" width={24} height={24} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="footer-bottom">
                <Typography>© 2024 SQUEAKPEEK</Typography>
            </div>
        </footer>
    );
};

export default PageFooter;