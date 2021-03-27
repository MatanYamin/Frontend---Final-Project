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
        };
    }
    setSelectedDate = date => {
        
        this.setState({
            selectedDate: date
        });
    }

render() {
    
    return(
        <>
        <br/><br/>
        <div class="admin-date-container">
            <div className="admin-date">
        <DatePicker 
            locale={he}
            autoFocus
            placeholderText="בחר מתי לא תוכל לתת שרות"
            selected={this.state.selectedDate}
            onChange={(date)=> this.setSelectedDate(date)}
            dateFormat="dd-MM-yyyy"
            minDate={new Date()}
            filterDate={day => day.getDay() != 5 && day.getDay() != 6} // for weekends
            />
            <div className="step-btn-container">
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
    )}
}

export default UpdateDate