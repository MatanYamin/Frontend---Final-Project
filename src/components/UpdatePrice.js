import React from "react"
import { Component } from "react"
import axios from "axios"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
import TextField from "@material-ui/core/TextField"
// const url = "http://3.19.66.156/"
// const url = "http://127.0.0.1:5000/"
const url = "https://skycleanerapi.xyz/"


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
            loading: false,
            addonLoading: false,
            serviceLoading: false,
            first_service_price: "",
            first_addon_price: "",
            new_price: "",
            pickedService: "",
            placeholder: "הקלד מחיר חדש",
            placeHolder: "",
            placeHolder2: "",
            servicePriceFlag: false,
            addongPriceFlag: false
        }
    }

    // bring all services
    async readServices() {
        let response = await fetch(url + 'get/services');
        let data = await response.json(); // for string
        return data
    }

    // bring all addons
    async readAddons() {
        let response = await fetch(url + 'get/addons');
        let data = await response.json(); // for string
        return data
    }

    // everytime the component will open, do the following
    componentDidMount() {
        this.setState({
            serviceLoading: true
        })
        this.readServices().then((data) => {
            this.setState({
                services_array: data,
                serviceLoading: false
            })
        })
    }

    // everytime the component will change do the following
    // componentDidUpdate(prevProps, prevState){
    //     if (prevState.services_array !== this.state.services_array) {
    //         this.readAddons().then((data) => {
    //             this.setState({
    //                 addons_array: data
    //             })
    //         })
    //     }
    // }

    // the typed city will go inside "new_city" state
    handleCity = (input) => {
    this.setState({
        new_city: input.target.value
    })
}

// Will get the price from the API and update the state
getServicePrice = (e) => {
    this.setState({
        serviceLoading: true
    })
    const priceData = {
        prices: e.target.value
    };
    axios.post(url + "admin/prices", priceData)
    .then(response => this.setState(
        {
        first_service_price: "מחיר נוכחי: " + response.data + " ₪",
        serviceLoading: false
    }));
}

getAddonsForService = (e) => {
    this.setState({
        addonLoading: true
    });

    const postData = {
        add: e.target.value
    };
    try{
    axios.post(url + "addon", postData)
    .then(response => this.setState({
        addons_array: response.data,
        addonLoading: false
    }));}
    catch(e) {
        console.log(e)}
}


// Will get the price from the API and update the state
// getAddonPrice = (e) => {
//     this.setState({
//         addonLoading: true
//     })
//     const priceData = {
//         addon: e.target.value,

//     };
//     axios.post(url + "prices/addon", priceData)
//     .then(response => this.setState(
//         {
//         first_addon_price: "מחיר נוכחי: " + response.data + " ₪",
//         addonLoading: false
//     }));
// }

