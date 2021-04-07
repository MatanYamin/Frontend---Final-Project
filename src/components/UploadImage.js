import React from "react"
import { Component } from "react"
import axios from "../../node_modules/axios"
import ReactS3 from "react-s3"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner"
import config from "../config"
const url = "http://127.0.0.1:5000/"
// here we let the the admin add pictures to describe the service



export class UploadImage extends Component {
    constructor(props){
        super(props)
        this.state = {
            services: [],
            service_name: "",
            showing: false,
            image: null,
            uploadSuccess: "",
            file: null,
            loading: false
        }
        this.uploadToS3 = this.uploadToS3.bind(this);
    }

    async readServices() {
        // bringing all service for deleting one
        let response = await fetch(url + 'get/services', { credentials: 'include' });
        let data = await response.json();
        return data
    }

    componentDidMount() {
        this.readServices().then((data) => {
            this.setState({
                services: data
            })
        })
    }

    // sends the data to db
    sendDataToApi = () => {
        this.setState({
            loading: true
        });
        try{
            fetch(url + "post/images", {
                method: "POST",
                body: JSON.stringify({
                    image: this.state.image,
                    service: this.state.service_name
                })
            }).then((response) => {
                if(response.status === 200){
                    alert("התמונה נשלחה בהצלחה");
                    this.setState({
                        uploadSuccess: "התמונה הועלתה בהצלחה",
                        loading: false,
                        image: ""
                    })
                }
                else{
                    alert("קרתה תקלה. אנא רענן ונסה שוב")
                }
            })
        }
        catch(e) {
            console.log(e)}
    }

      uploadToS3(e) {
        console.log(config)
        console.log(config.data)
        ReactS3.uploadFile(e.target.files[0], config)
        .then((response)=> {
            this.setState({
                image: response.location
            })
          },
          )
    }


render() {
    const {values} = this.props; //values is all the props we passed to the component
    const page = window.location.pathname.substring(1); //page name
    return(
        <>
        {/* <input type="file" onChange={this.testThisImageUpload} /> */}
        <section className="adminComponent">
            <div className="adminComponentContainer">
        <br/><br/>
        {this.state.uploadSuccess}
            <select class="select-srp-down" onChange={(e) => this.setState({ service_name: e.target.value })}>
                    <option value="nothing">בחר שרות</option>
                    {this.state.services.map(service => (
                    <option value={service}>{service}</option>))}
                    </select>
                    <br/><br/>
                    <div>
            {/* After the img will upload succesfully, we will se the image */}
            <img className="img-show_form" src={this.state.image} />
            <h1>העלה תמונה</h1>
            <input type="file" onChange={this.uploadToS3} />
          </div>
                    <br/>
                    <div className="btnContainer">
                    <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    visible={this.state.loading}
                    />
                    <button className="step-btn-admin" onClick={this.sendDataToApi}>אישור</button>
                    </div>
            </div>
        </section>
        </>
    )}
}

export default UploadImage