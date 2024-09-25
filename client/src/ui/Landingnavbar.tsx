"use client";
import Image from "next/image"
import Link from "next/link"
import Button from "./button"
import "./landingnavbar.css"

export default function Landingnavbar(){

    const handleClick = () => {

    }

    return(
    <nav className="navbar">
        <div className="navbar-container">
            <Link href='/' className="name-logo">
                
                <div className="logo">
                    <Image
                        src="/ratlogo.png"
                        height={100}
                        width={100}
                        alt="RAT logo"
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
                        <Link href="/threads" className="nav-item">
                            <Button text="Get Started" onClick={handleClick} />
                        </Link>
                    </li>
                </ul>

            </div>
        </div>
    </nav>
    )
}