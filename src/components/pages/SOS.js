import React from 'react';
import "../../App.css";
import "../form-components/Form.css";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import CallIcon from '@material-ui/icons/Call';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

export default function SOS() {
    // const page = window.location.pathname.substring(1);
    return(
        <div className="aboutContent2">
                צריכים ניקיון דחוף?
                <br/>
                צרו איתנו קשר דרך אחד הפורטלים ונשתדל לספק לכם מענה מהיר.
                <br/>
                <div className="social-icons-sos">
                    <a href="https://www.facebook.com/SkyCleanerIsrael"><i className="fab fa-facebook-f"></i></a>
                    &nbsp;&nbsp;
                    <a href="https://www.instagram.com/skycleaner1/"><i className="fab fa-instagram"></i></a>
                    &nbsp;&nbsp;
                    <a href="tel:054-220-1042"><i className="fas fa-phone"></i></a>
                    &nbsp;&nbsp;
                    <a href="https://api.whatsapp.com/send?phone=972542201042&lang=he"><i className="fab fa-whatsapp"></i></a>
                    &nbsp;&nbsp;
                    <a href="mailto:skycleanerisrael@gmail.com"><i className="fas fa-envelope"></i></a>
                    </div>
                    <br/><br/><br/><br/><br/>
                    <div className="thisIcons">
                        <a className="social-icon-link facebook"
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.facebook.com/SkyCleanerIsrael"
                        aria-label="Facebook">
                            <FacebookIcon style={{ fontSize: 65 }} />
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a className="social-icon-link instagram"
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.instagram.com/skycleaner1/"
                        aria-label="Instagram">
                            <InstagramIcon style={{ fontSize: 65 }} />
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a className="social-icon-link phone"
                        target="_blank"
                        rel="noreferrer"
                        href="tel:054-220-1042"
                        aria-label="Phone">
                            <CallIcon style={{ fontSize: 65 }} />
                            <i className="fas fa-phone"></i>
                        </a>
                        <a className="social-icon-link whatsapp"
                        // target="_blank"
                        href="https://api.whatsapp.com/send?phone=972542201042&lang=he"
                        aria-label="Whatsapp">
                            <WhatsAppIcon style={{ fontSize: 65 }} />
                            <i className="fab fa-whatsapp"></i>
                        </a>
                        <a className="social-icon-link email"
                        target="_blank"
                        rel="noreferrer"
                        href="mailto:skycleanerisrael@gmail.com"
                        aria-label="Email">
                            <MailOutlineIcon style={{ fontSize: 65 }} />
                            <i className="fas fa-envelope"></i>
                        </a>
                        </div>
            </div>
    );
}