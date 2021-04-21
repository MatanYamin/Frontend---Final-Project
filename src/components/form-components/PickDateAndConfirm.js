//By Matan Yamin
import React from "react"
import { Component } from "react"
import "./Form.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./DropDown.css"
import he from "date-fns/locale/he"; // the locale you want
import axios from "axios"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner"
// const url = "http://3.19.66.156/"
// const url = "http://127.0.0.1:5000/"
const url = "https://skycleanerapi.xyz/"



export class PickDateAndConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedDate: null,
          disable_dates: [],
          hours: [],
          temp_hour: false,
          loading: false,
          clickedHour: "",
          textOnBubble: "בחלק הזה יש לבחור יום מהלוח שנה ולאחר מכן שעה מבין השעות שנותרו. אם התאריך שרציתם אינו פנוי, אנא פנו אלינו"
        };
    }

    // will get all dates from DB that admin choosed to disable
    async read_disable_days(){
        let response = await fetch(url + 'get/disabledate');
        let data = await response.json();
        return data
    }
    // get all houes for a certain day
    get_hours = (e) => {
        const day = {
            date: e
        };
        axios.post(url + "post/hours", day)
        .then(response => this.setState({
            hours: response.data,
            loading: false
        }));
    }

    // when open this component, we will get all dates to be disabled
    componentDidMount() {
        this.read_disable_days().then((data) => {
            this.setState({
                disable_dates: data
            })
        })
    }

    // will be the selected date from calendar
    setSelectedDate = date => {
        this.setState({
            selectedDate: date,
            temp_hour: true,
            loading: true
        });
        this.get_hours(date)
    }

    backward = event => {
        event.preventDefault();
        this.props.prevStep(); //will increase step by 1
    }

    render() {
    const {values: {service, addons, date, hour, firstName, price, lastName, email, address, city, phone, comments, image}} = this.props;
    const {temp_hour} = this.state;
    const {loading} = this.state
    const exclude_days_array = [];
    // mapping disabled dates to an array
    this.state.disable_dates.map(day => (
        exclude_days_array.push(new Date(day))));
    // hours_button_list will hold all the available hours as buttons
    const hours_button_list = []
    this.state.hours.map(hour_now => (
        hours_button_list.push(<button 
            className="pick-hour-btn"
            onClick={() => this.setState({ clickedHour: hour_now })}
            >
            {hour_now}</button>)));
    return (
        <>
        <div className="bubble-man">
        <div class="text-on-bubble">
                <label>{this.state.textOnBubble}</label>
            </div>
        <div className="pickDateContainer">
            <br/>
            <h3>בחרו יום</h3>
            {this.props.date}
            <DatePicker 
            locale={he}
            // autoFocus
            inline
            excludeDates={exclude_days_array}
            placeholderText="לחצו לבחירת תאריך"
            selected={this.state.selectedDate}
            onChange={(date)=> this.setSelectedDate(date)}
            dateFormat="dd-MM-yyyy"
            minDate={new Date()}
            filterDate={day => day.getDay() != 6} // for weekends
            />
            {/* "hours buttons list" */}
            <Loader
                    type="TailSpin"
                    color="black"
                    height={100}
                    width={50}
                    visible={this.state.loading}
                    />
            <br/>
            {hours_button_list}
                {/* <select className="service-btn"
                onChange={this.props.handleChange('hour')}
                onInput={() => this.setState({ temp_hour: !temp_hour })}
                >
                    <option 
                    value="nothing">בחרו שעה</option>
                    {this.state.hours.map(hour => (
                    <option value={hour}>{hour}</option>))}
                    </select> */}
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
            onInput={() => this.setState({ loading: !loading })}
            onClick={
                () => 
                {
                    this.setState({
                        loading: true
                    })
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
                                hour: this.state.clickedHour,
                                image: image,
                                price: String(price)
                            })
                        })

                        .then(
                            (response) => {
                                if(response.status === 200 || response.status === 0){
                                    this.props.nextStep();
                                }
                                else{
                                    alert("קרתה תקלה בניסיון לקבוע תור. אנא נסה שוב")
                                }
                            }
                        )
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
                </div>
            </>
    );
    }
}

export default PickDateAndConfirm