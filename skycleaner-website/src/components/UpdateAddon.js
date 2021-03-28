import React from "react"
import { Component } from "react"
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
            deleting: false
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


render() {
    const {values} = this.props; //values is all the props we passed to the component
    const page = window.location.pathname.substring(1); //page name
    const {showing} = this.state;
    const {deleting} = this.state;
    return(
        <>
        <br/>
        <section className="login">
            <div className="loginContainer">
            <button className="step-btn" onClick={() => this.setState({ showing: !showing })}>להוספת תוסף</button>
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
                     <button className="step-btn"
                     onClick={() => 
                        {
                            try{
                                fetch(url + "put/addon", {
                                    method: "PUT",
                                    body: JSON.stringify({
                                        service_name: this.state.service_name,
                                        addon_name: this.state.addon_name,
                                        price: this.state.price
                                    })
                                });
                            }
                            catch(e) {
                                console.log(e)}
                            }}
                     >סיום</button>
                     <button className="step-btn" onClick={() => this.setState({ showing: !showing })}>ביטול</button>
                 </div>
            </>
            :
            null}
            <br/><br/>
            <button className="step-btn" onClick={() => this.setState({ deleting: !deleting })}>למחיקת תוסף</button>
            {this.state.deleting ?
           <>
           <br/>
            <select class="del-drp-btn" onChange={(e) => this.setState({ addon_name: e.target.value })}>
                    <option value="nothing">בחר תוסף למחיקה</option>
                    {this.state.addons_array.map(addon => (
                    <option value={addon}>{addon}</option>))}
                    </select>
                    <div className="btnContainer">
                    <button className="del-btn"
                    onClick={() => 
                        {
                            try{
                                fetch(url + "delete/addon", {
                                    method: "DELETE",
                                    body: JSON.stringify({
                                        addon_name: this.state.addon_name,
                                    })
                                });
                            }
                            
                            catch(e) {
                                console.log(e)}
                            }
                            }
                    >אישור מחיקה</button>
                    <button className="step-btn" onClick={() => this.setState({ deleting: !deleting })}>ביטול</button>
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