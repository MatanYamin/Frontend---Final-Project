//By Matan Yamin
import React from "react"
import { Component } from "react"
import TextField from "../../../node_modules/@material-ui/core/TextField"
import "./Form.css"
const url = "http://127.0.0.1:5000/"


export class PersonalDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: "",
            dig: "",
            cities: [],
            mailValue: "",
            firstNameValue: "",
            lastNameValue: "",
            wrongEmail: "",
            goodEmail: "",
            goodPhone: "",
            badPhone: "",
            tempPhone: ""
        };
        // this.onlyDigit = this.onlyDigit.bind(this)
     }

     async readCities() {
        // bring all cities allowed
        let response = await fetch(url + 'get/cities', { credentials: 'include' });
        let data = await response.json(); // for string
        return data
    }
    
    componentDidMount() {
        this.readCities().then((data) => {
            this.setState({
                cities: data
            })
        })
    }

    //when we call continue, we call "nextStep" from the props which increase "step" by 1
    continue = event => {
        event.preventDefault();
        this.props.nextStep(); //will increase step by 1
    }



    backward = event => {
        event.preventDefault();
        this.props.clearStates("");
        this.props.prevStep(); //will increase step by 1
    }
  
    //validate that only numbers been entered
    // onlyDigit(e){
    //     const re = /^[0-9\b]+$/;
    //     if (re.test(e.target.value)) {
    //        this.setState({value: e.target.value});
    //        this.props.handlePhone(this.state.value)
    //     }
    //     else{
    //         alert("ניתן להקליד רק ספרות")
    //         this.setState({dig: "ניתן להקליד רק ספרות"})
    //         // this.setState({value: ""});
    //     }
    //  }
//validate first name (if exists)
    validFirst(e){
        this.setState({firstNameValue: e.target.value});
    }

    //validate last name (if exists)
    validLast(e){
        this.setState({lastNameValue: e.target.value});
    }

    // validate the email address
    validEmail(e){
        this.setState({mailValue: e.target.value});
        if(e.target.value === ""){
            this.setState({goodEmail: ""});
            this.setState({wrongEmail: ""});
        }
        if(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.mailValue) === false && e.target.value !== ""){
            this.setState({wrongEmail: "כתובת לא תקינה"});
            this.setState({goodEmail: ""});
        }
        else if(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.mailValue) === true && e.target.value !== ""){
            this.setState({wrongEmail: ""});
            this.setState({goodEmail: "כתובת תקינה"});
        }
    }

    // cheacking the number length. needs to be atleast 7
    // validPhone(e){
    //     this.setState({tempPhone: e.target.value});
    //     if(e.target.value === ""){
    //         this.setState({goodPhone: ""});
    //         this.setState({badPhone: ""});
    //     }
    //     if(this.state.tempPhone.length < 6){
    //         this.setState({badPhone: "מספר קצר מידי"});
    //         this.setState({goodPhone: ""});
    //     }
    //     else{
    //         this.setState({badPhone: ""});
    //         this.setState({goodPhone: "מספר תקין"});
    //     }
    // }

    render() {
    const {values} = this.props; //values is all the props we passed to the component
    if(values.price==""){
        return(
            <>
            <br/><br/><br/><br/><br/><br/><br/>
            <b>  לא נבחר שרות</b>
            <div className="step-btn-container">
            <button onClick={this.backward} className="step-btn">חזור</button>
            </div>
            </>
        )
    }
    return (
        <div>
            <h1>פרטים אישיים</h1>
            <h6 className="red-text">שדות שמסומנים ב * הינם חובה</h6> 
            <div className="personal-wrapper">
            <h6><a className="red-text">*</a>שם פרטי: </h6>
            <TextField 
            onChange={this.props.handleChange('firstName')}
            onInput={(e) => {this.validFirst(e)}}
            defaultValue={values.firstName}
            />
            <h6><a className="red-text">*</a>שם משפחה:</h6>
            <TextField
            onChange={this.props.handleChange('lastName')}
            onInput={(e) => {this.validLast(e)}}
            defaultValue={values.lastName}
            />
            <h6><a className="red-text">*</a>דוא"ל: </h6>
            <TextField
            type="email"
            onChange={this.props.handleChange('email')}
            onInput={(e) => {this.validEmail(e)}}
            defaultValue={values.email}
            required={true}
            />
            <h6><a className="red-text">{this.state.wrongEmail}</a></h6>
            <h6><a className="green-text">{this.state.goodEmail}</a></h6>
            <h6><a className="red-text">*</a>טלפון:</h6>
            <TextField
            placeholder={this.state.dig}
            // onInput={(e) => {this.validPhone(e)}}
            onChange={this.props.handleChange("phone")}
            // onChange={(e) => {this.onlyDigit(e)}}
            // defaultValue={values.phone}
            // defaultValue={this.state.value}
            // value={this.state.value}
            // required={true}
            />
            <h6><a className="red-text">{this.state.badPhone}</a></h6>
            <h6><a className="green-text">{this.state.goodPhone}</a></h6>
            <h6><a className="red-text">*</a>עיר:</h6>
            <select 
            class="city-drp-down"
            defaultValue={values.city}
            onChange={this.props.handleChange('city')}>
            <option
            value="">בחרו עיר</option>
            {this.state.cities.map(city => (
            <option value={city}>{city}</option>))}
            </select>
            <h6><a className="red-text">העיר שלכם לא ברשימה? <a href="http://localhost:3000/contact">צרו איתנו קשר!</a> </a></h6>
            <h6><a className="red-text">*</a>רחוב: </h6>
            <TextField
            onChange={this.props.handleChange('address')}
            defaultValue={values.address}
            />
            <h6>הערות:</h6>
            <TextField
            onChange={this.props.handleChange('comments')}
            defaultValue={values.comments}
            /><br/><br/>
            </div>
            <br/> <br/>
            {/* Continue button - calls "continue" that increase step state by 1 */}
            <div className="step-btn-container">
            <button onClick={this.continue} className="step-btn">לווידוא פרטים</button>
            <button onClick={this.backward} className="step-btn">חזור</button>
            </div>
                </div>
    );
        }
            }
    
export default PersonalDetails