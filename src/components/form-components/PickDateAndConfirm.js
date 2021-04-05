//By Matan Yamin
import React from "react"
import { Component } from "react"
import "./Form.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./DropDown.css"
import he from "date-fns/locale/he"; // the locale you want
import axios from "axios"
const url = "http://127.0.0.1:5000/"


export class PickDateAndConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedDate: null,
          disable_dates: [],
          hours: [],
          temp_hour: false
        };
    }

    async read_disable_days(){
        // will get all dates from DB that admin choosed to disable
        let response = await fetch(url + 'get/disabledate', { credentials: 'include' });
        let data = await response.json();
        return data
    }

    get_hours = (e) => {
        const day = {
            date: e
        };
        axios.post(url + "post/hours", day)
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
    const {temp_hour} = this.state;
    const exclude_days_array = [];
    // mapping disabled dates to an array
    this.state.disable_dates.map(service => (
        exclude_days_array.push(new Date(service))));
    return (
        <>
        <div>
            <br/>
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
            filterDate={day => day.getDay() != 6} // for weekends
            />
            <br/><br/><br/><br/>
                <select className="service-btn"
                onChange={this.props.handleChange('hour')}
                onInput={() => this.setState({ temp_hour: !temp_hour })}
                >
                    <option 
                    value="nothing">בחרו שעה</option>
                    {this.state.hours.map(hour => (
                    <option value={hour}>{hour}</option>))}
                    </select>
            </div>
           
            {this.state.temp_hour ? 
            <>
            <div>
            <div className="step-btn-container">
            <button className="step-btn"
            onClick={this.backward}>בצע שינויים
                </button>
            <button className="step-btn"
            // onClick will send a post request with all the values to the API
            onClick={
                () => 
                {
                    try{
                        fetch(url + "booking", {
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
                                price: String(price)
                            })
                        }).then(this.props.nextStep())
                        ;
                    }
                    catch(e) {
                        console.log(e)}
                    }}>
            הזמינו את התור!
            </button>
            </div>
            </div>
            </>
            :
            <>
            <br/>
            לא נבחרה שעה
            <div className="step-btn-container">
            <button className="step-btn"
            onClick={this.backward}>בצע שינויים
                </button>
                </div>
                </>
                }
            </>
    );
    }
}

export default PickDateAndConfirm