import React from 'react';
import "../../App.css"
import "../form-components/Form.css"


export default function SOS() {
    // const page = window.location.pathname.substring(1);
    return(
        <div className="sosService">
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
            </div>
    );
}