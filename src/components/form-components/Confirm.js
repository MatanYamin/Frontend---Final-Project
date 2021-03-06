//By Matan Yamin
import React from "react";
import { Component } from "react";
import "./Form.css";
import "react-datepicker/dist/react-datepicker.css";
import "./DropDown.css";
import PersonIcon from '@material-ui/icons/Person';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import CommentIcon from '@material-ui/icons/Comment';


export class Confirm extends Component {
    //when we call continue, we call "nextStep" from the props which increase "step" by 1
    continue = event => {
        event.preventDefault();
        this.props.nextStep(); //will increase step by 1
    }

    constructor(props) {
        super(props);
        this.state = {
          selectedDate: null
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    setSelectedDate = date => {
        this.setState({
            selectedDate: date
        });
    }

    backward = event => {
        event.preventDefault();
        // this.props.handlePhone(this.props.phone)
        this.props.handleCity("")
        this.props.prevStep(); //will increase step by 1
    }
    render() {
    const {values: {service, price, addons, firstName, lastName, email, address, city, phone, comments}} = this.props;
    // const page = window.location.pathname.substring(1); //page name
    const requierd_fields = [firstName, lastName, email, address, city, phone]
    const missing_fields = ["שם פרטי", "שם משפחה", "מייל", "רחוב", "עיר", "טלפון"]
    let mail_flag = false
    let phone_error = false
    if(!/^\d+$/.test(phone) || phone.toString().length < 7){
        phone_error = true
    };
    // let phone_flag = (/^\d+$/.test(phone)) || (phone.toString().length < 7)
    if(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email) === false){
        mail_flag = true;
    }
    let show_err_array = []
    let req_flag = false
    // This part is to validate that all fields are enterd
    requierd_fields.forEach((value, index)  =>{
    if(value === ""){
        // if a value is empty, means that nothing entered. so enter the name of field according to index
        show_err_array.push(missing_fields[index])
        req_flag = true
        }
    });
    if(mail_flag){
        return(
            <>
            <br/><br/><br/><br/>
            <b>כתובת מייל לא חוקית</b>
            <div className="step-btn-container">
            <button className="step-btn"
            onClick={this.backward}>חזור
                </button>
                </div>
            </>
        )
    }
    if(phone_error){
        return(
            <>
            <br/><br/><br/><br/>
            יש בעיה תחת השדה "טלפון"
            <div className="step-btn-container">
            <button className="step-btn"
            onClick={this.backward}>חזור
                </button>
                </div>
            </>
        )
    }
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
            onClick={this.backward}>חזור
                </button>
                </div>
            </div>
        );
    }
    return (
        <div className="lastConfirm">
            <br/>
            {/* <h2>אישור פרטי התור</h2> */}
            <div className="confirm-wrapper">
            {/* <img className="img-confirm" src={image} /> */}
                {/* <br/> */}
                <div className="thisTitle">
                 <PersonIcon />שם:</div>
                {/* &nbsp; */}
                <div className="thisTitle2">{firstName} {lastName}</div>
                <div className="thisTitle">
                 <ContactMailIcon /> כתובת: </div>
                 <div className="thisTitle2"> {address}, {city}</div>
               <div className="thisTitle"><MailIcon /> מייל: </div>
               <div className="thisTitle2"> {email}</div> 
                <div className="thisTitle"><PhoneIcon /> מספר טלפון:</div>
                <div className="thisTitle2"> {phone}</div>
               <div className="thisTitle"><RoomServiceIcon /> השירות:</div>
               <div className="thisTitle2"> {service}  {addons}</div>
                <div className="thisTitle"><LocalOfferIcon /> המחיר:</div>
                <div className="thisTitle2">  {price} ₪</div>
                <div className="thisTitle"><CommentIcon /> הערות:</div>    
                <div className="thisTitle2">  {comments} </div>
                </div>
            {/* Continue button - calls "continue" that increase step state by 1 */}
            <div className="step-btn-container">
            <button className="step-btn"
            onClick={this.continue}>
           לקביעת זמן הגעה
            </button>
            {/* back button - calls "backward" that decrease step state by 1 */}
            <button className="step-btn2"
            onClick={this.backward}>חזור
                </button>
                </div>
            </div>
    );
        }
            }

export default Confirm