import React from "react"
import { Component } from "react"
import ReactS3 from "react-s3"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner"
import config from "../configur"
// const url = "http://3.19.66.156/"
// const url = "http://127.0.0.1:5000/"
const url = "https://skycleanerapi.xyz/"
// here we let the the admin add pictures to describe the service



export class UploadImage extends Component {
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
            fetch(url + "post/main_images", {
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
        <button className="admin-btn-add" onClick={() => this.setState({ showMainImage: !this.state.showMainImage })}>הוספת תמונה ראשית לשירות <i className="fas fa-plus"></i></button>
        {this.state.showMainImage ? 
        <>
        <div>
        <label className="success_action">{this.state.uploadSuccess}</label>
        <br/>
            <select className="select-srp-down" onChange={(e) => this.setState({ service_name: e.target.value })}>
                    <option value="nothing">בחר שרות</option>
                    {this.state.services.map(service => (
                    <option value={service}>{service}</option>))}
                    </select>
            {/* After the img will upload succesfully, we will se the image */}
            {/* <h1>העלה תמונה</h1> */}
            {/* <input type="file" onChange={this.uploadToS3} /> */}
            <label className="image_upload_input">העלה תמונה
            <input hidden type="file" onChange={this.uploadToS3} />
            </label>
            <label>או כתובת של תמונה</label>
           <input autoComplete="off"
           value={this.state.image}
           onChange={(e) => {this.handleImageUrl(e)}}
            />
            <img alt="" className="img-show_form" src={this.state.image} />
          </div>
                    <br/>
                    <div className="btnContainer">
                    <Loader
                    type="Audio"
                    color="black"
                    height={100}
                    width={50}
                    visible={this.state.loading}
                    />
                    <button className="step-btn-admin" onClick={this.sendDataToApiMainImage}>אישור</button>
                    </div>
        </> : null}

        <br/>
        <button className="admin-btn-add" onClick={() => this.setState({ showImageMultiple: !this.state.showImageMultiple })}>להוספת תמונות של שירות <i className="fas fa-plus"></i></button>
        {this.state.showImageMultiple ?
         <>
        <br/><br/>
        <label className="success_action">{this.state.uploadSuccess}</label>
            <select className="select-srp-down" onChange={(e) => this.setState({ service_name: e.target.value })}>
                    <option value="nothing">בחר שרות</option>
                    {this.state.services.map(service => (
                    <option value={service}>{service}</option>))}
                    </select>
                    {/* <br/><br/> */}
                    <div>
            {/* After the img will upload succesfully, we will se the image */}
            <img alt="" className="img-show_form" src={this.state.image} />
            {/* <h1>העלה תמונה</h1> */}
            <label className="image_upload_input">העלה תמונה
            <input hidden type="file" onChange={this.uploadToS3} />
            </label>
            {/* <input type="file" onChange={this.uploadToS3} /> */}
            <label>או כתובת של תמונה</label>
           <input autoComplete="off"
           value={this.state.image}
           onChange={(e) => {this.handleImageUrl(e)}}
            />
          </div>
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
         </>
          : 
          null
        }
        </div>
    </section>


        </>
    )}
}

export default UploadImage