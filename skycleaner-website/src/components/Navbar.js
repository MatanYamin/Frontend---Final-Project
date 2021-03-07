// Matan Yamin - Frontend: Final Project.
// will be the navbar component
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';


function Navbar() {
    const [click, setClick] = useState(false);  //when we useing useState we will make "click" false for getting out from menu
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);  // reverse the false and true every time we click and then we can change states
    const closeMobileMenu = () => setClick(false)  // handles closing menu

    return (
        //Will be the upper part including hamburger menu
        <>
        <nav className="navbar">
            <div className="navbar-container">
                {/*  Main title, links to home page */}
                <Link to="/" className="navbar-logo"> 
                SkyCleaner
                </Link>
                {/*  when pressing the icon it will alter*/}
                <div className="menu-icon" onClick={handleClick}> 
                    {/*  move bewtween images ervery time we click*/}
                    <i className={click ? "fas fa-times" : "fas fa-bars"} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        {/*will direct to home page for now*/}
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            בית
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            שרותים
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            דוגמה
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            עוד דוגמה
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/contact' className='nav-links' onClick={closeMobileMenu}>
                            צרו קשר
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/admin' className='nav-links' onClick={closeMobileMenu}>
                            עמוד ניהול
                        </Link>
                    </li>
                </ul>
                {/*if this true then do it */}
                {/* {button && <Button buttonStyle='btn--outline'>לחיצה</Button>} */}
            </div>

        </nav>
        </>
    )
}

export default Navbar