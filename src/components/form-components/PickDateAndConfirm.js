//By Matan Yamin
import React from "react";
import { Component } from "react";
import "./Form.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DropDown.css";
import he from "date-fns/locale/he"; // the locale you want
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
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
          matan: [],
          temp_hour: false,
          loading: false,
          clickedHour: "",
          avail: "",
          textOnBubble: "בחלק הזה יש לבחור יום מהלוח שנה ולאחר מכן שעה מבין השעות שנותרו. אם התאריך שרציתם אינו פנוי, אנא פנו אלינו"
        };
    }

    // will get all dates from DB that admin choosed to disable
    // this function is off for now
    // async read_disable_days(){
    //     let response = await fetch(url + 'get/disable_date');
    //     let data = await response.json();
    //     return data
    // }
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

    get_disable = () => {
        // first we send the name of the city to the backend inorder to findout their region
        const val = {
            city: this.props.values.city
        };
        axios.post(url + "post/disabled_dates", val)
        // the response should hold the dates that been booked with another region inside it
        // and then the calendar will update
        .then(response => this.setState({
            disable_dates: response.data,
            loading: false
        }));
    }

    // when open this component, we will get all dates to be disabled
    componentDidMount() {
        window.scrollTo(0, 0)
        this.get_disable()
        // this.read_disable_days().then((data) => {
        //     this.setState({
        //         disable_dates: data
        //     })
        // });
    }

    // will be the selected date from calendar
    setSelectedDate = date => {
        this.setState({
            selectedDate: date,
            avail: "בחרו שעה מבין השעות שנותרו:",
            loading: true
        });
        this.get_hours(date)
    }

    backward = event => {
        event.preventDefault();
        this.props.prevStep(); //will increase step by 1
    }

    render() {
    const {values: {service, addons, firstName, price, lastName, email, address, city, phone, comments, image}} = this.props;
    const {loading} = this.state
    const exclude_days_array = [];
    const weakDays = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"]
    // mapping disabled dates to an array
    this.state.disable_dates.map(day => (
        exclude_days_array.push(new Date(day))));
    // hours_button_list will hold all the available hours as buttons
    const hours_button_list = []
    this.state.hours.map(hour_now => (
        hours_button_list.push(<button 
            className="pick-hour-btn"
            onClick={() => this.setState({ 
                clickedHour: hour_now,
                temp_hour: true
            })}
            >
            {hour_now} <QueryBuilderIcon /></button>)));
    return (
        <>
        {/* <div className="bubble-man">
        <div className="text-on-bubble">
            
                <label>{this.state.textOnBubble}</label>
            </div>
        </div> */}
        <div className="pickDateContainer">
            <br/>
            {this.props.date}
            <div className="calendar_final">
                <div className="hours_btns">
                    {this.state.selectedDate ? <>
                    <CalendarTodayIcon />
                    <br/>
            בחרת ב
            {weakDays[this.state.selectedDate.getDay()]}
            <br/>
            <br/>
            בתאריך:
            &nbsp;
             {this.state.selectedDate.getDate()}
             /
             {this.state.selectedDate.getMonth()+1}
             <br/>
            </> :<> בחלק הזה יש לבחור יום מהלוח שנה <br/><br/>לאחר מכן שעה מבין השעות שנותרו <br/><br/>אם התאריך שרציתם אינו פנוי, אנא פנו אלינו </>}
            <br/>
            {this.state.avail}
            <br/><br/>
            {hours_button_list}
            </div>
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
            filterDate={day => day.getDay() !== 6} // for weekends
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
            {/* <div className="hours_to_display"> */}
            </div>
            {/* </div> */}
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
            {/* <div> */}
            <div className="step-btn-container">
            <button className="step-btn"
            onClick={this.backward}>חזור
                </button>
            <button className="step-btn2"
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
                                cit: city,
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
            {/* </div> */}
            </>
            :
            <>
            <br/>
            לא נבחרה שעה
            <div className="step-btn-container">
            <button className="step-btn"
            onClick={this.backward}>חזור
                </button>
                </div>
                </>
                }
                {/* </div> */}
            </>
    );
    }
}

export default PickDateAndConfirm