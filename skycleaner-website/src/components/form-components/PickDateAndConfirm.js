//By Matan Yamin
import React from "react"
import { Component } from "react"
import UiButton from "../../../node_modules/@material-ui/core/Button"
import "./Form.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./DropDown.css"
import moment from "moment"
import he from "date-fns/locale/he"; // the locale you want


export class PickDateAndConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        //   firstName: this.props.firstName
          selectedDate: null,
          minTime: this.calculateMinTime(new Date())
        };
    }
    calculateMinTime = date => {
        let isToday = moment(date).isSame(moment(), 'day');
        if (isToday) {
            let nowAddOneHour = moment(new Date()).add({hours: 1}).toDate();
            return nowAddOneHour;
        }
        return moment().startOf('day').toDate(); 
    }

    setSelectedDate = date => {
        this.setState({
            selectedDate: date
        });
    }

    backward = event => {
        event.preventDefault();
        this.props.prevStep(); //will increase step by 1
    }

    filterPassedTime = time => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        console.log(selectedDate)
        console.log(new Date(time))
        return currentDate.getTime() < selectedDate.getTime();
      }

    render() {
    const {values: {service, addons, date, hour, firstName, lastName, email, address, city, phone, comments}} = this.props;
    const page = window.location.pathname.substring(1); //page name
    return (
        <>
        <div>
            <h3>בחרו יום</h3>
            {/* <i className="calendar-alt" /> */}
            <DatePicker 
            locale={he}
            autoFocus
            placeholderText="לחצו לבחירת תאריך"
            selected={this.state.selectedDate}
            onChange={(date)=> this.setSelectedDate(date)}
            dateFormat="dd-MM-yyyy"
            minDate={new Date()}
            filterDate={day => day.getDay() != 5 && day.getDay() != 6} // for weekends
            />
            <br/>
           <h3>בחרו שעה</h3> 
            <select className="dropbtn"
            onChange={this.props.handleChange('hour')}>
                <option value="09:00">בחרו שעה</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                </select>
            </div>
            {/* Continue button - calls "continue" that increase step state by 1 */}
            <div className="step-btn-container">
            <button className="step-btn"
            onClick={this.backward}>בצע שינויים
                </button>
            <button className="step-btn"
            onClick={() => 
                {
                    try{
                        fetch("http://127.0.0.1:5000/booking", {
                            method: "POST",
                            mode: "no-cors",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                            body: JSON.stringify({
                                fullName: firstName + ' ' + lastName,
                                email: email,
                                phone: phone,
                                fullAddress: address + ', ' + city,
                                service: service,
                                addons: addons,
                                comments: comments,
                                date: this.state.selectedDate,
                                hour: hour
                            })
                        });
                    }
                    catch(e) {
                        console.log(e)}
                    // this.props.nextStep();
                    }}>
            הזמינו את התור!
            </button>
            {/* <t></t> */}
            {/* back button - calls "backward" that decrease step state by 1 */}
            
            </div>
            {/* </div> */}
            </>
    );
    }
}

export default PickDateAndConfirm