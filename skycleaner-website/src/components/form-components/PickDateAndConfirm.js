//By Matan Yamin
import React from "react"
import { Component } from "react"
import UiButton from "../../../node_modules/@material-ui/core/Button"
import "./Form.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./DropDown.css"
import moment from "moment"


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
        <div>
            <div className="pickDate">
            <h1>אנא בחר מתי תרצו שנגיע</h1>
            <div className="date">
            <DatePicker 
            placeholderText="בחרו תאריך"
            selected={this.state.selectedDate}
            onChange={(date)=> this.setSelectedDate(date)}
            dateFormat="dd-MM-yyyy"
            // minDate={new Date()}
            // showTimeSelect
            // timeIntervals={180}
            // showTimeSelectOnly
            // filterTime="12:00"
            // timeFormat="HH:mm"
            // minTime="11:00"
            // maxTime="17:00"
            filterDate={day => day.getDay() != 5 && day.getDay() != 6} // for weekends
            />
            </div>
            <br/>
            <h2>בחר שעה שנוחה לך</h2>
            <div className="date">
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
            </div>
            <br/>
            {/* Continue button - calls "continue" that increase step state by 1 */}
            <UiButton
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
                                // key1: "matan"
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
            <h1>קבע תור!</h1>
            </UiButton>
            {/* back button - calls "backward" that decrease step state by 1 */}
            <UiButton
            onClick={this.backward}><h1>בצע שינויים</h1>
                </UiButton>
        </div>
    );
    }
}

export default PickDateAndConfirm