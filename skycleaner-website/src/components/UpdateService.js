import React from "react"
import axios from "axios"
import { Component } from "react"


export class UpdateService extends Component {
    constructor(props){
        super(props)
        this.state = {
            categories_array: [],
            services_array: [],
            cat_name: "",
            service_name: "",
            price: "",
            showing: false,
            deleting: false
        }
    }

    async readCategories() {
        // get all categories inorder to know to whick category we will add a service
        let response = await fetch('http://127.0.0.1:5000/get/categories', { credentials: 'include' });
        let data = await response.json();
        console.log("data: ", data)
        return data
    }

    async readServices() {
        // bringing all service for deleting one
        let response = await fetch('http://127.0.0.1:5000/get/services', { credentials: 'include' });
        let data = await response.json();
        return data
    }
    
    componentDidMount() {
        // when open this component, we will get all categories first
        this.readCategories().then((data) => {
            this.setState({
                categories_array: data
            })
        })
    
    }


    componentDidUpdate(prevProps, prevState){
        // after detecting changes in state, we will bring now all services from the API
        if (prevState.categories_array !== this.state.categories_array) {
            
            this.readServices().then((data) => {
                this.setState({
                    services_array: data
                })
            })
            }
    }

    // for typing new service
    handleService = (input) => {
        this.setState({
            service_name: input.target.value
        })
    }
    // for typing new price
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
        {console.log(this.state.categories_array)}
        <section className="login">
            <div className="loginContainer">
        <button className="step-btn" onClick={() => this.setState({ showing: !showing })}>הוספת שרות</button>
        {/* Using "showing" for clicking a button */}
        {this.state.showing ? //for open an option to choose (add service)
        <>
           <label>בחר קטגוריה להוספה</label>
           <select className="select-srp-down" onChange={(e) => this.setState({ cat_name: e.target.value })}>
               <option value="nothing">בחר קטגוריה</option>
               {this.state.categories_array.map(cat => (
               <option value={cat}>{cat}</option>))}
               </select>
           <label>הקלד שם שרות</label>
           <input autoComplete="off"
           onChange={(e) => {this.handleService(e)}}
            />
            <label>מחיר (בשקלים)</label>
            <input onChange={(e) => {this.handlePrice(e)}}
           />
            <div className="btnContainer">
                <button className="step-btn"
                onClick={() => 
                   {
                       try{
                           fetch("http://127.0.0.1:5000/post/service", {
                               method: "POST",
                               mode: "no-cors",
                               headers: {
                                   'Accept': 'application/json',
                                   'Content-Type': 'application/json'
                                 },
                               body: JSON.stringify({
                                   cat_name: this.state.cat_name,
                                   service_name: this.state.service_name,
                                   price: this.state.price
                               })
                           });
                       }
                       catch(e) {
                           console.log(e)}
                       }}
                >אישור</button>
            </div> </>
            :
           null
        }
        <br/><br/>
        <button className="step-btn" onClick={() => this.setState({ deleting: !deleting })}>מחיקת שרות</button>
        <br/><br/>
        {this.state.deleting ? //for open an option to choose (delete service)
           <>
            <select class="del-drp-btn" onChange={(e) => this.setState({ service_name: e.target.value })}>
                    <option value="nothing">בחר שרות</option>
                    {this.state.services_array.map(service => (
                    <option value={service}>{service}</option>))}
                    </select>
                    <br/><br/>
                    <button
                    className="del-btn"
                    onClick={() => 
                        {
                            try{
                                fetch("http://127.0.0.1:5000/delete/service", {
                                    method: "DELETE",
                                    body: JSON.stringify({
                                        service_name: this.state.service_name,
                                    })
                                });
                            }
                            catch(e) {
                                console.log(e)}
                            }}
                    >אישור מחיקה (הדבר ימחק גם את כל התוספים של אותו שרות)</button>
           </>
            :
           null
        }
            </div>
        </section>
        </>
    )}
}

export default UpdateService