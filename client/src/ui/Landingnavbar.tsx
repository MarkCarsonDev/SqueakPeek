"use client";
import Image from "next/image"
import Link from "next/link"
import { Button, Typography } from "@mui/material";
import "./styling/landingnavbar.css"
import { customTheme } from "@/theme/theme";
import {ThemeProvider} from "@mui/material";

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
                        <Link href='/log In' className="nav-item" color="secondary">
                        <Typography>
                            Log In
                        </Typography>   
                        </Link>
                    </li>

                    <li className="nav-list">
                        
                            <ThemeProvider theme={customTheme}>
                                <Button className="nav-item" variant="contained" href="/signup" 
                                    sx={{
                                    backgroundColor: '#496FFF',
                                    borderRadius: '8px',
                                    padding: '10px 60px',
                                    fontSize: '18px',
                                    '&:hover': {
                                        backgroundColor: '#3C435C', 
                                        transform: 'scale(1.05)',
                                    },
                                    }}>

                                    <Typography>
                                        Get Started
                                    </Typography>

                                </Button>
                            </ThemeProvider>
                    </li>
                </ul>

            </div>
        </div>
    </nav>
    )
}