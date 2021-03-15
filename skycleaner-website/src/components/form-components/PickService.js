//By Matan Yamin
import React from "react"
import { Component } from "react"
import TextField from "../../../node_modules/@material-ui/core/TextField"
import UiButton from "../../../node_modules/@material-ui/core/Button"


export class PickService extends Component {
    //when we call continue, we call "nextStep" from the props which increase "step" by 1
    continue = event => {
        event.preventDefault();
        this.props.nextStep(); //will increase step by 1
    }
    render() {
    const {values} = this.props; //values is all the props we passed to the component
    const page = window.location.pathname.substring(1); //page name
    return (
        <div>
            <h1>מה מנקים?</h1>
            
            <br/>
            <h5>בחר שרות</h5>
            <br/>
            <TextField 
            placeholder="הקלידו את תשובתכם"
            onChange={this.props.handleChange('service')}
            defaultValue={values.service}
            />
            <br/><br/>
            <h5>בחרו תוספים</h5>
            <br/>
            <TextField
            placeholder="הקלידו את תשובתכם"
            onChange={this.props.handleChange('addons')}
            defaultValue={values.addons}
            />
            <br/>
            <UiButton
            onClick={this.continue}>המשך
            </UiButton>
        </div>
    );
        }
            }
    

export default PickService