"use client";
import Link from "next/link";
import Image from "next/image";
import "./styling/PageFooter.css";

const PageFooter = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Media Part */}
                <div className="footer-column">
                    <h4>Social Media</h4>
                    <ul>
                        <li><Link href ="#">Meta</Link></li>
                        <li><Link href ="#">Instagram</Link></li>
                        <li><Link href ="#">X</Link></li>
                        <li><Link href ="#">LinkedIn</Link></li>
                    </ul>
                </div>
                {/* About the Company part */}
                <div className="footer-column">
                    <h4>About</h4>
                    <ul>
                        <li><Link href ="#">Company</Link></li>
                        <li><Link href ="#">Team</Link></li>
                        {/* <li>History</li> */}
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 SQUEAKPEAK</p>
            </div>
        </footer>
    );
};

export default PageFooter;