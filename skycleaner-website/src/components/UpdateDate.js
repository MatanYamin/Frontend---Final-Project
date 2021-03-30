import React from "react"
import { Component } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import he from "date-fns/locale/he"; // the locale you want
import axios from "axios"
const url = "http://127.0.0.1:5000/"


export class UpdateDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedDate: null,
          showDisableDate: false,
          showActivateDate: false,
          showDisableHour: false,
          hours: [],
          hour: "",
          text1: "",
          text2: "",
          text3: ""
        };
    }

    // setting selected date to state
    setSelectedDate = date => {
        
        this.setState({
            selectedDate: date
        });
    }

    // setting the selected hour to hour state
    setHour = input => {
        this.setState({
            hour: input.target.value
        });
    }

    // set selected date and display hours for the same day
    setSelectedDateForHours = date => {
        
        this.setState({
            selectedDate: date
        });
        this.get_hours(date)
    }

    // display all hours for a specific day
    get_hours = (e) => {
        const day = {
            date: e
        };
        axios.post(url + "post/hours", day)
        .then(response => this.setState({
            hours: response.data
        }));
    }

render() {
    const {showDisableDate} = this.state;
    const {showActivateDate} = this.state;
    const {showDisableHour} = this.state;
    return(
        <>
        <section className="login">
        <div className="loginContainer">
        <button className="step-btn" onClick={() => this.setState({ showDisableDate: !showDisableDate })}>לחסום יום</button>
        {this.state.showDisableDate ?
            <>
        <br/>
        <div class="admin-date-container">
            <div className="admin-date">
            <DatePicker 
            locale={he}
            // autoFocus
            placeholderText="לחץ לבחירת יום לחסום"
            selected={this.state.selectedDate}
            onChange={(date)=> this.setSelectedDate(date)}
            dateFormat="dd-MM-yyyy"
            minDate={new Date()}
            filterDate={day => day.getDay() != 5 && day.getDay() != 6} // for weekends
            />
            <br/>
            <lable className="white-text">{this.state.text1}</lable>
            <div className="btnContainer">
            <button className="step-btn"
            // put request for making a day disable
            onClick={() => 
                {
                    try{
                        fetch(url + "put/disabledate", {
                            method: "PUT",
                            body: JSON.stringify({
                                date: this.state.selectedDate
                            })
                        })
                        .then(this.setState({
                            text1: "עודכן בהצלחה"
                        }),
                        alert("היום נחסם בהצלחה")
                        );;
                    }
                    catch(e) {
                        console.log(e)}
                    }}>אישור</button>
                    <button className="step-btn" onClick={() => this.setState({ showDisableDate: !showDisableDate })}>ביטול</button>
                    </div>
                    </div></div>
            </>
            :
            null}
        <br/><br/>
        <button className="step-btn" onClick={() => this.setState({ showActivateDate: !showActivateDate })}>לאפשר יום</button>
        {this.state.showActivateDate ?
            <>
        <br/>
        <div class="admin-date-container">
            <div className="admin-date">
            <DatePicker 
            locale={he}
            placeholderText="בחר מתי תוכל לעבוד"
            selected={this.state.selectedDate}
            onChange={(date)=> this.setSelectedDate(date)}
            dateFormat="dd-MM-yyyy"
            minDate={new Date()}
            filterDate={day => day.getDay() != 5 && day.getDay() != 6} // for weekends
            />
            <br/>
            <lable className="white-text">{this.state.text2}</lable>
            <div className="btnContainer">
            <button className="step-btn"
            // delete request for deleting a day from the disabled days
            onClick={() => 
                {
                    try{
                        fetch(url + "delete/activatedate", {
                            method: "DELETE",
                            body: JSON.stringify({
                                date: this.state.selectedDate
                            })
                        })
                        .then(this.setState({
                            text2: "עודכן בהצלחה"
                        }),
                        alert("היום התפנה בהצלחה")
                        );;
                    }
                    catch(e) {
                        console.log(e)}
                    }}>אישור</button>
                    <button className="step-btn" onClick={() => this.setState({ showActivateDate: !showActivateDate })}>ביטול</button>
                    </div>
                    </div></div>
            </>
            :
            null}
            <br/><br/>
            <button className="step-btn" onClick={() => this.setState({ showDisableHour: !showDisableHour })}>חסום שעה</button>
            {this.state.showDisableHour ?
            <>
            <br/><br/>
            <div className="admin-date-container">
            <div className="admin-date">
            <DatePicker 
            locale={he}
            placeholderText="בחר יום"
            selected={this.state.selectedDate}
            onChange={(date)=> this.setSelectedDateForHours(date)}
            dateFormat="dd-MM-yyyy"
            minDate={new Date()}
            filterDate={day => day.getDay() != 5 && day.getDay() != 6} // for weekends
            />
            <br/>
            <lable className="white-text">{this.state.text3}</lable>
            <br/><br/><br/>
                    <select className="select-srp-down"
                    onChange={(hour_time)=> this.setHour(hour_time)}>
                    <option value="nothing">בחרו שעה</option>
                    {this.state.hours.map(hour_map => (
                    <option value={hour_map}>{hour_map}</option>))}
                    </select>
                    <div className="btnContainer">
            <button className="step-btn"
            // post request for blocking hout
            onClick={() => 
                {
                    try{
                        fetch(url + "post/newhours", {
                            method: "POST",
                            mode: "no-cors",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                            body: JSON.stringify({
                                date: this.state.selectedDate,
                                hour: this.state.hour
                            })
                        })
                        .then(this.setState({
                            text3: "עודכן בהצלחה",
                           
                        }),
                        this.state.hours.splice(this.state.hours.indexOf(this.state.hour), 1).then(
                            alert(this.state.hour + " נחסמה בהצלחה")
                        ),
                        );;
                    }
                    catch(e) {
                        console.log(e)}
                    }}>
            אישור
            </button>
            <button className="step-btn" onClick={() => this.setState({ showDisableHour: !showDisableHour })}>ביטול</button>
                </div>
                </div>
                </div>
            </>
            :
            null}
            
                    </div>
            </section>
        </>
    )}
}

export default UpdateDate