import React from "react";
import { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import TextField from "@material-ui/core/TextField";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import CachedIcon from '@material-ui/icons/Cached';
import CreateIcon from '@material-ui/icons/Create';
// const url = "http://3.19.66.156/"
// const url = "http://127.0.0.1:5000/"
const url = "https://skycleanerapi.xyz/"


export class ChangeServiceName extends Component {
    constructor(props){
        super(props)
        this.state = {
            services_array: [],
            loading: false,
            newTitle: "",
            service: "",
            placeHolder: "",
            beforeAndAfter: "",
            changeNameFlag: false
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

    // inserts the new משצק inside the state
    handleNewTitle = (input) => {
        if(input.target.value.length >= 2){
            this.setState({
                changeNameFlag: true
            })
        }
        else{
            this.setState({
                changeNameFlag: false
            })
        }
        this.setState({
            newTitle: input.target.value
        })
    }
    // this sends the description to the server sie to handle the changes with put
    updateTitleForService = () => {
        if(!this.state.newTitle || !this.state.service){
            this.setState({
                placeHolder: "‎שדה ריק"
            })
        }
        else{
            this.setState({
                loading: true
            });
    
            try{
                fetch(url + "put/service_name", {
                    method: "PUT",
                    body: JSON.stringify({
                        newName: this.state.newTitle,
                        service: this.state.service
                    })
                })
                .then(
                    (response) => {
                        if(response.status === 200){
                            // changes when the status is ok and the function worked succesfully
                            this.setState({
                                loading: false,
                                beforeAndAfter: "השם שונה בהצלחה ל " + this.state.newTitle
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
            <div className="border-card-bottom-image">
                <br/>
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          centered
        >
          <Tab icon={<CachedIcon />} label="שינוי שם לשירות" />
            </Tabs>
                <br/>
                <select 
                    className="select-srp-down"
                    onClick={(e) => this.setState({ service: e.target.value })}
                    // onInput={(e) => this.getDescriptionForService(e)}
                    >
                    <option
                    value="">בחר שירות</option>
                    {this.state.services_array.map(ser => (
                    <option value={ser}>{ser}</option>))}
                </select>
                <br/>
                <label><CreateIcon />&nbsp;הקלד שם חדש</label>
                <div className="addonPlaceHolder">
                {this.state.changeNameFlag? 
                    <>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fas fa-check fa-1x"></i>
                    </>
                    :
                    null
                    }
                 <TextField 
                 placeholder={this.state.placeHolder}
                 value={this.state.newTitle}
                 autoComplete="off"
                 onChange={(e) => {this.handleNewTitle(e)}}
                 />
                 </div>
                 {this.state.beforeAndAfter}
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
                     onClick={this.updateTitleForService}
                     >אישור</button>
                 </div>
                 </div>
            </div>
        </section>
        </>
    )}
}

export default ChangeServiceName