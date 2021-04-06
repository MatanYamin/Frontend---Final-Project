import React from "react"
import { Component } from "react"
import axios from "../../node_modules/axios"
import ReactS3 from "react-s3"
const url = "http://127.0.0.1:5000/"

const config = {
    bucketName: 'skycleaner',
    region: 'us-west-2',
    accessKeyId: 'AKIAWLXG5TEVQP7WVSFB',
    secretAccessKey: '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'
}

export class UploadImage extends Component {
    constructor(props){
        super(props)
        this.state = {
            services: [],
            service_name: "",
            showing: false,
            image: "",
            uploadSuccess: "",
            file: null
        }
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

    // onImageChange = event => {
    //     if (event.target.files && event.target.files[0]) {
    //       let img = event.target.files[0];
    //       this.setState({
    //         image: URL.createObjectURL(img)
    //       });
    //     }
    //   };

      // working
      // need to see how to send post request in the "then" to post/images with the img url and service name
      uploadToS3(e) {
        console.log(e.target.files)
        ReactS3.uploadFile(e.target.files[0], config)
        .then(
            (data) => {
            console.log(data.location)
        })
        .catch((err) => {
            console.log(err)
        })
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
            <img className="img-show_form" src={this.state.image} />
            <h1>העלה תמונה</h1>
            <input type="file" onChange={this.uploadToS3} />
          </div>
                    <br/>
            </div>
        </section>
        </>
    )}
}

export default UploadImage