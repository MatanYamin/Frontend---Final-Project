//By Matan Yamin
import React from "react"
import { Component } from "react"
import TextField from "../../../node_modules/@material-ui/core/TextField"
import UiButton from "../../../node_modules/@material-ui/core/Button"


export class PickDate extends Component {
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
        <div class="form-container">
            {/* <h1>{page}</h1> */}
            <h1>תאריך</h1>
            <br/>
            <h5>בחרו תאריך</h5>
            <br/>
            <TextField 
            placeholder="הקלידו את תשובתכם"
            // onChange={this.props.handleChange('firstName')}
            // defaultValue={values.firstName}
            />
            <br/><br/>
            <h5>בחרו שעה</h5>
            <br/>
            <TextField
            placeholder="הקלידו את תשובתכם"
            // onChange={this.props.handleChange('lastName')}
            // defaultValue={values.lastName}
            />
            <br/>
            {/* Continue button - calls "continue" that increase step state by 1 */}
            <UiButton
            onClick={this.continue}>המשך
            </UiButton>
            {/* back button - calls "backward" that decrease step state by 1 */}
            <UiButton
            onClick={this.backward}>חזור
                </UiButton>
        </div>
    );
        }
            }
    

export default PickDate