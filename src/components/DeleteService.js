import React from "react"
import { Component } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import he from "date-fns/locale/he"; // the locale you want
import axios from "axios"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
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
    return(
        <>
        <section className="adminComponent">
        <div className="adminComponentContainer">
        <br/>
        <div class="admin-date-container">
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
            filterDate={day => day.getDay() != 5 && day.getDay() != 6} // for weekends
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
                                    this.setState({
                                        text1: "עודכן בהצלחה",
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
                    <button className="step-btn-admin" onClick={() => this.setState({ showDisableDate: !showDisableDate })}>ביטול</button>
                    </div>
                    </div></div>
        
                    </div>
            </section>
        </>
    )}
}

export default UpdateDate