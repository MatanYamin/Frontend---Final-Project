//By Matan Yamin
import React from "react"
import { Component } from "react"
import TextField from "../../../node_modules/@material-ui/core/TextField"
import UiButton from "../../../node_modules/@material-ui/core/Button"
import {List} from "../../../node_modules/@material-ui/core"
import ListItem from "../../../node_modules/@material-ui/core/ListItem"
import "./Form.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./DropDown.css"


export class Confirm extends Component {
    
    //when we call continue, we call "nextStep" from the props which increase "step" by 1
    continue = event => {
        event.preventDefault();
        this.props.nextStep(); //will increase step by 1
    }

    constructor(props) {
        super(props);
        this.state = {
        //   firstName: this.props.firstName
          selectedDate: null
        };
    }

    setSelectedDate = date => {
        this.setState({
            selectedDate: date
        });
    }

    backward = event => {
        event.preventDefault();
        this.props.prevStep(); //will increase step by 1
    }
    render() {
    const {values: {service, price, addons, date, hour, firstName, lastName, email, address, city, phone, comments}} = this.props;
    const page = window.location.pathname.substring(1); //page name
    if(firstName){
        console.log("check")
    };
    console.log("maaaa");
    return (
        <div>
            {/* <li> */}
            <h1>אישור פרטי התור</h1>
                שם:
                <h4>{firstName} {lastName}</h4>
                {/* <t></t> */}
                {/* <h4>כתובת:</h4> */}
                כתובת:
                <h4>{address}, {city}</h4>
                מייל:
                <h4>{email}</h4>
                מספר טלפון:
                <h4>{phone}</h4>
                סוג שירות:
                <h4>{service}</h4>
                תוספים:
                <h5>{addons}</h5>
                הערות:
                {comments}
            <br/>
            {/* Continue button - calls "continue" that increase step state by 1 */}
            <button className="step-btn"
            onClick={this.continue}>
           לקביעת זמן הגעה
            </button>
            {/* back button - calls "backward" that decrease step state by 1 */}
            <button className="step-btn"
            onClick={this.backward}>חזור
                </button>
        </div>
    );
        }
            }

export default Confirm