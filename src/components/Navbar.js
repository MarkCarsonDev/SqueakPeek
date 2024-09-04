import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { Button } from './Button';


function Navbar() {
const [click, setClick] = useState(false);

const[button, setButton] = useState(true)

const handleClick = () => setClick(!click)

const closeMobileMenu = () => setClick(false)

const showbutton = () => {
    if(window.innerWidth<= 960){
        setButton(false);

    } else{
        setButton(true)
        
    }
}

  return (
<>
<nav className='navbar'>
    <div className='navbarcontainer'>
        
    <div className='menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fa-times' :'fa-solid fa-bars'} />
    </div>

    <Link to='/' className='navbar-logo'>
        RAT<i className='rat-logo' />
    </Link>
    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
            </Link>
            </li>
        <li className='nav-item'>
            <Link to='/Applicationtracker' className='nav-links' onClick={closeMobileMenu}>
                Application Tracker
            </Link>
        </li>
        <li className='nav-item'>
            <Link to='/networkingcenter' className='nav-links' onClick={closeMobileMenu}>
                Networking Center
            </Link>
        </li>
        <li className='nav-item'>
            <Link to='/jobs' className='nav-links' onClick={closeMobileMenu}>
                Jobs
            </Link>
        </li>
        <li className='nav-item'>
            <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                {button && <Button buttonStyle>Log In</Button>}
            </Link>
        </li>  
            
    </ul>
    
    </div>
</nav>
</>
  )
}

export default Navbar
