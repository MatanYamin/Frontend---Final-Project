// Matan Yamin - Frontend: Final Project.
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';


function Navbar() {
    const [click, setClick] = useState(false);  //when we useing useState we will make "click" false for getting out from menu
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);  // reverse the false and true every time we click and then we can change states
    const closeMobileMenu = () => setClick(false)  // handles closing menu

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        }
        else {
            setButton(true);
        }
    }

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        //Will be the upper part including hamburger menu
        <>
        <nav className="navbar">
            <div className="navbar-container">
                {/*  Main title, links to home page */}
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}> 
                Sky Cleaner
                {/* <img src="https://i.ibb.co/Fbs8KWk/Picture3.jpg" class='icon-img' /> */}
                </Link>
                {/*  when pressing the icon it will alter*/}
                <div className="menu-icon" onClick={handleClick}> 
                    {/*  move bewtween images ervery time we click*/}
                    <i className={click ? "fas fa-times" : "fas fa-bars"} /> 
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                   
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            דף הבית
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/SOS' className='nav-links' onClick={closeMobileMenu}>
                            שרות SOS
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/About' className='nav-links' onClick={closeMobileMenu}>
                            עלינו
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/contact' className='nav-links' onClick={closeMobileMenu}>
                            צרו קשר
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/adminLogin' className='nav-links' onClick={closeMobileMenu}>
                            עמוד ניהול
                        </Link>
                    </li>
                </ul>
            </div>

        </nav>
        </>
    )
}

export default Navbar