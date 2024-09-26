"use client";
import Image from "next/image"
import Link from "next/link"
import { Button, Typography } from "@mui/material";
import "./styling/landingnavbar.css"

export default function Landingnavbar(){

    return(
    <nav className="navbar">
        <div className="navbar-container">
            <Link href='/' className="name-logo">
                
                <div className="logo">
                    <Image className="logo-image"
                        src="/rat_1.png"
                        height={100}
                        width={100}
                        alt="Squeakpeek Logo"
                        />
                </div>
                <Typography variant="h4">
                    SqueakPeek
                </Typography> 
            </Link>
            <div className="nav-menu">
                <ul className="nav-links">
                    <li className="nav-list">
                        <Link href='/log In' className="nav-item">
                        <Typography>
                            Log In
                        </Typography>   
                        </Link>
                    </li>

                    <li className="nav-list">
                            <Button className="nav-item" variant="contained" href="/signup" size="large">
                            <Typography>
                                Get Started
                            </Typography>
                            </Button>
                    </li>
                </ul>

            </div>
        </div>
    </nav>
    )
}