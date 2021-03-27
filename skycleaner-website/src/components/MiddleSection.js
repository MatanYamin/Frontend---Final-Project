import React from "react"
import './MiddleSection.css';
// import {Link} from 'react-router-dom';
import { Button } from "./Button";
import "../App.css";


function MiddleSection() {
    return(
        <div className="middle-container">
                <h1>ברוכים הבאים</h1>
                <p>כאן תוכלו לצפות  להזמין שרותים</p>
            <div className="middle-btns">
                {/* the buttons will direct to the services and to lottery video */}
                <Button className="btns" buttonStyle='btn--outline' buttonSize="btn--large">חפשו שירות‏!‏</Button>
                <Button className="btns" buttonStyle='btn--primary' buttonSize="btn--large">
                    <a href="https://www.youtube.com/watch?v=IPMN-LqzB7Y&t=8s&ab_channel=מתןימין" class="lottery">צפו בהגרלות</a></Button>
            </div>
        </div>
    )
}

export default MiddleSection