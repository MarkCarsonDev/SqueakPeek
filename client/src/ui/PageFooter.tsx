"use client";
import Link from "next/link";
import Image from "next/image";
import "./styling/PageFooter.css";

const PageFooter = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Left Section */}
                <div className="footer-section left">
                    <div className="footer-links">
                        <Link href="#" className="footer-link">Explore</Link>
                        <Link href="#" className="footer-link">About Us</Link>
                        <Link href="#" className="footer-link">Contact</Link>
                    </div>
                </div>

                {/* Center Section */}
                <div className="footer-section center">
                    <div className="footer-divider"></div>
                    <h4 className="footer-logo">SqueakPeek</h4>
                    <div className="footer-divider"></div>
                </div>

                {/* Right Section */}
                <div className="footer-section right">
                    <div className="footer-icons">
                        <Image src="/x-logo/X-logo-black.png" alt="X" width={24} height={24} />
                        <Image src="/Instagram-logo/Instagram_Glyph_Black.svg" alt="Instagram" width={24} height={24} />
                        <Image src="/linkedin-icon.svg" alt="LinkedIn" width={24} height={24} />
                        <Image src="/Meta-logo/Meta.png" alt="Meta" width={24} height={24} />
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="footer-bottom">
                <p>© 2024 SQUEAKPEEK</p>
            </div>
        </footer>
    );
};

export default PageFooter;