import React from "react"
import { Component } from "react"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
// const url = "http://127.0.0.1:5000/"
// const url = "http://3.19.66.156/"
const url = "https://skycleanerapi.xyz/"


export class UpdateDescription extends Component {
    constructor(props){
        super(props)
        this.state = {
            services_array: [],
            showing: false,
            deleting: false,
            loading: false,
            newDes: "",
            service: ""
        }
    }

    // bring all services
    async readServices() {
        let response = await fetch(url + 'get/services');
        let data = await response.json(); // for string
        return data
    }
    // when component is open, do the following
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

    // inserts the new description inside the state
    handleNewDescription = (input) => {
        this.setState({
            newDes: input.target.value
        })
    }
    // this sends the description to the server sie to handle the changes with put
    updateDercriptionForService = () => {
        this.setState({
            loading: true
        });

        try{
            fetch(url + "put/service_description", {
                method: "PUT",
                body: JSON.stringify({
                    description: this.state.newDes,
                    service: this.state.service
                })
            })
            .then(
                (response) => {
                    if(response.status === 200){
                        this.setState({
                            loading: false,
                            newDes: ""
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
                <input 
                value={this.state.newDes}
                autoComplete="off"
                onChange={(e) => {this.handleNewDescription(e)}}
                 />
                 <Loader
                type="Puff"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                />
                 <div className="btnContainer">
                     <button className="step-btn-admin"
                    //  put request for chaning description for service
                     onClick={this.updateDercriptionForService}
                     >אישור</button>
                 </div>
            
            </div>
        </section>
        </>
    )}
}

export default UpdateDescription