getAddonPrice = (e) => {
    this.setState({
        addonLoading: true
    })
    const priceData = {
        addon: e.target.value,

    };
    axios.post(url + "prices/addon", priceData)
    .then(response => this.setState(
        {
        first_addon_price: "מחיר נוכחי: " + response.data + " ₪",
        addonLoading: false
    }));
}
// will insert into new_price state
handleNewPrice = (input) => {
    if(input.target.value.length >= 1){
        this.setState({
            servicePriceFlag: true
        })
    }
    else{
        this.setState({
            servicePriceFlag: false
        })
    }
    this.setState({
        new_price: input.target.value
    })
}
// this sends the new price and service to api and the backend changes the price
updatePriceForService = () => {
    if(!this.state.service || !this.state.new_price){
        this.setState({
            placeHolder: "‎"
        })
    }
    else{
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
                            first_service_price: "מחיר חדש: " + this.state.new_price + " ₪",
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
    }

// this sends the new price and addon to api and the backend changes the price
updatePriceForAddon = () => {
    if(!this.state.addon || !this.state.new_price){
        this.setState({
            placeHolder2: "‎"
        })
    }
    else{
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
                            first_addon_price: "מחיר חדש: " + this.state.new_price + " ₪",
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
    }

render() {
    return(
        <>
        <section className="adminComponent">
            <div className="adminComponentContainer">
        <div className="border-card">
        <div className="border-card-top">
            <br/>
                <h1>שינוי מחיר לשירות</h1>
                <br/>
                <select 
                    className="select-srp-down"
                    onChange={(e) => this.setState({ service: e.target.value })}
                    onInput={(e) => {this.getServicePrice(e)}}>
                    <option
                    value="">בחר שירות</option>
                    {this.state.services_array.map(ser => (
                    <option value={ser}>{ser}</option>))}
                </select>
                {/* <br/> */}
                <Loader
               type="TailSpin"
               color="black"
               height={100}
               width={50}
               visible={this.state.serviceLoading}
               />
                <label>{this.state.first_service_price}</label>
                <label>הקלד מחיר חדש</label>
                <Loader
               type="TailSpin"
               color="black"
               height={100}
               width={50}
               visible={this.state.loading}
               />
                {/* <input
                // value={this.state.new_price}
                autoComplete="off"
                onChange={(e) => {this.handleNewPrice(e)}}
                 /> */}
                 <div className="servicePricePlacheHolde">
                 <TextField 
                //  placeholder={this.state.placeholder}
                 placeholder={this.state.placeHolder}
                 onChange={(e) => {this.handleNewPrice(e)}}
                 />
                 {this.state.servicePriceFlag? 
                    <>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fas fa-check fa-2x"></i>
                    </>
                    :
                    null
                    }
                 </div>
                 <div className="btnContainer">
                     <button className="step-btn-admin"
                    //  put request for chaning pruce for service
                    onClick={this.updatePriceForService}
                     >אישור</button>
                 </div>
                 </div>
                 </div>
                 <br/>
                 <div className="border-card">
                 <div className="border-card-top">
                     <br/>
            <h1>שינוי מחיר לתוסף:</h1>
            <br/>
            <select 
                    className="select-srp-down"
                    onChange={(e) => this.setState({ service: e.target.value })}
                    onInput={(e) => {this.getAddonsForService(e)}}>
                    <option
                    value="">בחר שירות</option>
                    {this.state.services_array.map(ser => (
                    <option value={ser}>{ser}</option>))}
                </select>
            <br/>
            <br/>
           <select 
            className="select-srp-down"
            onChange={(e) => this.setState({ addon: e.target.value })}
            onInput={(e) => {this.getAddonPrice(e)}}>
            <option
            value="">בחר תוסף</option>
            {this.state.addons_array.map(add => (
            <option value={add}>{add}</option>))}
            </select>
            <Loader
               type="TailSpin"
               color="black"
               height={100}
               width={50}
               visible={this.state.addonLoading}
               />
            <label>{this.state.first_addon_price}</label>
            <label>הקלד מחיר חדש</label>
            <Loader
                type="TailSpin"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                />
            {/* <input
            // value={this.state.new_price}
            autoComplete="off"
            onChange={(e) => {this.handleNewPrice(e)}} */}
                 {/* /> */}
        <div className="addonPricePlaceHolder">
            <TextField 
            // placeholder={this.state.placeholder}
            placeholder={this.state.placeHolder2}
            autoComplete="off"
            onChange={(e) => {this.handleNewPrice(e)}}
            />
            {this.state.addongPriceFlag? 
                    <>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fas fa-check fa-2x"></i>
                    </>
                    :
                    null
                    }
            </div>
                    <div className="btnContainer">
                  
                    <button 
                    // onInput={}
                    className="step-btn-admin"
                    //  put request for chaning pruce for addon
                    onClick={this.updatePriceForAddon}
                    >אישור</button>
                    </div>
                    </div>
                    </div>
            </div>
        </section>
        </>
    )}
}

export default UpdatePrice