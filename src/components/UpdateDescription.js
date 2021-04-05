import React from "react"
import { Component } from "react"
const url = "http://127.0.0.1:5000/"


export class UpdateDescription extends Component {
    constructor(props){
        super(props)
        this.state = {
            services_array: [],
            showing: false,
            deleting: false,
            newDes: "",
            service: ""
        }
    }

    async readServices() {
        // bring all services
        let response = await fetch(url + 'get/services', { credentials: 'include' });
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

    handleNewDescription = (input) => {
        this.setState({
            newDes: input.target.value
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
        <section className="adminComponent">
            <div className="adminComponentContainer">
                <select 
                    class="select-srp-down"
                    onChange={(e) => this.setState({ service: e.target.value })}
                    >
                    <option
                    value="">בחר שרות</option>
                    {this.state.services_array.map(ser => (
                    <option value={ser}>{ser}</option>))}
                </select>
                <label>הקלד תיאור חדש</label>
                <input autoComplete="off"
                onChange={(e) => {this.handleNewDescription(e)}}
                 />
                 <div className="btnContainer">
                     <button className="step-btn-admin"
                    //  put request for chaning description for service
                     onClick={() => 
                        {
                            try{
                                fetch(url + "put/service_description", {
                                    method: "PUT",
                                    body: JSON.stringify({
                                        description: this.state.newDes,
                                        service: this.state.service
                                    })
                                })
                                .then(alert("התיאור עודכן בהצלחה"));
                            }
                            catch(e) {
                                console.log(e)}
                            }}
                     >אישור</button>
                 </div>
            
            </div>
        </section>
        </>
    )}
}

export default UpdateDescription