import React from "react"
import './MiddleSection.css';
import "../App.css";
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';


function MiddleSection() {
    return(
        <div className="middle-container">
            <img class="first-img-logo" src="https://i.ibb.co/yh7CyXp/Sky-Cleaner.jpg" />
            <a href="something" class="button1">צפו בהגרלות שלנו!</a>
            <a href="/SOS" class="button1">צריכים שרות דחוף?</a>
        </div>
    )
}

export default MiddleSection