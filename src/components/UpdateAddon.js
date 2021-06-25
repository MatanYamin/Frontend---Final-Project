import React from "react"
import { Component } from "react"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
import TextField from "@material-ui/core/TextField"
// const url = "http://3.19.66.156/"
// const url = "http://127.0.0.1:5000/"
const url = "https://skycleanerapi.xyz/"


export class UpdateAddon extends Component {
    constructor(props){
        super(props)
        this.state = {
            addons_array: [],
            services_array: [],
            service_name: "",
            addon_name: "",
            price: "",
            loading: false,
            txt1: "",
            placeHolder: "",
            addonNameFlag: false,
            addonPriceFlag: false,
            txt2: ""
        }
    }

    // bring all services
    async readServices() {
        let response = await fetch(url + 'get/services');
        let data = await response.json(); // for string
        return data
    }

    // bring addons
    async readAddons() {
        let response = await fetch(url + 'get/addons');
        let data = await response.json(); // for string
        return data
    }
    // when the component is open, do the following
    componentDidMount() {
        this.setState({
            loading: true
        });
        this.readServices().then((data) => {
            this.setState({
                services_array: data,
                loading: false
            })
        })
    }
    // when there are changes in state, do the following
    componentDidUpdate(prevProps, prevState){
        if (prevState.services_array !== this.state.services_array) {
            
            this.readAddons().then((data) => {
                this.setState({
                    addons_array: data
                })
            })
        }
    }
    // insert changes into addon_name state
    handleAddon = (input) => {
        if(input.target.value.length >= 2){
            this.setState({
                addonNameFlag: true
            })
        }
        else{
            this.setState({
                addonNameFlag: false
            })
        }
        this.setState({
            addon_name: input.target.value
        })
    }
    // insert changes into price state
    handlePrice = (input) => {
        if(input.target.value.length >= 1){
            this.setState({
                addonPriceFlag: true
            })
        }
        else{
            this.setState({
                addonPriceFlag: false
            })
        }
        this.setState({
            price: input.target.value
        })
    }
    // this is a post request for adding an addon
    addNewAddon = () => {
        if(!this.state.service_name || !this.state.addon_name || !this.state.price){
            this.setState({
                placeHolder: "‎"
            })
        }
        else{
            this.setState({
                loading: true
            });
            try{
                fetch(url + "put/addon", {
                    method: "PUT",
                    body: JSON.stringify({
                        service_name: this.state.service_name,
                        addon_name: this.state.addon_name,
                        price: this.state.price
                    })
                })
                .then(
                    (response) => {
                        if(response.status === 200){
                            // changes when the status is ok and the function worked succesfully
                            this.setState({
                                txt1: "  התוסף "  + this.state.addon_name + " נוסף בהצלחה  ",
                                loading: false,
                                addon_name: "",
                                price: ""
                            })
                        }
                        else{
                            // error
                            alert("קרתה תקלה. רענן ונסה שוב")
                        }
                    }
                )
            }
            catch(e) {
                console.log(e)}
        }
        }

    // DELETE request for deleting an addon
    deleteAddon = () => {
        this.setState({
            loading: true
        });
        try{
            fetch(url + "delete/addon", {
                method: "DELETE",
                body: JSON.stringify({
                    addon_name: this.state.addon_name,
                })
            })
            .then(
                (response) => {
                    if(response.status === 200){
                        this.setState({
                            // changes when the status is ok and the function worked succesfully
                            txt2: "  התוסף " + this.state.addon_name + " נמחק בהצלחה  ",
                            loading: false
                        })
                        this.state.addons_array.splice(this.state.addons_array.indexOf(this.state.addon_name), 1)
                    }
                    else{
                        // error
                        alert("קרתה תקלה. רענן ונסה שוב")
                    }
                }
            )
        }
        catch(e) {
            console.log(e)}
        }


render() {
    return(
        <>
        <br/>
        <section className="adminComponent">
            <div className="adminComponentContainer">
                <label>בחר שירות להוסיף לו תוספת</label>
            <div className="border-card-top">
                <br/>
                <select className="select-srp-down" onChange={(e) => this.setState({ service_name: e.target.value })}>
                    <option value="nothing">בחר שירות</option>
                    {this.state.services_array.map(service => (
                    <option value={service}>{service}</option>))}
                    </select>
                <label>הקלד שם תוסף</label>
                {/* <input
                value={this.state.addon_name}
                autoComplete="off"
                onChange={(e) => {this.handleAddon(e)}}
                 /> */}
                 <div className="addonPlaceHolder">
                 {this.state.addonNameFlag? 
                    <>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fas fa-check fa-1x"></i>
                    </>
                    :
                    null
                    }
                    
                 <TextField 
                 placeholder={this.state.placeHolder}
                 value={this.state.addon_name}
                 autoComplete="off"
                 onChange={(e) => {this.handleAddon(e)}}
                 />
                 <label>מחיר (בשקלים)</label>
                 {/* <input
                 value={this.state.price}
                 onChange={(e) => {this.handlePrice(e)}}
                /> */}
                {this.state.addonPriceFlag? 
                    <>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fas fa-check fa-1x"></i>
                    </>
                    :
                    null
                    }
                <TextField 
                placeholder={this.state.placeHolder}
                value={this.state.price}
                onChange={(e) => {this.handlePrice(e)}}
                />
                </div>
                 <div className="btnContainer">
                 <Loader
                type="TailSpin"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                />
                     <button className="step-btn-admin"
                    //  put request for adding addong in DB
                     onClick={this.addNewAddon}
                     >סיום</button>
                     <br/>
                     <label>{this.state.txt1}</label>
                     </div>
                 </div>
                 <div className="border-card-bottom">
                     <br/>
           <label>מחיקת תוסף</label>
            <select className="del-drp-btn" onChange={(e) => this.setState({ addon_name: e.target.value })}>
                    <option value="nothing">בחר תוסף למחיקה</option>
                    {this.state.addons_array.map(addon => (
                    <option value={addon}>{addon}</option>))}
                    </select>
                    <div className="btnContainer">
                    <Loader
                type="TailSpin"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                />
                    <button className="del-btn"
                    // delete request for deleting addon from DB
                    onClick={this.deleteAddon}
                    >אישור מחיקה</button>
                    <br/>
                     <label>{this.state.txt2}</label>
                    </div>
                    </div>
            </div>
        </section>
        </>
    )}
}

export default UpdateAddon