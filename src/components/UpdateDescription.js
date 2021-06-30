import React from "react"
import { Component } from "react"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
import axios from "axios"
import TextField from "@material-ui/core/TextField"
// const url = "http://3.19.66.156/"
// const url = "http://127.0.0.1:5000/"
const url = "https://skycleanerapi.xyz/"


export class UpdateDescription extends Component {
    constructor(props){
        super(props)
        this.state = {
            services_array: [],
            loading: false,
            newDes: "",
            service: "",
            currentDescrition: "",
            beforeAndAfter: "",
            placeHolder: "",
            checkFlag: false
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
        if(input.target.value.length >= 2){
            this.setState({
                checkFlag: true
            })
        }
        else{
            this.setState({
                checkFlag: false
            })
        }
        this.setState({
            newDes: input.target.value
        })
    }
    // this sends the description to the server sie to handle the changes with put
    updateDercriptionForService = () => {
        if(!this.state.newDes || !this.state.service){
            this.setState({
                placeHolder: "‎שדה ריק"
            })
        }
        else{
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
                                beforeAndAfter: "התיאור החדש: ",
                                currentDescrition: this.state.newDes,
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
        }


        getDescriptionForService(e) {
            this.setState({
                loading: true
            });
    
            const postData = {
                service: e.target.value
            };
            try{
            axios.post(url + "post/service_description", postData)
            .then(response => this.setState({
                beforeAndAfter: "התיאור כרגע: ",
                currentDescrition: response.data,
                loading: false
            }));}
            catch(e) {
                console.log(e)}
        }

render() {
    return(
        <>
        <section className="adminComponent">
            <div className="adminComponentContainer">
            <div className="border-card-bottom-image">
                <br/>
                <h1>בחר שירות ולאחר מכן הקלד תיאור חדש עבורו</h1>
                <br/>
                <select 
                    className="select-srp-down"
                    onClick={(e) => this.setState({ service: e.target.value })}
                    onInput={(e) => this.getDescriptionForService(e)}
                    >
                    <option
                    value="">בחר שירות</option>
                    {this.state.services_array.map(ser => (
                    <option value={ser}>{ser}</option>))}
                </select>
                <br/>
                <div className="description-show">
                {this.state.beforeAndAfter}
                <br/>
                {this.state.currentDescrition}
                </div>
                <div className="addonPlaceHolder">
                <label>הקלד תיאור חדש</label>
                {/* <input 
                value={this.state.newDes}
                autoComplete="off"
                onChange={(e) => {this.handleNewDescription(e)}}
                 /> */}
                 <TextField 
                 placeholder={this.state.placeHolder}
                 value={this.state.newDes}
                 autoComplete="off"
                 onChange={(e) => {this.handleNewDescription(e)}}
                 />
                 {this.state.checkFlag? 
                    <>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fas fa-check fa-2x"></i>
                    </>
                    :
                    null
                    }
                 </div>
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
            </div>
        </section>
        </>
    )}
}

export default UpdateDescription