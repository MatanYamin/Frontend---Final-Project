import React from "react"
import './MiddleSection.css';
import {Link} from 'react-router-dom';
import { Button } from "./Button";
import "../App.css";


function MiddleSection() {
    return(
        <div className="middle-container">
            <h1>כותרת ראשית</h1>
            <p>בדיקה</p>
            <div className="middle-btns">
                <Button className="btns" buttonStyle='btn--outline' buttonSize="btn--large">התחלה</Button>
                <Button className="btns" buttonStyle='btn--primary' buttonSize="btn--large">ראשי</Button>

            </div>

        </div>
    )
}

export default MiddleSection