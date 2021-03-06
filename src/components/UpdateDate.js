import React from "react"
import { Component } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import he from "date-fns/locale/he"; // the locale you want
import axios from "axios"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
import SetHours from "./SetHours";
// const url = "http://127.0.0.1:5000/"
// const url = "http://3.19.66.156/"
const url = "https://skycleanerapi.xyz/"


export class UpdateDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedDate: null,
          showDisableDate: false,
          showActivateDate: false,
          showDisableHour: false,
          showTimeChange: false,
          loading: false,
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
    const {showTimeChange} = this.state;
    return(
        <>
        <section className="adminComponent">
        <div className="adminComponentContainer">
        <button className="admin-btn-del" onClick={() => this.setState({ showDisableDate: !showDisableDate })}>לחסום יום <i className="fas fa-calendar-minus"></i></button>
        {this.state.showDisableDate ?
            <>
        <br/>
        <div className="admin-date-container">
            <div className="admin-date">
            <DatePicker 
            locale={he}
            inline
            // autoFocus
            placeholderText="לחץ לבחירת יום לחסום"
            selected={this.state.selectedDate}
            onChange={(date)=> this.setSelectedDate(date)}
            dateFormat="dd-MM-yyyy"
            minDate={new Date()}
            filterDate={day => day.getDay() !== 6} // for weekends
            />
            <br/>
            <lable className="white-text">{this.state.text1}</lable>
            <div className="btnContainer">
            <Loader
                type="TailSpin"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                />
            <button className="step-btn-admin"
            // put request for making a day disable
            onClick={() => 
                {
                    this.setState({
                        loading: true
                    });
                    try{
                        fetch(url + "put/disable_date", {
                            method: "PUT",
                            body: JSON.stringify({
                                date: this.state.selectedDate
                            })
                        })
                        .then(
                            (response) => {
                                if(response.status === 200){
                                    // changes when the status is ok and the function worked succesfully
                                    this.setState({
                                        text1: "עודכן בהצלחה",
                                        loading: false
                                    })
                                }
                                else{
                                    // error
                                    alert("קרתה תקלה. רענן ונסה שוב")
                                }
                            }
                        )
                    }
                    catch(e) {
                        console.log(e)
                        }
                    }}>אישור</button>
                    <button className="step-btn-admin" onClick={() => this.setState({ showDisableDate: !showDisableDate })}>ביטול</button>
                    </div>
                    </div></div>
            </>
            :
            null}
        <br/><br/>
        <button className="admin-btn-add" onClick={() => this.setState({ showActivateDate: !showActivateDate })}>לאפשר יום <i className="fas fa-calendar-plus"></i></button>
        {this.state.showActivateDate ?
            <>
        <br/>
        <div className="admin-date-container">
            <div className="admin-date">
            <DatePicker 
            inline
            locale={he}
            placeholderText="בחר מתי תוכל לעבוד"
            selected={this.state.selectedDate}
            onChange={(date)=> this.setSelectedDate(date)}
            dateFormat="dd-MM-yyyy"
            minDate={new Date()}
            filterDate={day => day.getDay() !== 6} // for weekends
            />
            <br/>
            <lable className="white-text">{this.state.text2}</lable>
            <div className="btnContainer">
            <Loader
                type="TailSpin"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                />
            <button className="step-btn-admin"
            // delete request for deleting a day from the disabled days
            onClick={() => 
                {
                    this.setState({
                        loading: true
                    });
                    try{
                        fetch(url + "delete/activate_date", {
                            method: "DELETE",
                            body: JSON.stringify({
                                date: this.state.selectedDate
                            })
                        })
                        .then(
                            (response) => {
                                if(response.status === 200){
                                    this.setState({
                                        text2: "עודכן בהצלחה",
                                        loading: false
                                    })
                                }
                                else{
                                    alert("קרתה תקלה. רענן ונסה שוב")
                                }
                            }
                        )
                    }
                    catch(e) {
                        console.log(e)
                    }
                    }}>אישור</button>
                    <button className="step-btn-admin" onClick={() => this.setState({ showActivateDate: !showActivateDate })}>ביטול</button>
                    </div>
                    </div></div>
            </>
            :
            null}
            
            <br/><br/>
            <button className="admin-btn-del" onClick={() => this.setState({ showTimeChange: !showTimeChange })}>שינוי שעות <i className="far fa-clock"></i></button>
            {this.state.showTimeChange ?
            <>
            <br/><br/>
            {/* <button className="step-btn-admin" onClick={() => this.setState({ showTimeChange: !showTimeChange })}>ביטול</button> */}
            <SetHours />
            </>
            :
            null}
            <br/><br/>
            <button className="admin-btn-del" onClick={() => this.setState({ showDisableHour: !showDisableHour })}>חסום שעה <i className="far fa-clock"></i></button>
            {this.state.showDisableHour ?
            <>
            <br/><br/>
            <div className="admin-date-container">
            <div className="admin-date">
            <DatePicker 
            inline
            locale={he}
            placeholderText="בחר יום"
            selected={this.state.selectedDate}
            onChange={(date)=> this.setSelectedDateForHours(date)}
            dateFormat="dd-MM-yyyy"
            minDate={new Date()}
            filterDate={day => day.getDay() !== 6} // for weekends
            />
            <br/>
            <lable className="white-text">{this.state.text3}</lable>
            <br/>
                    <select className="select-srp-down"
                    onChange={(hour_time)=> this.setHour(hour_time)}>
                    <option value="nothing">בחרו שעה</option>
                    {this.state.hours.map(hour_map => (
                    <option value={hour_map}>{hour_map}</option>))}
                    </select>
                    <div className="btnContainer">
                    <Loader
                type="Puff"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                />
            <button className="step-btn-admin"
            // post request for blocking hout
            onClick={() => 
                {
                    this.setState({
                        loading: true
                    });
                    try{
                        fetch(url + "post/new_hours", {
                            method: "POST",
                            // mode: "no-cors",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                            body: JSON.stringify({
                                date: this.state.selectedDate,
                                hour: this.state.hour
                            })
                        })
                        .then(
                            (response) => {
                                if(response.status === 200){
                                    this.setState({
                                        text3: "עודכן בהצלחה",
                                        loading: false,
                                        hours: this.state.hours.filter((_, i) => i !== this.state.hours.indexOf(this.state.hour))
                                    })
                                }
                            }
                        )
                    }
                    catch(e) {
                        console.log(e)
                    }
                    }}>
            אישור
            </button>
            {/* <br/><br/> */}
            <button className="step-btn-admin" onClick={() => this.setState({ showDisableHour: !showDisableHour })}>ביטול</button>
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