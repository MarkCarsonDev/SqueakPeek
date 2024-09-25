
import "./home.css";
import Image from "next/image";
import TextCarousel from "./lpTextCarousel";



function Home(){
    return(
        <div>
            <div className="sec1-container">
                <div className="sec1-box">
                        <TextCarousel />
                    <div className="sec1-logo-box">
                        <Image className="sec1-main-logo"
                            src="/rat_1.png"
                            width={300}
                            height={300}
                            alt="SqueakPeek Logo"
                        />
                        <h1 className="sec1-logo-text">
                            Job hunting is hard,
                            we’re here to help.
                        </h1>

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
                <h1 className="sec2-text-header">
                    Talk to other applicants
                </h1>
                <p className="sec2-text-body">
                    Engage with company thread to ask questions and support fellow applicants.
                </p>

            </div>

            <div className="sec3-container">
                <Image className="sec3-image"
                    src="/rat_1.png"
                    width={400}
                    height={400}
                    alt="Rat looking up"
                />
                <h1 className="sec3-text-header">
                    Track your applications
                </h1>
                <p className="sec3-text-body">
                    Streamline your job search with ease using our tracking board.
                </p>

            </div>

            <div className="sec4-container">
                <Image className="sec4-image"
                    src="/rat_3.png"
                    width={400}
                    height={400}
                    alt="Rat looking at star"
                />
                <h1 className="sec4-text-header">
                    Talk to other applicants
                </h1>
                <p className="sec4-text-body">
                    Engage with company thread to ask questions and support fellow applicants.
                </p>

            </div>

        </div>
        
    );
}

export default Home;