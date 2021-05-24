import React from "react"
import './MiddleSection.css';
import "../App.css";
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';


function MiddleSection() {
    return(
        <section className="sticky">
        <div className="bubbles">
        <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
        <div className="middle-container">
            <img alt="" className="first-img-logo" src="https://i.ibb.co/yh7CyXp/Sky-Cleaner.jpg" />
            <Popup
            closeOnEscape
            trigger={<label className="button1">צפו בהגרלות שלנו!</label>} >
                <div className="pop-up-content-home">
                    <label className="video-intro">צפו בסרטון ההגרלה האחרונה שנערכה הישארו מעודכנים אחר הגרלות נוספות </label>
                    <br/>
                    <iframe width="560" height="415" src="https://www.youtube.com/embed/IPMN-LqzB7Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
            </Popup>
            <a href="/SOS" className="button1">צריכים שרות דחוף?</a>
        </div>
  </div>

</section>

    )
}

export default MiddleSection


      
    