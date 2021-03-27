//By Matan Yamin
import React from "react"
import { Component } from "react"
import "./Form.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./DropDown.css"
import he from "date-fns/locale/he"; // the locale you want


export class PickDateAndConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedDate: null,
          disable_dates: []
        };
    }
    async read_disable_days(){
        // will get all dates from DB that admin choosed to disable
        let response = await fetch('http://127.0.0.1:5000/get/disabledate', { credentials: 'include' });
        let data = await response.json();
        return data
    }

    componentDidMount() {
        // when open this component, we will get all dates to be disabled
        this.read_disable_days().then((data) => {
            this.setState({
                disable_dates: data
            })
        })
    }

    setSelectedDate = date => {
        // will be the selected date from calendar
        this.setState({
            selectedDate: date
        });
    }

    backward = event => {
        event.preventDefault();
        this.props.prevStep(); //will increase step by 1
    }

    render() {
    const {values: {service, addons, date, hour, firstName, price, lastName, email, address, city, phone, comments}} = this.props;
    const page = window.location.pathname.substring(1); //page name
    const days = ['2021-04-08', '2021-04-07'];
    const exclude_days_array = [];
    // mapping disabled dates to an array
    this.state.disable_dates.map(service => (
        exclude_days_array.push(new Date(service))));
    console.log( this.state.disable_dates)
    return (
        <>
        <div>
            <h3>בחרו יום</h3>
            {this.props.date}
            <DatePicker 
            locale={he}
            autoFocus
            excludeDates={exclude_days_array}
            placeholderText="לחצו לבחירת תאריך"
            selected={this.state.selectedDate}
            onChange={(date)=> this.setSelectedDate(date)}
            dateFormat="dd-MM-yyyy"
            minDate={new Date()}
            filterDate={day => day.getDay() != 5 && day.getDay() != 6} // for weekends
            />
            <br/><br/><br/>
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
            <div>
            <div className="step-btn-container">
            <button className="step-btn"
            onClick={this.backward}>בצע שינויים
                </button>
            <button className="step-btn"
            // onClick will send a post request with all the values to the API
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
                                hour: hour,
                                price: price
                            })
                        });
                    }
                    catch(e) {
                        console.log(e)}
                    // this.props.nextStep();
                    }}>
            הזמינו את התור!
            </button>
            </div>
            </div>
            </>
    );
    }
}

export default PickDateAndConfirm