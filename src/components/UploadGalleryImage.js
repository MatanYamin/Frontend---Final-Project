import React from "react"
import { Component } from "react"
import ReactS3 from "react-s3"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner"
import config from "../configur"
import TextField from "@material-ui/core/TextField"
// const url = "http://3.19.66.156/"
// const url = "http://127.0.0.1:5000/"
const url = "https://skycleanerapi.xyz/"
// here we let the the admin add pictures to describe the service



export class UploadGalleryImage extends Component {
    constructor(props){
        super(props)
        this.state = {
            services: [],
            showImageMultiple: false,
            showMainImage: false,
            service_name: "",
            image: null,
            uploadSuccess: "",
            file: null,
            loading: false
        }
        this.uploadToS3 = this.uploadToS3.bind(this);
    }

    // bringing all service for deleting one
    async readServices() {
        let response = await fetch(url + 'get/services');
        let data = await response.json();
        return data
    }

    // when the component will rise, we will get all cities
    componentDidMount() {
        this.readServices().then((data) => {
            this.setState({
                services: data
            })
        })
    }

    // upload image by url
    handleImageUrl = (input) => {
        this.setState({
            image: input.target.value
        })
    }

    // sends the data to db (data of the image)
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

    sendDataToApiMainImage = () => {
        this.setState({
            loading: true
        });
        try{
            fetch(url + "post/mainimages", {
                method: "POST",
                body: JSON.stringify({
                    image: this.state.image,
                    service: this.state.service_name
                })
            }).then((response) => {
                if(response.status === 200){
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

      // this method uploads the image to the aws s3 and gets back to me the image url
      uploadToS3(e) {
        this.setState({
            loading: true
        });
        ReactS3.uploadFile(e.target.files[0], config)
        .then((response)=> {
            this.setState({
                image: response.location,
                loading: false
            })
          },
          )
    }
render() {
    return(
        <>
        <section className="adminComponent">
        <div className="adminComponentContainer">
        <div className="border-card-bottom-image">
            <br/>
                    <h1>העלה תמונה לגלריית תמונות באמצעות קישור או קובץ</h1>
                    <br/>
        {this.state.uploadSuccess}
            <select class="select-srp-down" onChange={(e) => this.setState({ service_name: e.target.value })}>
                    <option value="nothing">בחר שרות</option>
                    {this.state.services.map(service => (
                    <option value={service}>{service}</option>))}
                    </select>
            {/* After the img will upload succesfully, we will se the image */}
            <img className="img-show_form" src={this.state.image} />
            <label>העלה קובץ</label>
            <input type="file" onChange={this.uploadToS3} />
            <label>כתובת של תמונה</label>
           {/* <input autoComplete="off"
           value={this.state.image}
           onChange={(e) => {this.handleImageUrl(e)}}
            /> */}
            <TextField 
            value={this.state.image}
            onChange={(e) => {this.handleImageUrl(e)}}
            />
                    <br/>
                    <div className="btnContainer">
                    <Loader
                    type="Audio"
                    color="black"
                    height={100}
                    width={50}
                    visible={this.state.loading}
                    />
                    <button className="step-btn-admin" onClick={this.sendDataToApi}>אישור</button>
                    </div>
        </div>
        </div>
    </section>


        </>
    )}
}

export default UploadGalleryImage