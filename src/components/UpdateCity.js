import React from "react"
import { Component } from "react"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AllOutIcon from '@material-ui/icons/AllOut';
import CheckIcon from '@material-ui/icons/Check';
// const url = "http://3.19.66.156/"
// const url = "http://127.0.0.1:5000/"
const url = "https://skycleanerapi.xyz/"


export class UpdateCity extends Component {
    constructor(props){
        super(props)
        this.state = {
            cities: [],
            new_city: "",
            showing: false,
            deleting: false,
            loading: false,
            txt1: "",
            txt2: "",
            placeHolder: "",
            region: "",
            regionName: ""
        }
    }

    // bring all cities allowed
    async readCities() {
        let response = await fetch(url + 'get/cities');
        let data = await response.json(); // for string
        return data
    }
    // when the component is open, do the following
    componentDidMount() {
        this.setState({
            loading: true
        });
        this.readCities().then((data) => {
            this.setState({
                cities: data,
                loading: false
            })
        })
    }
    // insert changes into new_city state
    handleCity = (input) => {
    this.setState({
        new_city: input.target.value
    })
}

// this is a post request for adding a city
addNewCity = () => {
    if(!this.state.regionName){
        alert("לא נבחר איזור")
    }
    else{

        if(!this.state.new_city){
            this.setState({
                placeHolder: "שדה ריק‎"
            })
        }
        else{
            this.setState({
                loading: true
            });
            try{
                fetch(url + "post/city", {
                    method: "POST",
                    body: JSON.stringify({
                        city: this.state.new_city,
                        region: this.state.region
                    })
                })
                .then(
                (response) => {
                    if(response.status === 200){
                        this.setState({
                            txt1: " העיר "  + this.state.new_city + " ממחוז " + this.state.regionName + " נוספה בהצלחה ",
                            // tempCity: this.state.new_city,
                            loading: false,
                            new_city: "",
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
    }
        }

    // this is a DELETE request for deleting city
    deleteCity = () => {
        this.setState({
            loading: true
        });
        try{
            fetch(url + "delete/city", {
                method: "DELETE",
                body: JSON.stringify({
                    city: this.state.new_city,
                })
            })
            .then(
                (response) => {
                    if(response.status === 200){
                        this.setState({
                            txt2: "  העיר "  + this.state.new_city + " נמחקה בהצלחה  ",
                            loading: false,
                            cities: this.state.cities.filter((_, i) => i !== this.state.cities.indexOf(this.state.new_city))
                        })
                    }
                    else{
                        alert("קרתה תקלה. אנא רענן ונסה שוב")
                    }
                }
            )
        }
        catch(e) {
            console.log(e)
        }
        }
    

render() {
    return(
        <>
        {/* <div className="city"> */}
        <section className="adminComponent">
            <div className="adminComponentContainer">
            <div className="border-card-top">
                <br/>
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          centered
        >
          <Tab icon={<AddCircleOutlineIcon />} label="הוספת עיר חדשה" />
            </Tabs>
                {/* <input autoComplete="off"
                value={this.state.new_city}
                onChange={(e) => {this.handleCity(e)}}
            /> */}
                 <div className="cityContainer1">
            <label>הקלד שם עיר</label>
                 <div className="addonPlaceHolder">
                 <TextField 
                 placeholder={this.state.placeHolder}
                 value={this.state.new_city}
                 onChange={(e) => {this.handleCity(e)}}
                 />
                 </div>
                 <br/>
                 {/* <label>לאיזה מחוז שייכת העיר?</label> */}
    <label>לאיזה מחוז שייכת העיר?</label>
    </div>
    <Paper square>
        <Tabs
          value={this.state.value}
          textColor="primary"
          indicatorColor="primary"
          centered
          onChange={(event, newValue) => {
            this.setState({
                value: newValue
            });
          }}
        >
          <Tab icon={<ArrowUpwardIcon />} onClick={() => this.setState({
                     region: "0",
                     regionName: "צפון"
                 })} label="צפון" />
          <Tab icon={<AllOutIcon />} onClick={() => this.setState({
                     region: "1",
                     regionName: "מרכז"
                 })} label="מרכז" />
          <Tab icon={<ArrowDownwardIcon />} onClick={() => this.setState({
                     region: "2",
                     regionName: "דרום"
                 })} label="דרום"  />
          <Tab icon={<CheckIcon />} onClick={() => this.setState({
                     region: "5",
                     regionName: "(בלי))"
                 })} label="אין השפעה"  />
        </Tabs>
      </Paper>
                 {/* <button className="pickRegion" onClick={() => this.setState({
                     region: "0",
                     regionName: "צפון"
                 })}>צפון</button>
                 <button className="pickRegion" onClick={() => this.setState({
                     region: "1",
                     regionName: "מרכז"
                 })}>מרכז</button>
                 <button className="pickRegion" onClick={() => this.setState({
                     region: "2",
                     regionName: "דרום"
                 })}>דרום</button>
                 <button className="pickRegion" onClick={() => this.setState({
                     region: "5",
                     regionName: "(בלי))"
                 })}>לא להשפיע על סדר היום</button> */}
                 <div className="btnContainer">
                 <Loader
                type="TailSpin"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                />
                     <button className="step-btn-admin"
                    //  post request for adding city to list
                    onClick={this.addNewCity}
                     >אישור</button>
                     <br/>
                     <label>{this.state.txt1}</label>
                 </div>
                 </div>
                 <div className="border-card-bottom">
                 <br/>
                 <Tabs
          textColor="primary"
          indicatorColor="primary"
          centered
        >
          <Tab icon={<HighlightOffIcon />} label="מחיקת עיר מהרשימה" />
            </Tabs>
            <br/>
           <select 
            className="del-drp-btn"
            onChange={(e) => this.setState({ new_city: e.target.value })}>
            <option
            value="">בחרו עיר</option>
            {this.state.cities.map(city => (
            <option value={city}>{city}</option>))}
            </select>
                    <div className="btnContainer">
                    <Loader
                type="TailSpin"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                />
                    <button 
                    // delete request for deleting city from list
                    className="step-btn-admin"
                    onClick={this.deleteCity}
                    >אישור</button>
                    <br/>
                    <label>{this.state.txt2}</label>
                    </div>
                    </div>
            </div>
        {/* </div> */}
        </section>
        </>
    )}
}

export default UpdateCity