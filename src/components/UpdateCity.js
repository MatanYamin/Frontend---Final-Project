import React from "react"
import { Component } from "react"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
import TextField from "@material-ui/core/TextField"
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
            // tempCity: ""
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
    this.setState({
        loading: true
    });
    try{
        fetch(url + "post/city", {
            method: "POST",
            body: JSON.stringify({
                city: this.state.new_city,
            })
        })
        .then(
        (response) => {
            if(response.status === 200){
                this.setState({
                    txt1: " העיר "  + this.state.new_city + " נוספה בהצלחה ",
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
                <h1>הוספת עיר חדשה</h1>
                <label>הקלד שם עיר</label>
                {/* <input autoComplete="off"
                value={this.state.new_city}
                onChange={(e) => {this.handleCity(e)}}
                 /> */}
                 <TextField 
                 placeholder="שם עיר"
                 value={this.state.new_city}
                 onChange={(e) => {this.handleCity(e)}}
                 />
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
            <h1>מחיקת עיר מהרשימה</h1>
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