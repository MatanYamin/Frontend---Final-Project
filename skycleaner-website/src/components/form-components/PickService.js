import React from "react"
import { Component } from "react"
import TextField from "../../../node_modules/@material-ui/core/TextField"
import RaisedButton from "../../../node_modules/@material-ui/core/Button"
import Button from "../../../node_modules/@material-ui/core/Button"


export class PickService extends Component {
    //continue is only when we click the "continue" button. than we can move to the next step
    continue = e => {
        e.preventDefault();
        this.props.nextStep(); //will increase step by 1
    }
    render() {
    const {values} = this.props; //values is all the props we passed to the component
    const page = window.location.pathname.substring(1); //page name
    return (
        <div>
            <h1>{page}</h1>
            <br/>
            <h5>בחר שרות</h5>
            <br/>
            <TextField 
            placeholder="תשובה"
            onChange={this.props.handleChange('service')}
            defaultValue={values.service}
            />
            <br/><br/>
            <h5>בחר תוספים</h5>
            <br/>
            <TextField
            placeholder="תשובה"
            onChange={this.props.handleChange('addons')}
            defaultValue={values.addons}
            />
            <br/>
            <button
            onClick={this.continue}>asd
                </button>
        </div>
    );
        }
            }
    

export default PickService