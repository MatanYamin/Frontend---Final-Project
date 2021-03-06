import React from "react";
import { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import ReactS3 from "react-s3";
import config from "../configur";
import TextField from "@material-ui/core/TextField";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Preview from './Preview';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CreateIcon from '@material-ui/icons/Create';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import LinkIcon from '@material-ui/icons/Link';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
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
            loading: false,
            updateServiceSuccess: "",
            deleteSuccess: "",
            description: "",
            image: "",
            placeHolder: "",
            servicePlaceHolder: "כותרת...",
            pricePlaceHolder: "מחיר...",
            descriptionHolder: "תיאור...",
            imageHolder: "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg",
            check: false,
            serviceNameFlag: false,
            servicePriceFlag: false,
            serviceDescrFlag: false,
            serviceImageFlag: false

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
        if(input.target.value.length >= 2){
            this.setState({
                serviceNameFlag: true
            })
        }
        else{
            this.setState({
                serviceNameFlag: false
            })
        }
        if(input.target.value === ""){
            this.setState({
                servicePlaceHolder: "כותרת...",
                service_name: input.target.value
            })
        }
        else{
            this.setState({
                service_name: input.target.value,
                servicePlaceHolder: ""
            })
        }
        
    }
    // for typing new price
    handlePrice = (input) => {
        if(input.target.value.length >= 1){
            this.setState({
                servicePriceFlag: true
            })
        }
        else{
            this.setState({
                servicePriceFlag: false
            })
        }
        if(input.target.value === ""){
            this.setState({
                pricePlaceHolder: "מחיר...",
                price: input.target.value
            })
        }
        else{
            this.setState({
                price: input.target.value,
                pricePlaceHolder: ""
            })
        }
    }
    // Adding description for the service
    handleDescription = (input) => {
        if(input.target.value.length >= 2){
            this.setState({
                serviceDescrFlag: true
            })
        }
        else{
            this.setState({
                serviceDescrFlag: false
            })
        }
        if(input.target.value === ""){
            this.setState({
                descriptionHolder: "תיאור...",
                description: input.target.value
            })
        }
        else{
            this.setState({
                description: input.target.value,
                descriptionHolder: ""
            })
        }
    }

    // upload image by url
    handleImageUrl = (input) => {
        this.setState({
            image: input.target.value,
            serviceImageFlag: true,
            imageHolder: ""
        })
        if(input.target.value === ""){
            this.setState({
                imageHolder: "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
            })
        }
    }
    // this uploads the image to the S3 aws
    uploadToS3(e) {
        this.setState({
            loading: true,
            serviceImageFlag: false
        });
        ReactS3.uploadFile(e.target.files[0], config)
        .then((response)=> {
            this.setState({
                image: response.location,
                loading: false,
                serviceImageFlag: true,
                imageHolder: ""
            })
          },
          )
    }
    // this method adds new service the the db from admin panel
    addNewService = () => {
        if(!this.state.cat_name || !this.state.service_name || !this.state.price || !this.state.description || !this.state.image){
            this.setState({
                placeHolder: "‎שדה ריק"
            })
        }
        else{
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
                                price: "",
                                image: ""
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
        }
    
    // this method deletes service from db
    deleteService = () => 
    {
        if(!this.state.service_name){
            alert("אנא בחר שירות למחיקה")
        }
        else{
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
                                deleteSuccess: "השירות נמחק בהצלחה",
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
        }

render() {
    return(
        <>
        <section className="adminComponent">
            <div className="adminComponentContainer">
                <div className="border-card-top">
                    <br/>
                    <div className="servicePlaceHolder">
                    <Tabs
          textColor="primary"
          indicatorColor="primary"
          centered
          >
          <Tab icon={<AddCircleOutlineIcon />} label="הוספת שירות חדש" />
            </Tabs>
            <br/>
            <div className="previewServiceWhileBuild">
                <div className="previceWords">
                </div>
                <div className="titleBuild">
                    <br />
                    {this.state.servicePlaceHolder}
                    {this.state.service_name}
                </div>
                <br/>
                <div className="imageBuild">
                    <img alt="" src={this.state.imageHolder} />
                    <img alt="" src={this.state.image} />
                </div>
                <br/>
                <div className="descriptionBuild">
                    {this.state.descriptionHolder}
                    {this.state.description}
                </div>
                <br/>
                <div className="priceBuild">
                    {this.state.pricePlaceHolder}&nbsp;
                    ₪{this.state.price}
                </div>
            <br/>
            </div>
            {/* <Preview textOnBubble={this.state.description} image={this.state.image} title={this.state.service_name} /> */}
           {/* shows all cateogries */}
           <div className="buildService">
           <select className="selectCatBuild" onChange={(e) => this.setState({ cat_name: e.target.value })}>
               <option value="nothing">בחר קטגוריה</option>
               {this.state.categories_array.map(cat => (
               <option value={cat}>{cat}</option>))}
               </select>
               <br/>
               <br/>
           <p className="serviceLabelForm"><CreateIcon />&nbsp;שם השירות </p>
           {/* <input autoComplete="off"
           value={this.state.service_name}
           onChange={(e) => {this.handleService(e)}}
            /> */}
            <TextField
            // placeholder="שם שירות"
            placeholder={this.state.placeHolder}
            value={this.state.service_name}
            onChange={(e) => {this.handleService(e)}} />
            {this.state.serviceNameFlag? 
            <>
            &nbsp;&nbsp;
            <CheckCircleOutlineIcon />
             {/* <i className="fas fa-check fa-1x"></i> */}
             </>
            :
            null
            }
             <br/>

             <br/>
            <p className="serviceLabelForm"><SpellcheckIcon />&nbsp;תיאור השירות </p>
            <br/>
           {/* <input autoComplete="off"
           value={this.state.description}
           onChange={(e) => {this.handleDescription(e)}}
            /> */}
            <textarea
            placeholder={this.state.placeHolder}
            value={this.state.description}
            onChange={(e) => {this.handleDescription(e)}}
            />
             
            {/* <TextField 
            placeholder={this.state.placeHolder}
            value={this.state.description}
            onChange={(e) => {this.handleDescription(e)}}/> */}
            {this.state.serviceDescrFlag? 
            <>
            &nbsp;&nbsp;
            <CheckCircleOutlineIcon />
             </>
            :
            null
            }
            <br/>
            <br/>
            <p className="serviceLabelForm"><LocalOfferIcon />&nbsp;מחיר (בשקלים)</p>
            {/* <input 
            value={this.state.price}
            onChange={(e) => {this.handlePrice(e)}}
           /> */}
           <TextField 
        //    placeholder="מחיר"
           placeholder={this.state.placeHolder}
           value={this.state.price}
           onChange={(e) => {this.handlePrice(e)}}/>
           {this.state.servicePriceFlag? 
           <>
           &nbsp;&nbsp;
           <CheckCircleOutlineIcon />
            </>
            :
            null
            }
           <div>
            {/* After the img will upload succesfully, we will se the image */}
            <br/>
            {/* <label>העלה תמונה</label>
            <br/>
            <input type="file" onChange={this.uploadToS3} /> */}
            
            <label className="image_upload_input2">העלה תמונה <ImageSearchIcon />
            <input hidden type="file" onChange={this.uploadToS3} />
            </label>
            {this.state.serviceImageFlag? 
            <CheckCircleOutlineIcon />
            :
            null
            }
          </div>
                    {/* <br/> */}
                    <Loader
                    type="Audio"
                    color="black"
                    height={100}
                    width={50}
                    visible={this.state.loading}
                    />
           {/*  */}
           או
           <p className="serviceLabelForm"><LinkIcon />&nbsp;כתובת של תמונה</p>
           {/* <input autoComplete="off"
           value={this.state.image}
           onChange={(e) => {this.handleImageUrl(e)}}
        /> */}
            <TextField 
            // placeholder="כתובת תמונה"
            placeholder={this.state.placeHolder}
            value={this.state.image}
            onChange={(e) => {this.handleImageUrl(e)}}
            />
            </div>
            {/* <img alt="" className="img-show_form" src={this.state.image} /> */}
            </div>
            <div className="btnContainer">
                <button className="step-btn-admin"
                // Post request for adding service
                onClick={this.addNewService}
                >אישור</button>
                <div className="avoidPhone">
                {(this.state.serviceNameFlag && this.state.servicePriceFlag && this.state.serviceDescrFlag && this.state.serviceImageFlag)? <><Popup
                closeOnEscape
                trigger={<button className="step-btn-admin"> תצוגה מקדימה</button>} >
                    <div className="popUpPreview">
                            <Preview price={this.state.price} textOnBubble={this.state.description} image={this.state.image} title={this.state.service_name} />
                    </div>

            </Popup></> : null}
                </div>
                
                <Loader
                type="TailSpin"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                />
                </div>
            </div>
            <h1>{this.state.updateServiceSuccess}</h1>
            <div className="border-card-bottom">
                <br/>
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          centered
        >
          <Tab icon={<HighlightOffIcon />} label="מחיקת שירות" />
            </Tabs>
            <br/>
           {/* shows in select list all the services there are */}
            <select className="del-drp-btn" onChange={(e) => this.setState({ service_name: e.target.value })}>
                    <option value="nothing">בחר שירות</option>
                    {this.state.services_array.map(service => (
                    <option value={service}>{service}</option>))}
                    </select>
                    <br/><br/>
                    <div className="btnContainer">
                    <button
                    className="step-btn-admin"
                    // post request for deleteing service
                    onClick={this.deleteService}
                    >אישור </button>
                    <br/>
                    </div>
                    <Loader
                type="TailSpin"
                color="black"
                height={100}
                width={50}
                visible={this.state.loading}
                />
                    <br/>
                    <h1>{this.state.deleteSuccess}</h1>
                    </div>
            </div>
        </section>
        </>
    )}
}

export default UpdateService