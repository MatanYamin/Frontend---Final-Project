import React from "react"
import { Component } from "react"
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
import TextField from "@material-ui/core/TextField"
import Grid from '@material-ui/core/Grid';
import * as AiIcons from "react-icons/ai"

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
  } from '@material-ui/pickers';
// import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// import TimePicker from 'react-time-picker';
// import {KeyboardTimePicker} from '@material-ui/pickers';
// const url = "http://3.19.66.156/"
// const url = "http://127.0.0.1:5000/"
const url = "https://skycleanerapi.xyz/"


export class SetHours extends Component {
    constructor(props){
        super(props)
        this.state = {
            hours: [],
            start_time: "בחר שעה",
            end_time: "בחר שעה",
            interval: "",
            deleting: false,
            loading: false,
            txt1: "",
            currentStart: "",
            currentEnd: "",
            currentInterval: "",
            startFlag: false,
            endFlag: false,
            intervalFlag: false,
            missingField: ""
        }
    }

    // bring all cities allowed
    async readHours() {
        let response = await fetch(url + 'get/now-hours');
        let data = await response.json(); // for string
        return data
    }
    // when the component is open, do the following
    componentDidMount() {
        this.setState({
            loading: true
        });
        this.readHours().then((data) => {
            this.setState({
                // hours: data,
                currentStart: data[0],
                currentEnd: data[1],
                currentInterval: data[2],
                loading: false
            })
        })
    }

    
     handleEndTime = (input) => {
         var checkTime = this.state.start_time[0] + this.state.start_time[1];
         checkTime = parseInt(checkTime)
         // check if the start time is after end time
         if(checkTime >= parseInt(input.getHours())){
             alert("אנא בחר שעת סיום מאוחרת משעת ההתחלה")
             this.setState({
                end_time: "בחר שוב",
                endFlag: false
            })
         }
         else{
             if(input.getMinutes() < 10){
                 this.setState({
                     end_time: input.getHours() + ":0" + input.getMinutes(),
                     endFlag: true
                 })
             }
             else{
                this.setState({
                    end_time: input.getHours() + ":" + input.getMinutes(),
                    endFlag: true
                })
             }
         }
    }

    handleStartTime = (input) => {
        var checkTime = this.state.end_time[0] + this.state.end_time[1];
         checkTime = parseInt(checkTime)
         if(checkTime <= parseInt(input.getHours())){
            alert("אנא בחר שעת התחלה מוקדמת משעת הסיום")
            this.setState({
               start_time: "בחר שוב",
               startFlag: false
           })
        }
        else{
            if(input.getMinutes() < 10){
                this.setState({
                    start_time: input.getHours() + ":0" + input.getMinutes(),
                    startFlag: true
                })
            }
            else{
                this.setState({
                    start_time: input.getHours() + ":" + input.getMinutes(),
                    startFlag: true
                })
            }
    }
        }

    changeTimes = () => {
        if(this.state.startFlag && this.state.endFlag && this.state.intervalFlag){
            this.setState({
                loading: true
            });
            try{
                fetch(url + "post/time", {
                    method: "POST",
                    body: JSON.stringify({
                        start: this.state.start_time,
                        end: this.state.end_time,
                        interval: this.state.interval,
                    })
                })
                .then(
                (response) => {
                    if(response.status === 200){
                        this.setState({
                            txt1: "הזמנים שונו בהצלחה",
                            currentStart: this.state.start_time,
                            currentEnd: this.state.end_time,
                            currentInterval: this.state.interval,
                            loading: false
                        });
                    }
                    else{
                        alert("קרתה תקלה. אנא רענן ונסה שוב")
                    }
                }
                )
            }
            catch(e) {
                console.log(e)}
        }
        else{
            this.setState({
                missingField: "אחד השדות ריקים, יש למלא הכל ולאחר מכן לחץ על אישור"
            })
        }
            }

render() {
    return(
        <>
        <div className="fullSetHour">
        <section className="adminComponent">
            <div className="adminComponentContainer">
            <div className="border-card-top">
                <br/>
                <div className="hoursDetails">
                שעת התחלה נוכחית: ‎ ‎
                {this.state.currentStart}
                <br/>
                שעת סיום נוכחית: ‎ ‎
                {this.state.currentEnd}
                <br/>
                המרווח הוא ‎ ‎
                {this.state.currentInterval}דקות
                <br/>
                </div>
                <br/>
<MuiPickersUtilsProvider
utils={DateFnsUtils}>
    <div className="check">
      <Grid
      container justify="space-evenly">
          <div className="nameInMiddle">שעת התחלה</div>
        <KeyboardTimePicker
        inputValue={this.state.start_time}
        ampm={false}
        value=""
        cancelLabel="ביטול"
        okLabel="אישור"
        invalidDateMessage=""
        invalidLabel=""
        onChange={(e) => {this.handleStartTime(e)}}
        keyboardIcon={<AiIcons.AiFillClockCircle />}
        />
        </Grid>
        <Grid
        container justify="space-evenly">
            <div className="nameInMiddle">שעת סיום ‎ ‎ ‎ ‎ ‎</div>
        <KeyboardTimePicker
        inputValue={this.state.end_time}
        ampm={false}
        cancelLabel="ביטול"
        okLabel="אישור"
        invalidDateMessage=""
        invalidLabel=""
        onChange={(e) => {this.handleEndTime(e)}}
        keyboardIcon={<AiIcons.AiFillClockCircle />}
        />
      </Grid>
      <br/>
    <div className="intervalContainer">
    <div className="interval">      
    ‎מרווח (דקות) 
    </div> 
     <TextField
      type = "number"
      onChange={(e) => {this.setState({
      interval: e.target.value,
      intervalFlag: true
      })}}
      />
      </div>
      </div>‎
      </MuiPickersUtilsProvider>
                 <div className="btnContainer">
                 {/* <Loader
                type="TailSpin"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                /> */}
                {this.state.missingField} 
                {/* <br/> */}
                     <button className="step-btn-admin"
                    //  post request for adding city to list
                    onClick={this.changeTimes}
                     >אישור</button>
                     <br/>
                     <label>{this.state.txt1}</label>
                 </div>
                 </div>
                 <div className="border-card-bottom">
                    </div>
            </div>
        </section>
        </div>
        </>
    )}
}

export default SetHours