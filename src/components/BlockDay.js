import React from "react";
import { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import he from "date-fns/locale/he"; // the locale you want
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// const url = "http://127.0.0.1:5000/"
// const url = "http://3.19.66.156/"
const url = "https://skycleanerapi.xyz/"


export class BlockDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedDate: null,
          loading: false,
          hour: "",
          text1: ""
        };
    }

    // setting selected date to state
    setSelectedDate = date => {
        this.setState({
            selectedDate: date
        });
    }


render() {
    const weekDays = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"]
    return(
        <>
            <Tabs
          textColor="primary"
          indicatorColor="primary"
          centered
        >
          <Tab icon={<HighlightOffIcon />} label="ביטול יום" />
            </Tabs>
        <section className="adminComponent">
        <div className="adminComponentContainer">
        <div className="admin-date-container">
            <div className="admin-date">
                <label>בחר יום בו לא תרצה לקבל הזמנות. לאחר מכן לחץ על אישור</label>
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
            {this.state.selectedDate? 
            <>
            <div className="showBlocked">
            בחרת את: 
            &nbsp;
            {weekDays[this.state.selectedDate.getDay()]}
            <br/>
            בתאריך:
            &nbsp;
             {this.state.selectedDate.getDate()}
             /
             {this.state.selectedDate.getMonth()+1}
             </div>
             </>
                 :
                  <>

                   </>}
            
            <lable>{this.state.text1}</lable>
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
                                        text1: "היום נחסם בהצלחה ",
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
                    </div>
                    </div></div>
                    </div>
            </section>
        </>
    )}
}

export default BlockDay