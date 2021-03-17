//By Matan Yamin
import React from "react"
import { Component } from "react"
import TextField from "../../../node_modules/@material-ui/core/TextField"
import UiButton from "../../../node_modules/@material-ui/core/Button"
import {List} from "../../../node_modules/@material-ui/core"
import ListItem from "../../../node_modules/@material-ui/core/ListItem"
import "./Form.css"


export class Confirm extends Component {
    //when we call continue, we call "nextStep" from the props which increase "step" by 1
    // continue = event => {
    //     event.preventDefault();
    //     this.props.nextStep(); //will increase step by 1
    // }
    async postData(){
        try{
            let results = await fetch("https://webhook.site/9930f6a8-05dc-4d60-8184-0e3277c5c8e8", {
                method: "post",
                mode: "no-cors",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    key1: this.props.firstName
                })
            });
            console.log("Results:" + results);
        }
        catch(e) {
            console.log(e)
        }
    }

    backward = event => {
        event.preventDefault();
        this.props.prevStep(); //will increase step by 1
    }
    render() {
    const {values: {service, addons, date, firstName, lastName, email, address, city, phone, comments}} = this.props;
    const page = window.location.pathname.substring(1); //page name
    return (
        <div>
            {/* <li> */}
            {/* <br/><br/> */}
            <h1>אישור פרטי התור</h1>
            {/* <List> */}
                <h7>שם:</h7><br/>
                <h6>{firstName} {lastName}</h6>
                <h1>{date}</h1>
                {console.log(date)}
                {/* <br/> */}
                כתובת:
                <br/>
                <h6>{address} {city}</h6>
                {/* <br/> */}
                מייל:
                <br/>
                <h6>{email}</h6>
                {/* <br/> */}
                מספר טלפון:
                <br/>
                <h6>{phone}</h6>
                {/* <br/> */}
                סוג שירות:
                <br/>
                <h6>{service}</h6>
                {/* <br/> */}
                תוספים:
                <br/>
                <h6>{addons}</h6>
                {/* <br/> */}
                הערות:
                <br/>
                <h6>{comments}</h6>
                {/* </List> */}
            <br/>
            {/* Continue button - calls "continue" that increase step state by 1 */}
            <UiButton
            onClick={() => this.postData()}>אישור
            </UiButton>
            {/* back button - calls "backward" that decrease step state by 1 */}
            <UiButton
            onClick={this.backward}>בצע שינויים
                </UiButton>
        </div>
    );
        }
            }
    

export default Confirm