import React from "react"
import './MiddleSection.css';
import "../App.css";
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';


function MiddleSection() {
    return(
        <section class="sticky">
        <div class="bubbles">
        <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
        <div className="middle-container">
            <img class="first-img-logo" src="https://i.ibb.co/yh7CyXp/Sky-Cleaner.jpg" />
            <Popup trigger={<a class="button1">צפו בהגרלות שלנו!</a>} >
                <div class="pop-up-content-home">
                    <a class="video-intro">צפו בסרטון ההגרלה האחרונה שנערכה הישארו מעודכנים אחר הגרלות נוספות </a>
                    <br/>
                    <iframe width="560" height="415" src="https://www.youtube.com/embed/IPMN-LqzB7Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
            </Popup>
            <a href="/SOS" class="button1">צריכים שרות דחוף?</a>
        </div>
  </div>

</section>

    )
}

export default MiddleSection


      
    