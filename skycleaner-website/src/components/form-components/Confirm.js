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
    const requierd_fields = [firstName, lastName, email, address, city, phone]
    const missing_fields = ["שם פרטי", "שם משפחה", "מייל", "רחוב", "עיר", "טלפון"]
    let show_err_array = []
    let req_flag = false
    requierd_fields.forEach((value, index)  =>{
    if(value==""){
        show_err_array.push(missing_fields[index])
        req_flag = true
        }
    });
    if(req_flag){
        return(
            <div>
             <br/>   <br/>
            השדות הבאים חסרים: <br/>
            {show_err_array.map(val => {
                return(<p><b>{val}</b> <br/> </p> ) 
            })}
            <div className="step-btn-container">
            <button className="step-btn"
            onClick={this.backward}>לביצוע שינויים
                </button>
                </div>
            </div>
        );
    }
    return (
        <div>
            <h2>אישור פרטי התור</h2>
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
                השרות:
                <h4>{service}  {addons}</h4>
                הערות:
                {comments}
            {/* Continue button - calls "continue" that increase step state by 1 */}
            <div>
            <div className="step-btn-container">
            <button className="step-btn"
            onClick={this.continue}>
           לקביעת זמן הגעה
            </button>
            {/* back button - calls "backward" that decrease step state by 1 */}
            <button className="step-btn"
            onClick={this.backward}>חזור
                </button>
                </div>
            </div>
            </div>
    );
        }
            }

export default Confirm