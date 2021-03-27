import React from "react"
import { Component } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import he from "date-fns/locale/he"; // the locale you want


export class UpdateDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedDate: null,
          showDisableDate: false,
          showActivateDate: false
        };
    }
    setSelectedDate = date => {
        
        this.setState({
            selectedDate: date
        });
    }

render() {
    const {showDisableDate} = this.state
    const {showActivateDate} = this.state
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
            <div className="btnContainer">
            <button className="step-btn"
            // onClick will send a post request with all the values to the API
            onClick={() => 
                {
                    try{
                        fetch("http://127.0.0.1:5000/put/disabledate", {
                            method: "PUT",
                            body: JSON.stringify({
                                date: this.state.selectedDate
                            })
                        });
                    }
                    catch(e) {
                        console.log(e)}
                    // this.props.nextStep();
                    }}>אישור</button>
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
            <div className="btnContainer">
            <button className="step-btn"
            // onClick will send a post request with all the values to the API
            onClick={() => 
                {
                    try{
                        fetch("http://127.0.0.1:5000/delete/activatedate", {
                            method: "DELETE",
                            body: JSON.stringify({
                                date: this.state.selectedDate
                            })
                        });
                    }
                    catch(e) {
                        console.log(e)}
                    // this.props.nextStep();
                    }}>אישור</button>
                    </div>
                    </div></div>
            </>
            :
            null}
                    </div>
                    </section>
        </>
    )}
}

export default UpdateDate