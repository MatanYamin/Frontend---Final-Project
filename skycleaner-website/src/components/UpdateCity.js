import React from "react"
import { Component } from "react"


export class UpdateCity extends Component {
    constructor(props){
        super(props)
        this.state = {
            cities: [],
            new_city: "",
            showing: false,
            deleting: false
        }
    }

    async readCities() {
        // bring all cities allowed
        let response = await fetch('http://127.0.0.1:5000/get/cities', { credentials: 'include' });
        let data = await response.json(); // for string
        console.log(data)
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
    return(
        <>
        <section className="login">
            <div className="loginContainer">
            <button className="step-btn" onClick={() => this.setState({ showing: !showing })}>להוספת עיר</button>
            {this.state.showing ?
            <>
                <label>הקלד שם עיר</label>
                <input autoComplete="off"
                onChange={(e) => {this.handleCity(e)}}
                 />
                 <div className="btnContainer">
                     <button className="step-btn"
                     onClick={() => 
                        {
                            try{
                                fetch("http://127.0.0.1:5000/post/city", {
                                    method: "POST",
                                    body: JSON.stringify({
                                        city: this.state.new_city,
                                    })
                                });
                            }
                            catch(e) {
                                console.log(e)}
                            }}
                     >סיום</button>
                 </div>
            </>
            :
            null}
            <br/><br/>
            <button className="step-btn" onClick={() => this.setState({ deleting: !deleting })}>למחיקת עיר</button>
            {this.state.deleting ?
           <>
           <br/>
           <select 
            class="city-drp-down"
            onChange={(e) => this.setState({ new_city: e.target.value })}>
            <option
            value="">בחרו עיר</option>
            {this.state.cities.map(city => (
            <option value={city}>{city}</option>))}
            </select>
                    <div className="btnContainer">
                    <button className="del-btn"
                    onClick={() => 
                        {
                            try{
                                fetch("http://127.0.0.1:5000/delete/city", {
                                    method: "DELETE",
                                    body: JSON.stringify({
                                        city: this.state.new_city,
                                    })
                                });
                            }
                            
                            catch(e) {
                                console.log(e)}
                            }
                            }
                    >אישור מחיקה</button>
                    </div>
           </>
            :
           null
        }
            </div>
        </section>
        </>
    )}
}

export default UpdateCity