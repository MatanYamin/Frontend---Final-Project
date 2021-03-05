// Matan Yamin - Frontend: Final Project.
// will be the navbar component
import React, {useState} from 'react';
import {Link} from 'react-router-dom';


function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);  // reverse the false and true every time we click
    const closeMobileMenu = () => setClick(false)  // handles closing menu
    return (
        //Will be the upper part including hamburger menu
        <>
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo"> 
                מתן ימין
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
            </div>

        </nav>
        </>
    )
}
export default Navbar