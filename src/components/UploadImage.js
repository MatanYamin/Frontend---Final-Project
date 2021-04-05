import React from "react"
import { Component } from "react"
import axios from "../../node_modules/axios"
const url = "http://127.0.0.1:5000/"


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

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          this.setState({
            image: URL.createObjectURL(img)
          });
        }
      };

      uploadFile(e) {
        e.preventDefault();
        let file = this.state.image;
        const formData = new FormData();
        formData.append("file", file);
        axios
          .post("/post/images", formData)
          .then(res => console.log(res))
          .catch(err => console.warn(err));
      }
render() {
    const {values} = this.props; //values is all the props we passed to the component
    const page = window.location.pathname.substring(1); //page name
    return(
        <>
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
            <h1>Select Image</h1>
            <input type="file" name="myImage" onChange={this.onImageChange} />
          </div>
          <br/> <br/>
                    <button
                    className="step-btn-admin"
                    // post request for deleteing service
                    onClick={() => 
                    {
                        let file = this.state.image;
                        const formData = new FormData();
                        formData.append("file", file);
                        axios
                        .post(url + "post/images", formData)
                        .then(res => console.log(res))
                        .catch(err => console.warn(err));
      }
                    }
                    // onClick={() => 
                    //     {
                    //         try{
                    //             fetch(url + "post/images", {
                    //                 method: "POST",
                    //                 // body: this.state.image
                    //                 body: JSON.stringify({
                    //                     img: this.state.image,
                    //                     service: this.state.service_name
                    //                 })
                    //             })
                    //             .then(this.setState({
                    //                 uploadSuccess: "התמונה הועלתה בהצלחה"
                    //             })
                    //             );;
                    //         }
                    //         catch(e) {
                    //             console.log(e)}
                    //         }}
                    >העלה</button>
                    <br/>
            </div>
        </section>
        </>
    )}
}

export default UploadImage