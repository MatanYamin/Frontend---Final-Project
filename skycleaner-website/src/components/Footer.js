import React from "react"
import "./Footer.css"
import {Link} from 'react-router-dom'

function Footer(){
    // Will be the footer section that leads to sicial media and more
    return(
        // details about the buisness. need to speed with the CEO about the content
        <div className="footer-container">
             <div className="footer-links">
                 <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>שרותים</h2>
                        <Link to="/">קישור לאנשהו</Link>
                        <Link to="/">קישור לאנשהו</Link>
                        <Link to="/">קישור לאנשהו</Link>
                        <Link to="/">קישור לאנשהו</Link>
                    </div>
                    <div className="footer-link-items">
                        <h2>לקניית מוצרים</h2>
                        <Link to="/">קישור לאנשהו</Link>
                        <Link to="/">קישור לאנשהו</Link>
                        <Link to="/">קישור לאנשהו</Link>
                        <Link to="/">קישור לאנשהו</Link>
                    </div>
                    <div className="footer-link-items">
                        <h2>להזמנת שרות</h2>
                        <Link to="/">קישור לאנשהו</Link>
                        <Link to="/">קישור לאנשהו</Link>
                        <Link to="/">קישור לאנשהו</Link>
                        <Link to="/">קישור לאנשהו</Link>
                    </div>
                    <div className="footer-link-items">
                        <h2>מי אנחנו?</h2>
                        <Link to="/">איך מגיעים</Link>
                        <Link to="/">צרו קשר</Link>
                        <Link to="/">קישור לאנשהו</Link>
                        <Link to="/">קישור לאנשהו</Link>
                    </div>
                    <div className="footer-link-items">
                        <h2>שרות דחוף</h2>
                        <Link to="/">מילים</Link>
                        <Link to="/">מילים</Link>
                        <Link to="/">קישור</Link>
                        <Link to="/">קישור לאנשהו</Link>
                    </div>
                </div>
            </div>
            {/* the social media logos */}
            <section className="social-media">
                <div className="social-media-wrap">
                    <div className="footer-logo">
                       <Link to="/" className="social-logo">
                           סקיי קלינר
                       </Link>
                    </div>
                    <small className="website-rights"><br/> <i className="fas fa-code"></i> <a className="credit-MY" href="https://www.linkedin.com/in/matan-yamin-40283b199/"> Client & Server side: Build by Matan Yamin </a><i className="fas fa-code"></i></small>
                    <div className="social-icons">
                        <a className="social-icon-link facebook"
                        target="_blank"
                        href="https://www.facebook.com/SkyCleanerIsrael"
                        aria-label="Facebook">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a className="social-icon-link instagram"
                        target="_blank"
                        href="https://www.instagram.com/skycleaner1/"
                        aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a className="social-icon-link phone"
                        target="_blank"
                        href="tel:054-220-1042"
                        aria-label="Phone">
                            <i className="fas fa-phone"></i>
                        </a>
                        <a className="social-icon-link whatsapp"
                        // target="_blank"
                        href="https://api.whatsapp.com/send?phone=972542201042&lang=he"
                        aria-label="Whatsapp">
                            <i className="fab fa-whatsapp"></i>
                        </a>
                        <a className="social-icon-link email"
                        target="_blank"
                        href="mailto:skycleanerisrael@gmail.com"
                        aria-label="Email">
                            <i className="fas fa-envelope"></i>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Footer