import React from "react";
import { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import he from "date-fns/locale/he"; // the locale you want
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
// const url = "http://3.19.66.156/"
// const url = "http://127.0.0.1:5000/"
const url = "https://skycleanerapi.xyz/"


export class BlockHour extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedDate: null,
          loading: false,
          hours: [],
          hour: "",
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
            selectedDate: date,
            loading: true
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
            hours: response.data,
            loading: false
        }));
    }


render() {
    const hours_button_list = []
    this.state.hours.map(hour_now => (
        hours_button_list.push(<button 
            className="pick-hour-btn"
            onClick={() => this.setState({ 
                hour: hour_now
                 })}
            >
            {hour_now} <QueryBuilderIcon /></button>)));
    return(
        <>
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          centered
        >
          <Tab icon={<HighlightOffIcon />} label="?????????? ????????" />
            </Tabs>
        <section className="adminComponent">
        <div className="adminComponentContainer">
        <div className="admin-date-container">
        <div className="admin-date">
        <label>?????? ???? ?????? ?????? ?????? ?????? ???????? ???????? ??????????</label>
            <DatePicker 
            inline
            locale={he}
            placeholderText="?????? ??????"
            selected={this.state.selectedDate}
            onChange={(date)=> this.setSelectedDateForHours(date)}
            dateFormat="dd-MM-yyyy"
            minDate={new Date()}
            filterDate={day => day.getDay() !== 6} // for weekends
            />
            <label>{this.state.text3}</label>
            {hours_button_list}
            {/* <br/> */}
                    {/* <select className="select-srp-down"
                    onChange={(hour_time)=> this.setHour(hour_time)}>
                    <option value="nothing">???????? ??????</option>
                    {this.state.hours.map(hour_map => (
                    <option value={hour_map}>{hour_map}</option>))}
                    </select> */}
                    <div className="btnContainer">
                    <Loader
                type="Puff"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                />
            <button className="specialBtn"
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
                                    // changes when the status is ok and the function worked succesfully
                                    this.setState({
                                        text3: "?????????? ????????????",
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
            ??????????
            </button>
                </div>
                </div>
                </div>
                    </div>
            </section>
        </>
    )}
}

export default BlockHour