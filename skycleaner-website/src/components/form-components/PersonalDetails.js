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
            {/* <h1>{page}</h1> */}
            <h1>פרטים אישיים</h1>
            {/* <h5>שם פרטי</h5> */}
            {/* שם פרטי */}
            <TextField 
            placeholder="שם פרטי"
            onChange={this.props.handleChange('firstName')}
            defaultValue={values.firstName}
            />
            {/* <h5>שם משפחה</h5> */}
            {/* שם משפחה */}
            <TextField
            placeholder="שם משפחה"
            onChange={this.props.handleChange('lastName')}
            defaultValue={values.lastName}
            />
            <br/>
            {/* <h5>מייל</h5> */}
            {/* מייל */}
            <TextField
            placeholder="מייל"
            onChange={this.props.handleChange('email')}
            defaultValue={values.email}
            required={true}
            />
            {/* <h5>טלפון</h5> */}
            {/* טלפון */}
            <TextField
            placeholder="מספר טלפון"
            onChange={this.props.handleChange('phone')}
            defaultValue={values.phone}
            />
            <br/>
            {/* <h5>עיר</h5> */}
            <TextField
            placeholder="עיר"
            onChange={this.props.handleChange('city')}
            defaultValue={values.city}
            />
            {/* <h5>כתובת</h5> */}
            <TextField
            placeholder="רחוב"
            onChange={this.props.handleChange('address')}
            defaultValue={values.address}
            />
            {/* <h5>הערות</h5> */}
            <br/>
            <TextField
            placeholder="הערות"
            onChange={this.props.handleChange('comments')}
            defaultValue={values.comments}
            />
            <br/>
            {/* Continue button - calls "continue" that increase step state by 1 */}
            <UiButton
            onClick={this.continue}><h1>המשך</h1>
            </UiButton>
            {/* back button - calls "backward" that decrease step state by 1 */}
            <UiButton
            onClick={this.backward}><h1>חזור</h1>
            </UiButton>
            {/* </div> */}
                </div>
    );
        }
            }
    

export default PersonalDetails