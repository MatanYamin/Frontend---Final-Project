import React from "react"
import { Component } from "react"
const url = "http://127.0.0.1:5000/"


export class UpdateCity extends Component {
    constructor(props){
        super(props)
        this.state = {
            cities: [],
            new_city: "",
            showing: false,
            deleting: false,
            check: false,
            txt1: "",
            txt2: "",
            isAdded: false
        }
    }

    async readCities() {
        // bring all cities allowed
        let response = await fetch(url + 'get/cities', { credentials: 'include' });
        let data = await response.json(); // for string
        return data
    }

    componentDidMount() {
        this.readCities().then((data) => {
            this.setState({
                cities: data
            })
        })
    }

    handleCity = (input) => {
    this.setState({
        new_city: input.target.value
    })
}

render() {
    const {values} = this.props; //values is all the props we passed to the component
    const page = window.location.pathname.substring(1); //page name
    const {showing} = this.state;
    const {deleting} = this.state;
    const {check} = this.state;
    return(
        <>
        <div className="city">
        <section className="adminComponent">
            <div className="adminComponentContainer">
            <button className="admin-btn-add" onClick={() => this.setState({ showing: !showing })}>להוספת עיר <i class="fas fa-plus"></i></button>
            {this.state.showing ?
            <>
                <label>הקלד שם עיר</label>
                <input autoComplete="off"
                onChange={(e) => {this.handleCity(e)}}
                 />
                 <div className="btnContainer">
                     <button className="step-btn-admin"
                    //  post request for adding city to list
                     onClick={() => 
                        {
                            try{
                                fetch(url + "post/city", {
                                    method: "POST",
                                    body: JSON.stringify({
                                        city: this.state.new_city,
                                    })
                                })
                                .then(this.setState({
                                    txt1: "העיר" + " " + this.state.new_city + " " + "נוספה בהצלחה"
                                    
                                }),
                                alert(" העיר" + " " + this.state.new_city + " " + "נוספה בהצלחה "),
                                this.state.cities.concat(this.state.new_city)
                                )
                                ;;
                            }
                            catch(e) {
                                console.log(e)}
                            }}
                     >סיום</button>
                     <button className="step-btn-admin"  onClick={() => this.setState({ showing: !showing })}>ביטול</button>
                     <br/>
                     <label>{this.state.txt1}</label>
                 </div>
            </>
            :
            null}
            <br/><br/>
            <button className="admin-btn-del" onClick={() => this.setState({ deleting: !deleting })}>למחיקת עיר <i class="fas fa-trash"></i></button>
            {this.state.deleting ?
           <>
           <br/>
           <select 
            class="del-city-drp-down"
            onChange={(e) => this.setState({ new_city: e.target.value })}>
            <option
            value="">בחרו עיר</option>
            {this.state.cities.map(city => (
            <option value={city}>{city}</option>))}
            </select>
                    <div className="btnContainer">
                    <button 
                    // delete request for deleting city from list
                    className="del-btn"
                    onClick={() => 
                        {
                            try{
                                fetch(url + "delete/city", {
                                    method: "DELETE",
                                    body: JSON.stringify({
                                        city: this.state.new_city,
                                    })
                                })
                                .then(this.setState({
                                    txt2: " העיר" + " " + this.state.new_city + " " + "נמחקה בהצלחה "
                                }),
                                this.state.cities.splice(this.state.cities.indexOf(this.state.new_city), 1).then(
                                    alert(" העיר" + " " + this.state.new_city + " " + "נמחקה בהצלחה ")
                                    
                                )
                                );
                            }
                            catch(e) {
                                console.log(e)}
                            }
                            }
                    >אישור מחיקה</button>
                    <button className="step-btn-admin"  onClick={() => this.setState({ deleting: !deleting })}>ביטול</button>
                    <br/>
                    <label>{this.state.txt2}</label>
                    </div>
           </>
            :
           null
        }
            </div>
        </section>
        </div>
        </>
    )}
}

export default UpdateCity