import React from "react"
import TextField from "../../../node_modules/@material-ui/core/TextField"
import RaisedButton from "../../../node_modules/@material-ui/core/Button"
import { Component } from "react"



export default class PickService extends Component {
    //continue is only when we click the "continue" button. than we can move to the next step
    continue = event => {
        event.preventDefault()
        this.props.nextStep(); //will increase step by 1
    }
    render() {
    const {values} = this.props; //values is all the props we passed to the component
    switch(window.location.pathname){
        case "/Clean1":
            return(
                <h1>CLEAN1</h1>
            )
        case "/Clean2":
            return(
                <h1>CLEAN2</h1>
            )
        case "/Clean3":
            return(
                <h1>CLEAN3</h1>
            )
        case "/Clean4":
            return(
                <h1>CLEAN4</h1>
            )
        }
    // return(
    //     <div>

    //         {console.log(window.location.pathname)}
    //         {/* {window.location.pathname.includes("Clean1") ? console.log("Clean1") : console.log("hi matan")} */}



            
    //         <br/>
    //         <h5>בחר שרות</h5>
    //         <br/>
    //         <TextField 
    //         hintText="asdasd"
    //         floatingLabelText="בדיקה"
    //         onChange={this.props.handleChange('service')}
    //         defaultValue={values.service}
    //         />
    //         <br/><br/>
    //         <h5>בחר תוספים</h5>
    //         <br/>
    //         <TextField 
    //         hintText="הכנס תשובה"
    //         floatingLabelText="בדיקה"
    //         onChange={this.props.handleChange('addons')}
    //         defaultValue={values.addons}
    //         />
    //     </div>
    // );
        }
            }