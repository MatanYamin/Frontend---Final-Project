import React from "react"
import './MiddleSection.css';
import {Link} from 'react-router-dom';
import { Button } from "./Button";
import "../App.css";

function MiddleSection() {
    return(
        <div className="middle-container">
                <h1>ברוכים הבאים</h1>
                <p>כאן תוכלו להזמין שרותים</p>
            <div className="middle-btns">
                {/* <br></br> <br></br> */}
                {/* the buttons will direct to the services and to lottery video */}
                <Button className="btns" buttonStyle='btn--outline' buttonSize="btn--large">חפשו שירות‏!‏</Button>
                <Button className="btns" buttonStyle='btn--primary' buttonSize="btn--large">צפו בהגרלה!</Button>
                {/* <br></br><br></br> */}
            </div>
        </div>
    )
}

export default MiddleSection