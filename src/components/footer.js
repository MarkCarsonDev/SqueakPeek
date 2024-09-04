import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'
import '../App.css';

export default function Footer () {

    <div className='footer'>

        <div className='footercontainer'>
            <div className='socials'>
                <ul className='socialmenu'>
                    <li className='social-items'>
                        <Link to='/' className='social-links'>
                            X
                        </Link>

                    </li>

                    <li className='social-items'>
                        <Link to='/' className='social-links'>
                            Instagram
                        </Link>
                    </li>

                    <li className='social-items'>
                        <Link to='/' className='social-links'>
                            Facebook
                        </Link>
                    </li>

                    <li className='social-items'>
                        <Link to='/' className='social-links'>
                            Linkedin
                        </Link>
                    </li>

                </ul>

            </div>
            <div className='credits'>

            </div>
            <div className='info'>
                
            </div>


        </div>



    </div>

}