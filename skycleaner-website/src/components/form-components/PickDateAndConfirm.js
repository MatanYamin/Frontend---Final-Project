//By Matan Yamin
import React from "react"
import { Component } from "react"
import "./Form.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./DropDown.css"
import he from "date-fns/locale/he"; // the locale you want
import axios from "axios"


export class PickDateAndConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedDate: null,
          disable_dates: [],
          hours: [],
          day: "no"
        //   selected_hour: ""
        };
    }

    async read_disable_days(){
        // will get all dates from DB that admin choosed to disable
        let response = await fetch('http://127.0.0.1:5000/get/disabledate', { credentials: 'include' });
        let data = await response.json();
        return data
    }

    // async read_hours(){
    //     // will get all hours from DB that are available
    //     let response = await fetch('http://127.0.0.1:5000/get/hours', { credentials: 'include' });
    //     let data = await response.json();
    //     return data
    // }

    get_hours = (e) => {
        const day = {
            date: e
        };
        axios.post("http://127.0.0.1:5000/post/hours", day)
        .then(response => this.setState({
            hours: response.data
        }));
    }

    componentDidMount() {
        // when open this component, we will get all dates to be disabled
        this.read_disable_days().then((data) => {
            this.setState({
                disable_dates: data
            })
        })
    }

    // componentDidUpdate(prevProps, prevState){
    //     if (prevState.selectedDate !== this.state.selectedDate) {
    //         this.read_hours().then((data) => {
    //             this.setState({
    //                 hours: data
    //             })
    //         })
    //     }
    // }

    setSelectedDate = date => {
        // will be the selected date from calendar
        this.setState({
            selectedDate: date
        });
        this.get_hours(date)
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
           <label>בחר שרות להוסיף לו תוספת</label>
                <select className="select-srp-down" onChange={this.props.handleChange('hour')}>
                    <option value="nothing">בחר שרות</option>
                    {this.state.hours.map(hour => (
                    <option value={hour}>{hour}</option>))}
                    </select>
            {/* <select className="dropbtn"
            onChange={this.props.handleChange('hour')}>
                <option value="09:00">בחרו שעה</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                </select> */}
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