// Matan Yamin - Frontend: Final Project.
// will be the navbar component

import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function Navbar() {
    return (
        <>
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="Navbar-logo"> 
                Check Matan
                </Link>
            </div>

        </nav>
        </>
    )
}
export default Navbar