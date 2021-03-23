//By Matan Yamin
import React from "react"
import { Component } from "react"
import TextField from "../../../node_modules/@material-ui/core/TextField"
import UiButton from "../../../node_modules/@material-ui/core/Button"
import "./Form.css"


export class PersonalDetails extends Component {
    //when we call continue, we call "nextStep" from the props which increase "step" by 1
    continue = event => {
        event.preventDefault();
        this.props.nextStep(); //will increase step by 1
    }
    backward = event => {
        event.preventDefault();
        this.props.prevStep(); //will increase step by 1
    }
    render() {
    const {values} = this.props; //values is all the props we passed to the component
    const page = window.location.pathname.substring(1); //page name
    return (
        <div>
            <h1>פרטים אישיים</h1>
            <label>שם פרטי: <t></t></label>
            <TextField 
            onChange={this.props.handleChange('firstName')}
            defaultValue={values.firstName}
            />
            <br/>
            <label>שם משפחה: <t></t></label>
            <TextField
            onChange={this.props.handleChange('lastName')}
            defaultValue={values.lastName}
            />
            <br/>
            <label>דוא"ל: <t></t></label>
            <TextField
            type="email"
            onChange={this.props.handleChange('email')}
            defaultValue={values.email}
            required={true}
            />
            <br/>
            <label>טלפון: <t></t>  <t></t></label>
            <TextField
            type="tel"
            onChange={this.props.handleChange('phone')}
            defaultValue={values.phone}
            />
            <br/>
            <label>עיר: <t></t></label>
            <TextField
            onChange={this.props.handleChange('city')}
            defaultValue={values.city}
            />
            <br/>
            <label>רחוב: <t></t></label>
            <TextField
            onChange={this.props.handleChange('address')}
            defaultValue={values.address}
            />
            <br/>
            <label>הערות: <t></t></label>
            <TextField
            onChange={this.props.handleChange('comments')}
            defaultValue={values.comments}
            />
            <br/> <br/>
            {/* Continue button - calls "continue" that increase step state by 1 */}
            <button onClick={this.continue} className="step-btn">למעבר על הפרטים</button>
            <button onClick={this.backward} className="step-btn">חזור</button>
           
            {/* </div> */}
                </div>
    );
        }
            }
    

export default PersonalDetails