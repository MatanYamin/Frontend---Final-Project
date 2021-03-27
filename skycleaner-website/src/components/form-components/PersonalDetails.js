//By Matan Yamin
import React from "react"
import { Component } from "react"
import TextField from "../../../node_modules/@material-ui/core/TextField"
import "./Form.css"


export class PersonalDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: "",
            dig: "",
            cities: []
        };
        this.onlyDigit = this.onlyDigit.bind(this)
     }

     async readCities() {
        // bring all cities allowed
        let response = await fetch('http://127.0.0.1:5000/get/cities', { credentials: 'include' });
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
  
    onlyDigit(e){
        const re = /^[0-9\b]+$/;
        // this.check("matan")
        if (re.test(e.target.value)) {
           this.setState({value: e.target.value});
        }
        else{
            this.setState({dig: "ניתן להקליד רק ספרות"})
        }
     }

    render() {
    const {values} = this.props; //values is all the props we passed to the component
    const page = window.location.pathname.substring(1); //page name
    
    // console.log(values.phone)
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
            <div className="personal-wrapper">
            {/* <a className="red-text">*</a> */}
            <h6><a className="red-text">*</a>שם פרטי: </h6>
            <TextField 
            onChange={this.props.handleChange('firstName')}
            defaultValue={values.firstName}
            />
            <h6><a className="red-text">*</a>שם משפחה:</h6>
            <TextField
            onChange={this.props.handleChange('lastName')}
            defaultValue={values.lastName}
            />
            <h6><a className="red-text">*</a>דוא"ל: </h6>
            <TextField
            type="email"
            onChange={this.props.handleChange('email')}
            defaultValue={values.email}
            required={true}
            />
            <h6><a className="red-text">*</a>טלפון</h6>
            <TextField
            // type="digits"
            placeholder={this.state.dig}
            // onChange={this.onlyDigit}
            // onInput={this.onlyDigit}
            onChange={this.props.handleChange("phone")}
            // value={this.state.value}
            defaultValue={values.phone}
            />
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
                <h6 className="red-text">שדות שמסומנים ב * הינם חובה</h6> 
            <button onClick={this.continue} className="step-btn">לווידוא פרטים</button>
            <button onClick={this.backward} className="step-btn">חזור</button>
            </div>
                </div>
    );
        }
            }
    

export default PersonalDetails