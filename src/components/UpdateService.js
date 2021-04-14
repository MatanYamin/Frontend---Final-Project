import React from "react"
import { Component } from "react"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
import ReactS3 from "react-s3"
import config from "../configur"
// const url = "http://3.19.66.156:8080/"
// const url = "http://3.19.66.156/"
// const url = "http://127.0.0.1:5000/"
const url = "https://skycleanerapi.xyz/"


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
            deleting: false,
            loading: false,
            updateServiceSuccess: "",
            deleteSuccess: "",
            description: "",
            image: ""
        }
        this.uploadToS3 = this.uploadToS3.bind(this);
    }

    // get all categories inorder to know to whick category we will add a service
    async readCategories() {
        let response = await fetch(url + 'get/categories');
        let data = await response.json();
        return data
    }

    // bringing all service for deleting one
    async readServices() {
        let response = await fetch(url + 'get/services')
        let data = await response.json();
        return data
    }
    
    // when open this component, we will get all categories first
    componentDidMount() {
        this.readCategories().then((data) => {
            this.setState({
                categories_array: data
            })
        })
    
    }

    // after detecting changes in state, we will bring now all services from the API
    componentDidUpdate(prevProps, prevState){
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
    // Adding description for the service
    handleDescription = (input) => {
        this.setState({
            description: input.target.value
        })
    }
    // this uploads the image to the S3 aws
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
    // this method adds new service the the db from admin panel
    addNewService = () => {
        this.setState({
            loading: true
        });
        try{
            fetch(url + "post/service", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    cat_name: this.state.cat_name,
                    service_name: this.state.service_name,
                    price: this.state.price,
                    description: this.state.description,
                    image: this.state.image
                })
            })
            .then(
                (response) => {
                    if(response.status === 200){
                        this.setState({
                            updateServiceSuccess: "השירות נוסף בהצלחה",
                            loading: false,
                            service_name: "",
                            description: "",
                            price: ""
                        });
                    }
                    else{
                        alert("קרתה תקלה. רענן ונסה שוב") 
                    }
                }
            )
        }
        catch(e) {
            console.log(e)}
        }
    
    // this method deletes service from db
    deleteService = () => 
    {
        this.setState({
            loading: true
        });
        try{
            fetch(url + "delete/service", {
                method: "DELETE",
                body: JSON.stringify({
                    service_name: this.state.service_name,
                })
            })
            .then(
                (response) => {
                    if(response.status === 200){
                        this.setState({
                            deleteSuccess: "השרות נמחק בהצלחה",
                            loading: false,
                            services_array: this.state.services_array.filter((_, i) => i !== this.state.services_array.indexOf(this.state.service_name))
                        })
                    }
                    else{
                        alert("קרתה תקלה. אנא רענן ונסה שוב")
                    }
                }
            )
            }
        catch(e) {
            console.log(e)
        }
        }

render() {
    const {showing} = this.state;
    const {deleting} = this.state;
    return(
        <>
        <br/>
        <section className="adminComponent">
            <div className="adminComponentContainer">
        <button className="admin-btn-add" onClick={() => this.setState({ showing: !showing })}>הוספת שרות <i class="fas fa-plus"></i></button>
        {/* Using "showing" for clicking a button */}
        {this.state.showing ? //for open an option to choose (add service)
        <>
           <label>בחר קטגוריה להוספה</label>
           {/* shows all cateogries */}
           <select className="select-srp-down" onChange={(e) => this.setState({ cat_name: e.target.value })}>
               <option value="nothing">בחר קטגוריה</option>
               {this.state.categories_array.map(cat => (
               <option value={cat}>{cat}</option>))}
               </select>
           <label>הקלד שם שרות</label>
           <input autoComplete="off"
           value={this.state.service_name}
           onChange={(e) => {this.handleService(e)}}
            />
            <label>הוסף תיאור</label>
           <input autoComplete="off"
           value={this.state.description}
           onChange={(e) => {this.handleDescription(e)}}
            />
            <label>מחיר (בשקלים)</label>
            <input 
            value={this.state.price}
            onChange={(e) => {this.handlePrice(e)}}
           />
           {/*  */}
           <div>
            {/* After the img will upload succesfully, we will se the image */}
            <img className="img-show_form" src={this.state.image} />
            <h1>העלה תמונה</h1>
            <input type="file" onChange={this.uploadToS3} />
          </div>
                    <br/>
                    <Loader
                    type="Audio"
                    color="black"
                    height={100}
                    width={50}
                    visible={this.state.loading}
                    />
           {/*  */}
            <div className="btnContainer">
                <button className="step-btn-admin"
                // Post request for adding service
                onClick={this.addNewService}
                >אישור</button>
                <Loader
                type="TailSpin"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                />
            <button className="step-btn-admin" onClick={() => this.setState({ showing: !showing })}>ביטול</button>
            </div>
            <br/>
            <label>{this.state.updateServiceSuccess}</label>
             </>
            :
           null
        }
        <br/><br/>
        <button className="admin-btn-del" onClick={() => this.setState({ deleting: !deleting })}>מחיקת שרות <i class="fas fa-trash"></i></button>
        <br/><br/>
        {this.state.deleting ? //for open an option to choose (delete service)
           <>
           {/* shows in select list all the services there are */}
            <select class="del-drp-btn" onChange={(e) => this.setState({ service_name: e.target.value })}>
                    <option value="nothing">בחר שרות</option>
                    {this.state.services_array.map(service => (
                    <option value={service}>{service}</option>))}
                    </select>
                    <br/><br/>
                    <button
                    className="del-btn"
                    // post request for deleteing service
                    onClick={this.deleteService}
                    >אישור מחיקה<br/> (הדבר ימחק גם את כל התוספים של אותו שרות)</button>
                    <br/>
                    <button className="step-btn-admin" onClick={() => this.setState({ deleting: !deleting })}>ביטול</button>
                    <Loader
                type="TailSpin"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                />
                    <br/>
                    <label>{this.state.deleteSuccess}</label>
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