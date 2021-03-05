// Matan Yamin - Frontend: Final Project.
// will be the navbar component
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';


function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);  // reverse the false and true every time we click
    const closeMobileMenu = () => setClick(false)  // handles closing menu

    //this condition is for mobile devices
    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        }
        else{
            setButton(true)
        }
    }

    window.addEventListener('resize', showButton);

    return (
        //Will be the upper part including hamburger menu
        <>
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo"> 
                SkyCleaner
                </Link>
                {/*  when pressing the icon*/}
                <div className="menu-icon" onClick={handleClick}> 
                    {/*  move bewtween images ervery time we click*/}
                    <i className={click ? "fas fa-times" : "fas fa-bars"} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            בית
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            שירותים
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            דוגמה
                        </Link>
                    </li>
                </ul>
                {button && <Button buttonStyle='btn--outline'>לחיצה</Button>} {/*if this true then do it */}
            </div>

        </nav>
        </>
    )
}
export default Navbar