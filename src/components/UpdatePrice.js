import React from "react"
import { Component } from "react"
import axios from "axios"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
const url = "http://127.0.0.1:5000/"


export class UpdatePrice extends Component {
    constructor(props){
        super(props)
        this.state = {
            cities: [],
            services_array: [],
            addons_array: [],
            service: "",
            addon: "",
            showing: false,
            deleting: false,
            check: false,
            loading: false,
            txt: "matan",
            first_service_price: "",
            first_addon_price: "",
            new_price: ""
        }
    }

    async readServices() {
        // bring all services
        let response = await fetch(url + 'get/services', { credentials: 'include' });
        let data = await response.json(); // for string
        return data
    }

    async readAddons() {
        // bring services
        let response = await fetch(url + 'get/addons', { credentials: 'include' });
        let data = await response.json(); // for string
        return data
    }

    componentDidMount() {
        this.readServices().then((data) => {
            this.setState({
                services_array: data
            })
        })
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.services_array !== this.state.services_array) {
            this.readAddons().then((data) => {
                this.setState({
                    addons_array: data
                })
            })
        }
    }

    handleCity = (input) => {
    this.setState({
        new_city: input.target.value
    })
}

getServicePrice = (e) => {
    // Will get the price from the API and update the state
    const priceData = {
        prices: e.target.value
    };
    axios.post(url + "admin/prices", priceData)
    .then(response => this.setState(
        {
        first_service_price: response.data + " ₪"
    }));
}

getAddonPrice = (e) => {
    // Will get the price from the API and update the state
    const priceData = {
        addon: e.target.value
    };
    axios.post(url + "prices/addon", priceData)
    .then(response => this.setState(
        {
        first_addon_price: response.data + " ₪"
    }));
}

handleNewPrice = (input) => {
    this.setState({
        new_price: input.target.value
    })
}

updatePriceForService = () => {
    this.setState({
        loading: true
    });
    try{
        fetch(url + "put/service_price", {
            method: "PUT",
            body: JSON.stringify({
                service: this.state.service,
                price: this.state.new_price
            })
        })

        .then(
            (response) => {
                if(response.status === 200){
                    this.setState({
                        first_service_price: this.state.new_price + " ₪",
                        loading: false,
                        new_price: ""
                    })
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

updatePriceForAddon = () => {
    this.setState({
        loading: true
    });
    try{
        fetch(url + "put/addon_price", {
            method: "PUT",
            body: JSON.stringify({
                addon: this.state.addon,
                price: this.state.new_price
            })
        })
        .then(
            (response) => {
                if(response.status === 200){
                    this.setState({
                        first_addon_price: this.state.new_price + " ₪",
                        loading: false,
                        new_price: ""
                    })
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

render() {
    const {values} = this.props; //values is all the props we passed to the component
    const page = window.location.pathname.substring(1); //page name
    const {showing} = this.state;
    const {deleting} = this.state;
    return(
        <>
        <section className="adminComponent">
            <div className="adminComponentContainer">
            <button className="step-btn-admin" onClick={() => this.setState({ showing: !showing })}>עדכן מחיר לשרות <i class="fas fa-shekel-sign"></i></button>
            {this.state.showing ?
            <>
                <br/>
                <select 
                    class="select-srp-down"
                    onChange={(e) => this.setState({ service: e.target.value })}
                    onInput={(e) => {this.getServicePrice(e)}}>
                    <option
                    value="">בחר שרות</option>
                    {this.state.services_array.map(ser => (
                    <option value={ser}>{ser}</option>))}
                </select>
                {/* <br/> */}
                <label>{this.state.first_service_price}</label>
                <label>הקלד מחיר חדש</label>
                <Loader
               type="TailSpin"
               color="black"
               height={100}
               width={50}
               visible={this.state.loading}
               />
                <input
                value={this.state.new_price}
                autoComplete="off"
                onChange={(e) => {this.handleNewPrice(e)}}
                 />
                 <div className="btnContainer">
                     <button className="step-btn-admin"
                    //  put request for chaning pruce for service
                    onClick={this.updatePriceForService}
                     >אישור</button>
                     <button className="step-btn"  onClick={() => this.setState({ showing: !showing })}>ביטול</button>
                 </div>
            </>
            :
            null}
            <br/><br/>
            <button className="step-btn-admin" onClick={() => this.setState({ deleting: !deleting })}>עדכן מחיר לתוסף <i class="fas fa-shekel-sign"></i></button>
            {this.state.deleting ?
           <>
           <br/>
           <select 
            class="select-srp-down"
            onChange={(e) => this.setState({ addon: e.target.value })}
            onInput={(e) => {this.getAddonPrice(e)}}>
            <option
            value="">בחר תוסף</option>
            {this.state.addons_array.map(add => (
            <option value={add}>{add}</option>))}
            </select>
            <label>{this.state.first_addon_price}</label>
            <label>הקלד מחיר חדש</label>
            <Loader
                type="TailSpin"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                />
            <input
            value={this.state.new_price}
            autoComplete="off"
            onChange={(e) => {this.handleNewPrice(e)}}
                 />
                    <div className="btnContainer">
                  
                    <button 
                    // onInput={}
                    className="step-btn-admin"
                    //  put request for chaning pruce for addon
                    onClick={this.updatePriceForAddon}
                    >אישור</button>
                    <button className="step-btn-admin"  onClick={() => this.setState({ deleting: !deleting })}>ביטול</button>
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

export default UpdatePrice