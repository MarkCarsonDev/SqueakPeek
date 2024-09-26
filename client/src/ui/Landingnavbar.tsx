"use client";
import Image from "next/image"
import Link from "next/link"
import { Button } from "@mui/material";
import "./styling/landingnavbar.css"

export default function Landingnavbar(){

    return(
    <nav className="navbar">
        <div className="navbar-container">
            <Link href='/' className="name-logo">
                
                <div className="logo">
                    <Image
                        src="/rat_1.png"
                        height={100}
                        width={100}
                        alt="Squeakpeek Logo"
                        />
                </div>SqueakPeek
            </Link>
            <div className="nav-menu">
                <ul className="nav-links">
                    <li className="nav-list">
                        <Link href='/log In' className="nav-item">
                            Log In
                        </Link>
                    </li>

                    <li className="nav-list">
                        <Link href="/signup" className="nav-item">
                            <Button variant="contained" href="/signup" size="large">
                            Get Started
                            </Button>
                        </Link>
                    </li>
                </ul>

            </div>
        </div>
    </nav>
    )
}