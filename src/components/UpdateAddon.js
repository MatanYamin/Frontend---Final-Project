import React from "react"
import { Component } from "react"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
const url = "http://127.0.0.1:5000/"


export class UpdateAddon extends Component {
    constructor(props){
        super(props)
        this.state = {
            addons_array: [],
            services_array: [],
            service_name: "",
            addon_name: "",
            price: "",
            showing: false,
            deleting: false,
            loading: false,
            txt1: "",
            txt2: ""
        }
    }

    async readServices() {
        // bring categories
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

    componentDidUpdate(prevProps, prevState){
        if (prevState.services_array !== this.state.services_array) {
            
            this.readAddons().then((data) => {
                this.setState({
                    addons_array: data
                })
            })
        }
    }

    handleAddon = (input) => {
        this.setState({
            addon_name: input.target.value
        })
    }

    handlePrice = (input) => {
        this.setState({
            price: input.target.value
        })
    }

    addNewAddon = () => {
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
                        this.setState({
                            txt1: "הפעולה בוצעה בהצלחה",
                            loading: false
                        })
                        alert(" התוסף" + " " + this.state.addon_name + " " + "נוסף בהצלחה ")
                    }
                    else{
                        alert("קרתה תקלה. רענן ונסה שוב")
                    }
                }
            )
        }
        catch(e) {
            console.log(e)}
        }

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
                            txt2: "התוסף נמחק בהצלחה",
                            loading: false
                        })
                        this.state.addons_array.splice(this.state.addons_array.indexOf(this.state.addon_name), 1)
                        alert(" התוסף" + " " + this.state.addon_name + " " + "נמחק בהצלחה ")
                    }
                    else{
                        alert("קרתה תקלה. רענן ונסה שוב")
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
        <br/>
        <section className="adminComponent">
            <div className="adminComponentContainer">
            <button className="admin-btn-add" onClick={() => this.setState({ showing: !showing })}>להוספת תוסף  <i class="fas fa-plus"></i></button>
            {this.state.showing ?
            <>
                <label>בחר שרות להוסיף לו תוספת</label>
                <select className="select-srp-down" onChange={(e) => this.setState({ service_name: e.target.value })}>
                    <option value="nothing">בחר שרות</option>
                    {this.state.services_array.map(service => (
                    <option value={service}>{service}</option>))}
                    </select>
                <label>הקלד שם תוסף</label>
                <input autoComplete="off"
                onChange={(e) => {this.handleAddon(e)}}
                 />
                 <label>מחיר (בשקלים)</label>
                 <input onChange={(e) => {this.handlePrice(e)}}
                />
                 <div className="btnContainer">
                 <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                visible={this.state.loading}
                />
                     <button className="step-btn-admin"
                    //  put request for adding addong in DB
                     onClick={this.addNewAddon}
                     >סיום</button>
                     <button className="step-btn-admin" onClick={() => this.setState({ showing: !showing })}>ביטול</button>
                     <br/>
                     <label>{this.state.txt1}</label>
                 </div>
            </>
            :
            null}
            <br/><br/>
            <button className="admin-btn-del" onClick={() => this.setState({ deleting: !deleting })}>למחיקת תוסף <i class="fas fa-trash"></i></button>
            {this.state.deleting ?
           <>
           <br/>
            <select class="del-drp-btn" onChange={(e) => this.setState({ addon_name: e.target.value })}>
                    <option value="nothing">בחר תוסף למחיקה</option>
                    {this.state.addons_array.map(addon => (
                    <option value={addon}>{addon}</option>))}
                    </select>
                    <div className="btnContainer">
                    <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                visible={this.state.loading}
                />
                    <button className="del-btn"
                    // delete request for deleting addon from DB
                    onClick={this.deleteAddon}
                    >אישור מחיקה</button>
                    <button className="step-btn-admin" onClick={() => this.setState({ deleting: !deleting })}>ביטול</button>
                    <br/>
                     <label>{this.state.txt2}</label>
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

export default UpdateAddon