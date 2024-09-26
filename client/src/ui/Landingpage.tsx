
import "./styling/Landingpage.css";
import Image from "next/image";
import TextCarousel from "./lpTextCarousel";
import { Typography } from "@mui/material";
import Link from '@mui/material/Link';



function Home(){
    return(
        <div>
            <div className="sec1-container">
                <div className="sec1-box">
                    <div className="sec1-text-wheel">
                        <TextCarousel />
                    </div>
                    <div className="sec1-logo-box"> 
                        <Image className="sec1-main-logo"
                            src="/rat_1.png"
                            width={300}
                            height={300}
                            alt="SqueakPeek Logo"
                        />
                        <Typography variant="h2">
                            SqueakPeek
                        </Typography>
                        <Typography className="sec1-logo-text" variant="h4">
                            Job hunting is hard,
                            we’re here to help.
                        </Typography>

                    </div>
                    <div className="sec1-Link">
                    <Link href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                        <Typography variant="h5">
                            Get Started
                        </Typography>
                    </Link>
                    </div>
                </div>
            </div>

            <div className="sec2-container">
                <Image className="sec2-image"
                    src="/rat_2.png"
                    width={600}
                    height={300}
                    alt="Two rats speaking"
                />

                <div className="sec2-text-box">
                    <Typography variant="h3">
                        Talk to other applicants
                    </Typography>

                    <Typography variant="body1">
                        Engage with company thread to ask questions and support fellow applicants
                    </Typography>
                </div>
            </div>

            <div className="sec3-container">
                <Image className="sec3-image"
                    src="/rat_1.png"
                    width={400}
                    height={400}
                    alt="Rat looking up"
                />
                <div className="sec3-text-box">
                    <Typography variant="h3">
                        Track your applications
                    </Typography>

                    <Typography variant="body1">
                    Streamline your job search with ease using our tracking board
                    </Typography>
                </div>

            </div>

            <div className="sec4-container">
                <Image className="sec4-image"
                    src="/rat_3.png"
                    width={400}
                    height={400}
                    alt="Rat looking at star"
                />
                <div className="sec4-text-box">
                    <Typography variant="h3">
                        Gain Insight
                    </Typography>

                    <Typography variant="body1">
                        View helpful stats about job openings with a single glance.
                    </Typography>
                </div>

            </div>

        </div>
        
    );
}

export default Home;