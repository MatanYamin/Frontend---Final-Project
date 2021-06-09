import React from "react"
import { Component } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import he from "date-fns/locale/he"; // the locale you want
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
// const url = "http://127.0.0.1:5000/"
// const url = "http://3.19.66.156/"
const url = "https://skycleanerapi.xyz/"


export class FreeDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedDate: null,
          loading: false,
          text2: "",
        };
    }

    // setting selected date to state
    setSelectedDate = date => {
        
        this.setState({
            selectedDate: date
        });
    }


render() {
    return(
        <>
        <section className="adminComponent">
        <div className="adminComponentContainer">
        <div className="admin-date-container">
            <div className="admin-date">
                <label>לחץ על יום בו תוכל לעבוד ולאחר מכן לחץ על אישור</label>
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
            <label>{this.state.text2}</label>
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
                                    // changes when the status is ok and the function worked succesfully
                                    this.setState({
                                        text2: "עודכן בהצלחה",
                                        loading: false
                                    })
                                }
                                else{
                                    // incase of an error
                                    alert("קרתה תקלה. רענן ונסה שוב")
                                }
                            }
                        )
                    }
                    catch(e) {
                        console.log(e)
                    }
                    }}>אישור</button>
                    </div>
                    </div></div>
                    </div>
            </section>
        </>
    )}
}

export default FreeDay