//By Matan Yamin
import React, {useState} from "react"
import { Component } from "react"
import TextField from "../../../node_modules/@material-ui/core/TextField"
import UiButton from "../../../node_modules/@material-ui/core/Button"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
// import Calendar from "./Calendar"
// import Calendar from 'react-input-calendar'
// import Calendara from "../../../node_modules/react-input-calendar/dist/"



export class PickDate extends Component {

    constructor(props) {
        super(props);
        this.state = {
          selectedDate: null,
        };
      }
    //when we call continue, we call "nextStep" from the props which increase "step" by 1
    continue = event => {
        event.preventDefault();
        this.props.nextStep(); //will increase step by 1
    }
    backward = event => {
        event.preventDefault();
        this.props.prevStep(); //will increase step by 1
    }

    putValue = (date) => {
        this.setState({selectedDate: date});
        // date.onChange=this.props.handleChange('date')
        // this.state.selectedDate = JSON.stringify(this.state.selectedDate);
        // this.props.handleChange('date')
        // values.date = this.state.selectedDate;
    }

    render() {
        // this.state = {selectedDate : null}
        const {values} = this.props; //values is all the props we passed to the component
        const page = window.location.pathname.substring(1); //page name
        
    return (
        <div class="form-container">
            {/* <h1>{page}</h1> */}
            {/* <h1>בחר יום</h1> */}
            <h5>בחרו תאריך</h5>
            <br/>
            {/* <Calendar 
            format='DD/MM/YYYY' 
            date='4-12-2014'
            /> */}
            <DatePicker //represents the calendar picker
            selected={this.state.selectedDate} //will be the date selected
            onChange={this.putValue} 
            // onSelect={this.props.handleChange('date')}
            // this.props.handleChange('date')} //will handle changes in dates and insert to new value
            // onChange={this.handleChange('date')}
            dateFormat="dd/MM/yy"
            
            // minDate={new Date()}
            />
            {/* {typeof(JSON.stringify(this.state.selectedDate))} */}
            <br/><br/>
            {/* {console.log(values.date)} */}
            <h5>בחרו שעה</h5>
            <br/>
            {/* <TextField
            placeholder={this.state.selectedDate}
            // onChange={this.props.handleChange('lastName')}
            defaultValue={this.state.selectedDate}
            /> */}
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